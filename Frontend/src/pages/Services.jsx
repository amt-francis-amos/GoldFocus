import React from "react";
import { FaGem, FaHandHoldingUsd, FaShieldAlt, FaChartLine, FaTruck, FaCoins } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaGem className="text-yellow-600 text-5xl" />,
    title: "Gold Trading",
    description: "We provide high-quality, certified gold for trading and investment purposes.",
  },
  {
    id: 2,
    icon: <FaHandHoldingUsd className="text-yellow-600 text-5xl" />,
    title: "Gold Investment",
    description: "Secure your future with our trusted gold investment plans and financial guidance.",
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-yellow-600 text-5xl" />,
    title: "Gold Security & Storage",
    description: "Your gold is safe with us! We offer secure storage solutions with full insurance.",
  },
  {
    id: 4,
    icon: <FaChartLine className="text-yellow-600 text-5xl" />,
    title: "Market Analysis",
    description: "Stay updated with expert gold market insights and investment strategies.",
  },
  {
    id: 5,
    icon: <FaTruck className="text-yellow-600 text-5xl" />,
    title: "Gold Delivery",
    description: "Fast and secure gold delivery services to your preferred location worldwide.",
  },
  {
    id: 6,
    icon: <FaCoins className="text-yellow-600 text-5xl" />,
    title: "Custom Gold Coins & Jewelry",
    description: "We craft customized gold coins, bars, and jewelry to your specifications.",
  },
];

const Services = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto px-6 py-12 lg:py-20">
     
        <div className="text-center mt-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-yellow-600">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Premium Gold Solutions for Your Investment & Trading Needs
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 shadow-lg rounded-lg text-center transform transition hover:scale-105">
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="mt-4 text-2xl font-semibold text-yellow-700">{service.title}</h3>
              <p className="mt-2 text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
