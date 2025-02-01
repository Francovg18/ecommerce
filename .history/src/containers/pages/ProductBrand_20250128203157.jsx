import { useEffect, useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import { get_brands } from "../../redux/actions/brands";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Brand = ({ brands, get_brands }) => {

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-28">
        <div className="py-8">
          <h2>Marcassss</h2>
          <div className="w-full bg-gray-200 h-1 mt-1">
          </div>
        </div>

          {brands &&
            brands.map((brand) => (
              <div key={brand.id} className="group relative px-0">
                <div className="w-full h-24 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-sm text-gray-700">{brand.name}</h3>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  brands: state.Brands.brands,
});

export default connect(mapStateToProps, { get_brands })(Brand);
