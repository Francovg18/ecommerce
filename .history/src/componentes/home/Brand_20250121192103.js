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
    <div>Brand</div>
  )
}

const mapStateToProps = (state) => ({
    brands: state.Brands.brands
});

export default connect(mapStateToProps, {
    get_brands
}) (Brand)