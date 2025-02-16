import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-gray-100 text-gray-900"
    >
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mt-30"
        >
          <h1 className="text-4xl lg:text-5xl mt-20 font-bold text-yellow-600">
            Contact Us
          </h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "backOut" }}
            className="mt-4 text-lg text-gray-700"
          >
            We’re here to help. Get in touch with us today!
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid md:grid-cols-2 gap-10 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, staggerChildren: 0.3 },
            },
          }}
        >
          <motion.div className="space-y-6">
            {[
              {
                icon: <FaMapMarkerAlt className="text-yellow-600 text-2xl" />,
                text: "123 Gold Street, Accra, Ghana",
                label: "Address",
              },
              {
                icon: <FaPhoneAlt className="text-yellow-600 text-2xl" />,
                text: "+233 123 456 789",
                label: "Phone",
              },
              {
                icon: <FaEnvelope className="text-yellow-600 text-2xl" />,
                text: "contact@yourgoldbusiness.com",
                label: "Email",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {item.icon}
                <p className="text-lg text-gray-700">
                  <strong>{item.label}:</strong> {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
              Send Us a Message
            </h2>
            <form>
              {[
                { label: "Full Name", type: "text", placeholder: "Enter your name" },
                { label: "Email Address", type: "email", placeholder: "Enter your email" },
              ].map((field, index) => (
                <motion.div
                  key={index}
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 + index * 0.2 }}
                >
                  <label className="block text-gray-700 font-medium">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </motion.div>
              ))}

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                ></textarea>
              </motion.div>

              <motion.button
                className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-lg hover:bg-yellow-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-3xl font-semibold text-yellow-700 text-center">
            Our Location
          </h2>
          <motion.div
            className="mt-6 rounded-lg overflow-hidden shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <iframe
              title="Google Maps"
              className="w-full h-72 md:h-96"
              src="https://maps.google.com/maps?q=Accra,Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
