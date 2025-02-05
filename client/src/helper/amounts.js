export const calculatedPrices = (cartItems) => {
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingAmount = itemsPrice > 200 ? 0 : 25; // Using `itemsPrice` instead of `totalAmount` for shipping
  const taxAmount = (0.15 * itemsPrice).toFixed(2); // Tax should be calculated based on itemsPrice

  const totalAmount = (
    Number(itemsPrice) + // Add itemsPrice to the total amount
    Number(shippingAmount) +
    Number(taxAmount)
  ).toFixed(2);

  return {
    itemsPrice,
    totalAmount,
    shippingAmount,
    taxAmount,
  };
};
