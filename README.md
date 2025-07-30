Automated Canteen System 
Tired of long queues and mixed-up orders at the canteen? This project is a modern solution to an age-old problem. It's a smart, full-stack web application designed to make the entire canteen experience smoother, faster, and error-free for both customers and kitchen staff.

(Pro-tip: Replace the placeholder above with a cool GIF or screenshot of your app!)

The Problem
Let's be real, traditional canteens can be chaotic. You wait in line to order, wait again for your food, and sometimes the kitchen staff can't read the handwritten ticket. This system digitizes the entire workflow, from browsing the menu to getting that "Your order is ready!" notification.

Features
This isn't just a simple ordering app. It's a complete system with features like:

Online Ordering: A clean, responsive menu where customers can browse and place orders from their devices.

Unique Order ID: Every order gets a unique, easy-to-remember ID (like ORD-A4B7Y2) for hassle-free tracking.

Live Status Tracking: A dedicated page for customers to see the real-time status of their order: Received -> Preparing -> Ready for Pickup.

Kitchen Dashboard: A dynamic dashboard for the kitchen staff to view and manage incoming orders in organized columns.

Real-time Updates: The system uses polling to ensure that both the kitchen and customer views are always up-to-date.

Tech Stack
This project is built with the MERN stack, a powerful and popular choice for full-stack web development.

Frontend: React.js (for a fast, responsive user interface) & Tailwind CSS (for modern styling).

Backend: Node.js & Express.js (for building a robust and scalable server).

Database: MongoDB (a flexible NoSQL database to store order and user data).

And a little help from:

axios for making API requests.

mongoose for modeling our database objects.

nanoid for generating our unique order IDs.

Getting Started
Ready to run the project on your own machine? Just follow these steps.

Prerequisites
Make sure you have Node.js installed.

You'll need a running instance of MongoDB.

1. Set up the Backend
First, let's get the server running.

# Navigate to the backend folder
cd backend

# Install all the necessary packages
npm install

# Start the server (it will run on http://localhost:5001)
npm start

2. Set up the Frontend
Now, open a new terminal and get the React app running.

# Navigate to the frontend folder
cd frontend

# Install all the necessary packages
npm install

# Start the React app (it will open in your browser at http://localhost:3000)
npm start

And that's it! The application should now be running, with the frontend and backend connected.

How It Works
The flow is simple and intuitive:

A customer visits the site, adds items to their cart, and places an order.

The order is sent to the backend, which saves it in the MongoDB database and generates a unique orderId.

The kitchen staff, watching the Kitchen Dashboard, immediately see the new order appear in the "Received" column.

As the kitchen works on the order, they update its status, which is instantly reflected in the database.

The customer can use their orderId on the "Track Order" page to see the live status of their food.

Future Ideas
This project has a solid foundation, but there's always room to grow! Here are a few ideas:

User Authentication: Add login/signup for customers to view their order history.

Real-time with WebSockets: Replace polling with WebSockets (Socket.io) for instant, event-based updates.

Payment Gateway Integration: Allow customers to pay online when they place an order.

Admin Panel: A dashboard for the canteen owner to manage menu items, view sales analytics, and more.

Hope you enjoy exploring and building upon this project!
