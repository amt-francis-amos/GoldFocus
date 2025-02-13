import React from "react";
import {assets} from "../assets/assets"

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto px-6 py-12  mt-30 lg:py-20">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-black">
            About Us
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Excellence in Gold Trading & Investment
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
      
          <div className="relative">
            <img
              src={assets.goldImg}
              alt="Gold Bars"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-yellow-700">
              Who We Are
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              At <span className="text-yellow-600 font-semibold"></span>, 
              we provide premium gold products with a commitment to quality, transparency, and 
              integrity. Our gold is 100% authentic and certified, ensuring the highest industry 
              standards.
            </p>

            
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default About;
