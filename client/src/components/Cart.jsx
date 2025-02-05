import MetaData from "./helmet";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { updateCartItemQuantity, removeCartItem } from "../store/cartSlice"; // Assuming you have these actions defined
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ product, newQuantity }));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  const getCartSummary = () => {
    let subtotal = 0;
    let totalItems = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
      totalItems += item.quantity;
    });
    return { subtotal, totalItems };
  };

  const { subtotal, totalItems } = getCartSummary();

  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems.length > 0 ? (
        <div className="mx-auto p-2 container min-h-[70vh]">
          <h2 className="mt-5 text-2xl font-medium text-gray-800">
            Your Cart:{" "}
            <span className="text-yellow-600 font-semibold font-sans">
              {cartItems.length || "0"} items
            </span>
          </h2>

          <div className="flex justify-between flex-col md:flex-row mt-5">
            <div className="w-full lg:w-8/12">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="cart-item mb-8 p-1 border-b border-t"
                >
                  <div className="flex items-center justify-between text-center">
                    <div className="md:w-20 w-14  h-14 md:h-20 mr-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded-lg object-contain"
                      />
                    </div>
                    <div className="w-2/5">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-sm md:text-base font-medium text-gray-600 line-clamp-2 md:line-clamp-none  "
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="md:w-1/4 w-1/5  mt-4 mt-lg-0">
                      <p className="text-xl font-medium text-yellow-600">
                        ${item.price.toFixed(0)}
                      </p>
                    </div>
                    <div className="w-1/5 mt-4 mt-lg-0 flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-white bg-red-500 rounded   size-5 text-center disabled:cursor-not-allowed"
                          onClick={() =>
                            handleQuantityChange(
                              item.product,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <p className="text-center w-4">{item.quantity}</p>
                        <button
                          className="text-white bg-blue-500 rounded disabled:cursor-not-allowed  size-5 text-center"
                          onClick={() =>
                            handleQuantityChange(
                              item.product,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity == item.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-1/12 mt-4 flex justify-center items-center">
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveFromCart(item.product)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-3/12 my-4">
              <div className="p-4 border rounded-md">
                <h4 className="text-lg font-semibold">Order Summary</h4>
                <hr className="my-2" />
                <p className="flex justify-between items-center mb-4">
                  Units:{" "}
                  <span className="font-medium  text-yellow-600">
                    {totalItems} (Units)
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  Est. total:
                  <span className="font-medium text-yellow-600">
                    ${subtotal.toFixed(2)}
                  </span>
                </p>
                <hr className="my-2" />
                <button
                  className="btn w-full py-2 bg-yellow-600 text-white rounded-lg"
                  onClick={() =>
                    user ? navigate("/shipping") : navigate("/login")
                  }
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="min-h-[60vh] content-center">
            <p className="text-xl font-semibold text-center">
              Your Cart is Empty
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
