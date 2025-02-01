import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ProductsArrival({ data, isAuthenticated }) {
  const [progressWidth, setProgressWidth] = useState(0);
  const headingRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    customPaging: () => <button className="w-6 h-3 mx-1 bg-gray-600 rounded-full focus:outline-none"></button>,
    responsive: [
      { breakpoint: 1240, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  useEffect(() => {
    const updateProgressWidth = () => {
      if (headingRef.current) {
        const textLength = headingRef.current.textContent.length;
        const maxLength = window.innerWidth >= 1024 ? 90 : 35;
        setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
      }
    };
    updateProgressWidth();
    window.addEventListener("resize", updateProgressWidth);
    return () => window.removeEventListener("resize", updateProgressWidth);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-28">
        <div className="py-8">
          <h2 ref={headingRef} className="text-2xl font-extrabold tracking-tight text-gray-900">
            Productos nuevos
          </h2>
          <div className="w-full bg-gray-200 h-1 mt-1">
            <div className="bg-red-500 h-1" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ isAuthenticated: state.Auth.isAuthenticated });

export default connect(mapStateToProps)(ProductsArrival);
