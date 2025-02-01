import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Slider from "react-slick"; 

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ProductsArrival({ data, isAuthenticated }) {
  const [progressWidth, setProgressWidth] = useState(0);
  const [maxLength, setMaxLength] = useState(35);
  const headingRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true, 
    customPaging: () => (
      <button className="w-6 h-3 mx-1 bg-gray-600 rounded-full focus:outline-none"></button>
    ),

  };

  const updateMaxLength = () => {
    setMaxLength(window.innerWidth >= 1024 ? 90 : 35);
  };

  const calculateProgressWidth = () => {
    if (headingRef.current) {
      const textLength = headingRef.current.textContent.length;
      setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
    }
  };

  useEffect(() => {
    updateMaxLength();
    window.addEventListener("resize", updateMaxLength);
    return () => window.removeEventListener("resize", updateMaxLength);
  }, []);

  useEffect(() => {
    calculateProgressWidth();
  }, [maxLength]);

  const renderProduct = (product) => (
    <div key={product.id} className="group relative px-4">
      <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-52 lg:aspect-none">
        <img
          src={product.get_thumbnail}
          alt="Product"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="mt-5 flex justify-between">
        <h3 className="text-sm text-gray-700">
          <Link to={`product/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className={`text-sm ${isAuthenticated ? "font-medium text-gray-900" : "text-red-500"}`}>
          {isAuthenticated ? `Bs${product.price}` : "No permitido"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-28">
        <div className="py-8">
          <h2
            ref={headingRef}
            className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block"
          >
            Productos nuevos
          </h2>
          <div className="w-full bg-gray-200 h-1 mt-1">
            <div className="bg-red-500 h-1" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>

        <Slider {...settings}>
          {data && data.map(renderProduct)}
        </Slider>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProductsArrival);
