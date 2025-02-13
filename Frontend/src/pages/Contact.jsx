import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto px-6 py-12 lg:py-20">
    
        <div className="text-center mt-30">
          <h1 className="text-4xl lg:text-5xl font-bold text-yellow-600">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            We’re here to help. Get in touch with us today!
          </p>
        </div>

 
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
         
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-yellow-600 text-2xl" />
              <p className="text-lg text-gray-700">
                <strong>Address:</strong> 123 Gold Street, Accra, Ghana
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-yellow-600 text-2xl" />
              <p className="text-lg text-gray-700">
                <strong>Phone:</strong> +233 123 456 789
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-yellow-600 text-2xl" />
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> contact@yourgoldbusiness.com
              </p>
            </div>
          </div>

       
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
              Send Us a Message
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                ></textarea>
              </div>

              <button className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-lg hover:bg-yellow-700 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>

 
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-yellow-700 text-center">
            Our Location
          </h2>
          <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Maps"
              className="w-full h-72 md:h-96"
              src="https://maps.google.com/maps?q=Accra,Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
