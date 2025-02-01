import { useEffect, useRef, useState } from "react";
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

  const [progressWidth, setProgressWidth] = useState(0);
    const [maxLength, setMaxLength] = useState(35);
    const headingRef = useRef(null);

  
    
      useEffect(() => {
        const updateMaxLength = () => {
          setMaxLength(window.innerWidth >= 1024 ? 90 : 35);
        };
    
        updateMaxLength();
        window.addEventListener("resize", updateMaxLength);
        return () => window.removeEventListener("resize", updateMaxLength);
      }, []);
    
      useEffect(() => {
        if (headingRef.current) {
          const textLength = headingRef.current.textContent.length;
          setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
        }
      }, [maxLength]);

  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, 
    cssEase: 'linear', 
    focusOnSelect: true,
    arrows: false, 
    dots: false, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, 
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
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-8">
        <h2
              ref={headingRef}
              className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block"
            >
              Marcas
            </h2>
            <div className="w-full bg-gray-200 h-1 mt-1">
              <div
                className="bg-red-500 h-1"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
        </div>

        {/* Carrusel con marcas */}
        <Slider {...settings}>
          {brands &&
            brands.map((brand) => (
              <div key={brand.id} className="group relative px-0">
                <div className="w-full h-48 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
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
