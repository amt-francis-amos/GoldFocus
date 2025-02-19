import React from "react";
import { motion } from "framer-motion";
import { FaCoins, FaHandshake, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Stats from "../components/Stats";

const Home = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
    
      <motion.section 
        className="relative bg-cover bg-center min-h-screen flex items-center text-center"
        style={{ backgroundImage: `url(${assets.heroImg})` }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
         <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-white text-2xl">15+ Years of Experience</h2>
          <motion.h1 
            className="text-2xl md:text-5xl font-bold text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            Secure Your Future with <span className="text-yellow-500">Gold Investments</span>
          </motion.h1>
          <p className="text-lg text-white mt-4">Trusted & transparent gold trading for a brighter tomorrow.</p>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            <Link to="/login" className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition">
              Access Vault Login
            </Link>
          </motion.div>
        </div>
      </motion.section>

    
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
          >
            {[
              { title: "Gold Trading", icon: <FaCoins />, desc: "Buy and sell gold with real-time market pricing." },
              { title: "Investment Plans", icon: <FaCoins />, desc: "Secure your financial future with our tailored gold investment plans." },
              { title: "Consultancy", icon: <FaHandshake />, desc: "Expert guidance to help you make the best investment decisions." }
            ].map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center items-center text-5xl text-yellow-500 mx-auto h-16 w-16">
                  {service.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

   
      <section className="py-16 bg-gray-900">
        <Stats />
      </section>

     
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">What Our Clients Say</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                text: `"Imperial Gold Security has helped me grow my investment portfolio significantly. Highly recommended!"`, 
                name: "James K.",
                image: "https://randomuser.me/api/portraits/men/32.jpg" 
              },
              { 
                text: `"Their transparency and professionalism make them the best in the industry."`, 
                name: "Linda M.",
                image: "https://randomuser.me/api/portraits/women/44.jpg" 
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
                />
                <FaQuoteLeft className="text-3xl text-yellow-500 mt-4" />
                <p className="mt-4 text-gray-600">{testimonial.text}</p>
                <h3 className="mt-4 font-semibold">{testimonial.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <motion.section 
        className="py-16 bg-gray-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Ready to Invest?</h2>
          <p className="mt-4 text-gray-300">Get in touch with us today to start your gold investment journey.</p>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/contact" className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
