import { connect } from "react-redux";
import { get_brands } from "../../redux/actions/brands";
import { useEffect, useState } from "react";

const Brand = ({ brands, get_brands }) => {
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("ALL");

  useEffect(() => {
    get_brands();
  }, [get_brands]);

  useEffect(() => {
    if (selectedLetter === "ALL") {
      setFilteredBrands(brands);
    } else {
      setFilteredBrands(brands.filter((brand) => brand.name.startsWith(selectedLetter)));
    }
  }, [brands, selectedLetter]);

  const letters = "ACDEFGHILMNOSTV".split("");

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-32">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Marcas</h2>
        <div className="flex justify-center space-x-2 mb-12">
          <button onClick={() => setSelectedLetter("ALL")} className={`px-3 py-1 rounded-md ${selectedLetter === "ALL" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}>Todas</button>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1 rounded-md ${selectedLetter === letter ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {filteredBrands &&
            filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="relative group w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-16 object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold">{brand.name}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  brands: state.Brands.brands,
});

export default connect(mapStateToProps, { get_brands })(Brand);