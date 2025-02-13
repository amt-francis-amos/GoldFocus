import heroImg from './hero-img.jpg';
import goldImg from './gold-img.png';
import goldLogo  from  './gold-logo.png'

export const assets = {
        heroImg,
        goldLogo,
        goldImg
}


import { FaGem, FaHandHoldingUsd, FaShieldAlt, FaChartLine, FaTruck, FaCoins } from "react-icons/fa";


export const services = [
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