import Layout from "../hocs/Layout";
import { connect } from "react-redux";
import {
    get_products_by_arrival
} from '../redux/actions/products';
import { useEffect } from "react";
import NewsProducts from "./pages/NewsProducts";

const Home = ({ get_products_by_arrival, products_arrival
}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        get_products_by_arrival();
    }, [get_products_by_arrival]);

    return (
        <Layout>
            <div className="text-blue-500">
                <NewsProducts data={products_arrival} />
            </div>
        </Layout>
    );
};

const mapStateToProps = state => ({
    products_arrival: state.Products.products_arrival
});

export default connect(mapStateToProps, {
    get_products_by_arrival
})(Home);