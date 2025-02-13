import React from "react";
import { motion } from "framer-motion";
import { FaGem, FaHandHoldingUsd, FaShieldAlt, FaChartLine, FaTruck, FaCoins } from "react-icons/fa";

const services = [
  { id: 1, icon: <FaGem />, title: "Gold Trading", description: "We provide high-quality, certified gold for trading and investment purposes." },
  { id: 2, icon: <FaHandHoldingUsd />, title: "Gold Investment", description: "Secure your future with our trusted gold investment plans and financial guidance." },
  { id: 3, icon: <FaShieldAlt />, title: "Gold Security & Storage", description: "Your gold is safe with us! We offer secure storage solutions with full insurance." },
  { id: 4, icon: <FaChartLine />, title: "Market Analysis", description: "Stay updated with expert gold market insights and investment strategies." },
  { id: 5, icon: <FaTruck />, title: "Gold Delivery", description: "Fast and secure gold delivery services to your preferred location worldwide." },
  { id: 6, icon: <FaCoins />, title: "Custom Gold Coins & Jewelry", description: "We craft customized gold coins, bars, and jewelry to your specifications." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Services = () => {
  return (
    <motion.div 
      className="bg-gray-100 text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <motion.div 
          className="text-center mt-20"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-yellow-600">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Premium Gold Solutions for Your Investment & Trading Needs
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-white p-6 shadow-lg rounded-lg text-center transform transition hover:scale-105"
              variants={cardVariants}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="text-yellow-600 text-5xl flex justify-center"
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {service.icon}
              </motion.div>
              <h3 className="mt-4 text-2xl font-semibold text-yellow-700">{service.title}</h3>
              <p className="mt-2 text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;
