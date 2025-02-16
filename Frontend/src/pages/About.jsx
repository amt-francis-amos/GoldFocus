import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const About = () => {
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
          className="text-center"
        >
          <h1 className="text-4xl lg:text-5xl mt-20 font-bold text-black">
            About Us
          </h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "backOut" }}
            className="mt-4 text-lg text-gray-700"
          >
            Excellence in Gold Trading & Investment
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
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img
              src={assets.goldImg}
              alt="Gold Bars"
              className="rounded-lg shadow-lg"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-semibold text-yellow-700">
              Who We Are
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-4 text-gray-700 leading-relaxed"
            >
              At{" "}
              <span className="text-yellow-600 font-semibold">GoldCorp</span>,
              we provide premium gold products with a commitment to quality,
              transparency, and integrity. Our gold is 100% authentic and
              certified, ensuring the highest industry standards.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
