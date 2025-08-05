import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our Canteen</h1>
            <p className="text-gray-700 leading-relaxed">
                Welcome to the Automated Canteen System, a project designed to revolutionize the way you experience your daily meals. Our mission is to eliminate queues, reduce wait times, and provide a seamless and efficient ordering process from start to finish.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
                This application is built with modern web technologies, including the MERN stack (MongoDB, Express.js, React, and Node.js), to deliver a fast, responsive, and reliable user experience. Whether you're a hungry customer or a busy member of the kitchen staff, our system is designed to make your life easier.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Our Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Online ordering from a digital menu with images.</li>
                <li>Secure user authentication and role-based access for customers and kitchen staff.</li>
                <li>A persistent shopping cart that remembers your items.</li>
                <li>A mock payment gateway with multiple payment options.</li>
                <li>Real-time order tracking from placement to pickup.</li>
                <li>A dedicated dashboard for the kitchen to manage incoming orders efficiently.</li>
                <li>Personal order history for all registered users.</li>
            </ul>
        </div>
    );
};

export default AboutUs;