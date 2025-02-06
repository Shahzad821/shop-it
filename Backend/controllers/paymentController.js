import Stripe from "stripe";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSessions = catchAsyncError(
  async (req, res, next) => {
    const body = req.body;
    const shippingInfo = body.shippingInfo;

    const itemsPrice = body?.itemsPrice;

    const shippingRateId =
      itemsPrice >= 200
        ? "shr_1QawD3F264znZZk6TpEFRRio"
        : "shr_1QawDlF264znZZk6UemNI300";

    try {
      // Create the checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: body.orderItems.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item?.name,
              images: [item?.image],
              metadata: { productId: item?.product },
            },
            unit_amount: item.price * 100, // Stripe expects price in cents
          },

          tax_rates: ["txr_1QawNGF264znZZk6ooEeEZO5"], // Ensure tax rate ID is correct
          quantity: item.quantity,
        })),
        metadata: {
          ...shippingInfo,

          itemsPrice: body?.itemsPrice, // Fix typo 'itemPric' -> 'itemsPrice'
        },
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`, // Success URL should include session ID for further processing
        cancel_url: `${process.env.FRONTEND_URL}`, // Redirect to the homepage or cancel page
        customer_email: req?.user.email,
        client_reference_id: req?.user._id.toString(),
        shipping_options: shippingRateId
          ? [{ shipping_rate: shippingRateId }]
          : [],
      });

      res.status(200).json({
        url: session.url, // Return the session URL for redirect
      });
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      next(error); // Pass the error to the error handler middleware
    }
  }
);

// Helper function to get order items from line items
const getOrderItems = async (lineItems) => {
  let cartItems = [];

  // Use for...of to handle async operations correctly
  for (let item of lineItems.data) {
    const product = await stripe.products.retrieve(item.price.product);
    const productId = product.metadata.productId;

    cartItems.push({
      product: productId,
      name: product.name,
      image: product.images ? product.images[0] : null,
      price: item.price.unit_amount / 100, // Convert to dollars
      quantity: item.quantity,
    });
  }

  return cartItems;
};

export const stripeWebhook = catchAsyncError(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];

    // Ensure webhook secret is available
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error(
        "STRIPE_WEBHOOK_SECRET is not defined in the environment."
      );
    }

    // Validate the webhook event
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Retrieve line items from session
      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      // Call getOrderItems to get details about the order
      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;
      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;
      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNo: session.metadata.phoneNo,
        postalCode: session.metadata.postalCode,
        country: session.metadata.country,
      };
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      // Construct the order data
      const orderData = {
        shippingInfo,
        orderItems,
        totalAmount,
        shippingAmount,
        taxAmount,
        paymentMethod: "Card",
        itemsPrice,
        paymentInfo,
        user,
      };

      // Save the order to the database
      const order = new Order(orderData);
      await order.save();

      res.status(200).json({ success: true });
    } else {
      // Handle other events, if needed
      res.status(400).json({ error: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Error with Stripe webhook:", error.message);
    res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }
});
