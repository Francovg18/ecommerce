import { useEffect } from "react"
import { connect } from "react-redux"
import { get_brands } from "../../redux/actions/brands"
const Brand =({
    get_brands,
    brands
}) => {

    useEffect(() => {
        get_brands();
        window.scrollTo(0, 0);
    }, [get_brands]);

  return (
    <div>
        <h1>Marcas</h1>
            <ul className="space-y-4">
                {brands.map((brand) => (
                    <li key={brand.id} className="text-gray-900 font-medium">
                        {brand.name}
                    </li>
                ))}
            </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
    brands: state.Brands.brands
});

export default connect(mapStateToProps, {
    get_brands
}) (Brand)