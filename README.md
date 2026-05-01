# BuyIt - Full Stack E-Commerce Application

A complete, modern e-commerce platform built with **Node.js**, **Express**, **MongoDB**, and **React**. Features user authentication, product catalog, shopping cart, order management, secure payments, and an admin dashboard.

---

## 🌟 Features

### User Features

- **User Authentication**: Sign up, login, and secure session management
- **Product Browsing**: Browse products with filtering, sorting, and search functionality
- **Shopping Cart**: Add/remove items, manage quantities, persistent cart storage
- **Checkout Process**: Multi-step checkout with shipping and payment options
- **Payment Integration**: Secure payments via Stripe
- **Order Management**: View order history, track orders, and download invoices
- **User Profile**: Update profile information and manage passwords
- **Product Reviews**: Add and view product reviews and ratings
- **Wish List**: Save favorite products

### Admin Features

- **Dashboard**: Analytics and sales charts
- **Product Management**: Create, update, and delete products
- **Order Management**: View and process orders
- **User Management**: Manage user accounts and roles
- **Image Management**: Upload and manage product images via Cloudinary
- **Review Management**: Moderate and manage product reviews

### Technical Features

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Notifications**: Toast notifications with React Hot Toast
- **Error Handling**: Comprehensive error handling and validation
- **Security**: JWT authentication, password hashing, CORS protection
- **State Management**: Redux Toolkit with Redux Persist
- **API Caching**: React Query for efficient data fetching
- **Database Seeding**: Pre-populated product data for testing

---

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + Bcrypt
- **Payment**: Stripe
- **Email**: Nodemailer
- **Cloud Storage**: Cloudinary
- **Security**: Helmet, CORS
- **Environment**: dotenv

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + Redux Persist
- **HTTP Client**: Axios
- **Data Fetching**: React Query (TanStack Query)
- **Routing**: React Router v7
- **UI Components**: MDBreact, React Icons, React Star Ratings
- **Notifications**: React Hot Toast
- **PDF Generation**: jsPDF + html2canvas
- **Date Picker**: React DatePicker
- **Charts**: Chart.js with React ChartJS 2
- **Pagination**: React JS Pagination
- **Skeleton Loading**: React Loading Skeleton

---

## 📁 Project Structure

```
BuyIt/
├── Backend/
│   ├── server.js                 # Main server entry point
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── productController.js  # Product CRUD operations
│   │   ├── orderController.js    # Order management
│   │   └── paymentController.js  # Payment processing
│   ├── models/
│   │   ├── user.js               # User schema
│   │   ├── product.js            # Product schema
│   │   └── order.js              # Order schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── product.js            # Product routes
│   │   ├── order.js              # Order routes
│   │   └── payment.js            # Payment routes
│   ├── middleware/
│   │   ├── auth.js               # Authentication middleware
│   │   ├── error.js              # Error handling middleware
│   │   └── catchAsyncError.js    # Async error wrapper
│   ├── seeder/
│   │   ├── data.js               # Sample product data
│   │   └── seeder.js             # Database seeding script
│   └── utils/
│       ├── ErrorHandler.js       # Custom error class
│       ├── sendEmail.js          # Email sending utility
│       ├── sendToken.js          # JWT token generation
│       ├── cloudinary.js         # Image upload utility
│       ├── apiFilter.js          # Query filtering
│       └── emailTemplate.js      # Email templates
│
├── client/
│   ├── index.html
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Main App component
│       ├── App.css
│       ├── index.css
│       ├── components/           # Reusable React components
│       │   ├── header.jsx
│       │   ├── footer.jsx
│       │   ├── Cart.jsx
│       │   ├── Payment.jsx
│       │   ├── CheckoutSteps.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── admin/            # Admin-specific components
│       │   │   ├── Dashboard.jsx
│       │   │   ├── ListProducts.jsx
│       │   │   ├── CreateNewProduct.jsx
│       │   │   └── ...
│       │   └── ...
│       ├── pages/                # Page components
│       │   ├── LoginPage.jsx
│       │   ├── Signup.jsx
│       │   └── ...
│       ├── hooks/                # Custom React hooks
│       │   ├── usePayment.jsx
│       │   ├── usePlaceOrder.jsx
│       │   └── ...
│       ├── store/                # Redux store configuration
│       │   ├── store.js          # Redux store setup
│       │   ├── userSlice.js      # User state
│       │   └── cartSlice.js      # Cart state
│       ├── helper/               # Utility functions
│       │   ├── amounts.js
│       │   └── FormateDate.js
│       └── public/               # Static assets
│           └── assets/
│
├── package.json                  # Root dependencies
└── README.md                      # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance (local or MongoDB Atlas)
- Stripe account
- Cloudinary account
- Email service credentials (Nodemailer)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/buyit
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/buyit

# Server
PORT=4000
NODE_ENV=DEVELOPMENT

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Stripe
STRIPE_API_KEY=your_stripe_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=your_email@gmail.com
SMTP_FROM_NAME=BuyIt

# Frontend
VITE_API_URL=http://localhost:4000
```

### Backend Setup

```bash
# Install dependencies
npm install

# Seed the database (optional - populate with sample data)
npm run seeder

# Start development server
npm run dev

# Start production server
npm start
```

The backend server will run on `http://localhost:4000`

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend will run on `http://localhost:5173`

---

## 📖 Usage

### Development Workflow

1. **Start Backend Server**

   ```bash
   npm run dev
   ```

2. **Start Frontend Development Server** (in another terminal)

   ```bash
   cd client
   npm run dev
   ```

3. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

### User Authentication Flow

1. **Sign Up**: Create a new account with email and password
2. **Login**: Authenticate with credentials
3. **Access**: Receive JWT token stored in cookies
4. **Protected Routes**: Routes check authentication status
5. **Logout**: Clear session and token

### Shopping Flow

1. **Browse Products**: View all products with filters
2. **Search**: Use search functionality to find products
3. **View Details**: Click on product to see full details and reviews
4. **Add to Cart**: Add items to shopping cart
5. **Checkout**: Multi-step checkout process
   - Confirm cart items
   - Enter shipping address
   - Choose shipping method
   - Enter payment details
6. **Payment**: Complete payment via Stripe
7. **Order Confirmation**: Receive order details and invoice

### Admin Panel

1. **Login as Admin**: Use admin credentials
2. **Access Dashboard**: View analytics and sales charts
3. **Manage Products**: Create, update, delete products
4. **Process Orders**: Update order status
5. **Manage Users**: View and manage user accounts
6. **Manage Reviews**: Moderate product reviews

---

## 🔐 Authentication & Authorization

- **JWT-based Authentication**: Stateless authentication using JSON Web Tokens
- **Role-based Access Control**: Admin and User roles
- **Password Security**: Bcrypt hashing for password storage
- **Protected Routes**: Frontend routes protected with `ProtectedRoute` component
- **Backend Middleware**: Authentication middleware validates requests

---

## 💳 Payment Integration

The application integrates with **Stripe** for secure payment processing:

1. **Checkout Page**: Collect payment details
2. **Create Payment Intent**: Stripe creates payment intent
3. **Process Payment**: Client submits payment to Stripe
4. **Webhook Handler**: Backend receives payment confirmation
5. **Order Creation**: Order is created after successful payment

---

## 📧 Email Notifications

Nodemailer is configured to send:

- Welcome emails on sign up
- Order confirmation emails
- Shipping notifications
- Password reset emails

---

## 🖼️ Image Management

Cloudinary integration for efficient image management:

- **Upload**: Images uploaded to Cloudinary during product creation
- **Storage**: Images stored in cloud with CDN delivery
- **Optimization**: Automatic image optimization
- **Transform**: Dynamic image transformation for different sizes

---

## 📊 Database Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  avatar: URL,
  role: String (User/Admin),
  createdAt: Date
}
```

### Product Model

```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  rating: Number,
  image: URL,
  stock: Number,
  category: String,
  seller: String,
  reviews: [Review],
  createdAt: Date
}
```

### Order Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  orderItems: [OrderItem],
  totalPrice: Number,
  totalQuantity: Number,
  shippingAddress: Object,
  orderStatus: String,
  paymentInfo: Object,
  createdAt: Date
}
```

---

## 🧪 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders

- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Place new order
- `PUT /api/orders/:id` - Update order status (Admin)

### Payments

- `POST /api/payments` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

### Users

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users` - Get all users (Admin)

---

## 🐛 Error Handling

The application implements comprehensive error handling:

- **Try-Catch Blocks**: Async operations wrapped in catch blocks
- **Custom Error Handler**: `ErrorHandler` class for consistent error format
- **Error Middleware**: Global error handling middleware
- **Validation**: Input validation on routes
- **User Feedback**: Clear error messages displayed to users

---

## 📝 Logging

- Console logging in development mode
- Server logs for debugging
- Error stack traces for troubleshooting

---

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Set environment variables
2. Push to repository
3. Deploy with `npm start` as start command

### Frontend Deployment (Vercel, Netlify)

1. Build: `npm run build`
2. Deploy build folder
3. Set API URL environment variable

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**BuyIt Development Team**

---

## 📞 Support

For support, email your-email@gmail.com or create an issue in the repository.

---

## 🔄 Future Enhancements

- [ ] Multiple payment methods (PayPal, Apple Pay)
- [ ] Product recommendations
- [ ] Advanced search with filters
- [ ] Wishlist and compare features
- [ ] User notifications
- [ ] Ratings and reviews improvements
- [ ] Multi-language support
- [ ] Performance optimization
- [ ] Mobile app version
- [ ] Real-time notifications with WebSockets

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Stripe Documentation](https://stripe.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

**Last Updated**: April 2026  
**Version**: 1.0.0
