import { useEffect } from "react";
import { connect } from "react-redux";
import { get_brands } from "../../redux/actions/brands";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Brand = ({
  get_brands,
  brands
}) => {
  useEffect(() => {
    get_brands();
    window.scrollTo(0, 0);
  }, [get_brands]);

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    customPaging: (i) => (
      <button className="w-6 h-3 mx-1 bg-gray-600 rounded-full focus:outline-none"></button>
    ),
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-28">
        <div className="py-8">
          <div className="py-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block">
              Marcas
            </h2>
            <div className="w-full bg-gray-200 h-1 mt-1">
              <div className="bg-red-500 h-1" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>

        {/* Carrusel con marcas */}
        <Slider {...settings}>
          {brands &&
            brands.map((brand) => (
              <div key={brand.id} className="group relative px-2">
                <div className="w-full h-52 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-52 lg:aspect-none">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="mt-5 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span>{brand.name}</span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  brands: state.Brands.brands
});

export default connect(mapStateToProps, {
  get_brands
})(Brand);
