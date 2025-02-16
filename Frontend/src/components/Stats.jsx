import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  const stats = [
    { label: "Years in Business", value: 15 },
    { label: "Happy Customers", value: 9100, suffix: "+" },
    { label: "Licensed Staff", value: 128 },
    { label: "Assets Protected", value: 80, suffix: "M+" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8  text-center">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white shadow-md p-6 rounded-lg w-48">
          <h3 className="text-3xl font-bold text-blue-600">
            <CountUp end={stat.value} duration={3} suffix={stat.suffix || ""} />
          </h3>
          <p className="text-gray-700 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
