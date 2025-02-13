import React from "react";
import {services} from "../assets/assets";


const Services = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto px-6 py-12 lg:py-20">
     
        <div className="text-center">
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
