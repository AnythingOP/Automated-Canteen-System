#🍔 Automated Canteen System 🍕
Welcome to the Automated Canteen System! This is a full-stack web application built to modernize the traditional canteen experience, making it faster, more efficient, and user-friendly for both customers and kitchen staff. Say goodbye to long queues and manual errors!

✨ Key Features
This project is more than just a menu; it's a complete management system with a rich feature set:

Customer & Kitchen Roles: A robust authentication system with separate registration and login for customers and kitchen staff.

Role-Based Dashboards: The user interface dynamically changes based on who is logged in. Customers see a menu and order options, while kitchen staff get a dedicated order management dashboard.

Interactive Menu with Images: A public-facing, visually appealing menu where anyone can browse items.

Persistent Shopping Cart: Add items to your cart, and they'll stay there even if you navigate to other pages or refresh the browser, thanks to localStorage.

Full Order Management:

For Customers: View your cart, manage item quantities, and proceed to a mock payment gateway.

For Kitchen: View incoming orders in a clean, column-based layout (Received, Preparing, Ready for Pickup). Simply click an order to move it to the next stage.

Secure JWT Authentication: User sessions are managed securely using JSON Web Tokens (JWT), ensuring that protected routes and API endpoints are only accessible to logged-in users.

Dedicated Sidebar Navigation: A clean sidebar provides easy access to all relevant pages like Order History and About Us.

Order History: Customers can view a complete history of their past orders, including items, total cost, and status.

Real-Time Order Tracking: A public page where anyone can track the status of an order using its unique ID.

Mock Payment Gateway: A multi-option payment page (Card, UPI, Net Banking) to simulate a complete checkout experience.

🛠️ Tech Stack
This project is built with the powerful MERN stack and other modern web technologies.

Category

Technology

Frontend

React.js, React Router, Tailwind CSS, Axios

Backend

Node.js, Express.js

Database

MongoDB with Mongoose

Auth

JSON Web Tokens (JWT), bcrypt.js

🚀 Getting Started
Ready to run the project on your own machine? Just follow these steps.

Prerequisites
Make sure you have Node.js installed.

You'll need a running instance of MongoDB on your local machine.

1. Backend Setup
First, let's get the server running.

# Navigate to the backend folder
cd backend

# Install all the necessary packages
npm install

# Start the server (it will run on http://localhost:5001)
npm start

2. Frontend Setup
Now, open a new terminal and get the React app running.

# Navigate to the frontend folder
cd frontend

# Install all the necessary packages
npm install

# Start the React app (it will open in your browser at http://localhost:3000)
npm start

And that's it! The application should now be running, with the frontend and backend connected.

💡 How It Works
The flow is designed to be simple and intuitive:

Browsing: Anyone can visit the site and view the menu.

Ordering: When a user tries to add an item to the cart, the system prompts them to log in.

Authentication: Users can register as either a "Customer" or "Kitchen Staff".

Checkout: Once logged in, customers can manage their cart and proceed to the payment page.

Payment: After selecting a mock payment method, the order is confirmed and sent to the kitchen.

Kitchen Management: The order instantly appears on the Kitchen Dashboard. Staff can click the order card to advance its status from "Received" to "Preparing" and finally to "Ready for Pickup."

Tracking: The customer can monitor this progress in real-time on the "Track Order" page or in their "Order History."

🔮 Future Enhancements
This project has a solid foundation, but there's always room to grow! Here are a few ideas:

Real-Time Updates with WebSockets: Replace the current polling mechanism with WebSockets (Socket.io) for instant, event-based updates on the kitchen dashboard and tracking page.

Admin Panel: A super-user dashboard to manage menu items (add/edit/delete), view sales analytics, and manage user accounts.

Real Payment Integration: Integrate a real payment gateway like Stripe or Razorpay.

User Profile Management: Allow users to update their profile information and password.

Notifications: Implement email or browser notifications to alert customers when their order status changes.

This project was a fantastic exercise in building a full-stack MERN application. Feel free to explore, fork, and build upon it!
