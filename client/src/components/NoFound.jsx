import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        {/* Illustration */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/755/755014.png"
          alt="Lost bear"
          className="w-64 h-64 mx-auto mb-8 animate-bounce"
        />

        {/* Text Content */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Oops! You're lost in the woods
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          The page you're looking for has been carried away by a curious bear.
          Let's help you find your way back home!
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg
          transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Take Me Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
