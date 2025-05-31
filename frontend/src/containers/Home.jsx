import Layout from "../hocs/Layout";
import { connect } from "react-redux";
import {
    get_products_by_arrival,
    get_products_by_sold,
    get_products_for_showcase 
} from '../redux/actions/products';
import { useEffect } from "react";
import Banner from "../components/home/Banner";
import ProductsArrival from "../components/home/ProductsArrival";
import ProductsSold from "../components/home/ProductsSold";
import Brand from "../components/home/Brand";
import Product from "../components/home/Product";
const Home = ({
    get_products_by_arrival,
    get_products_by_sold,
    get_products_for_showcase, 
    products_arrival,
    products_sold,
    products_showcase 
}) => {

    useEffect(() => {
        window.scrollTo(0, 0);

        get_products_by_arrival();
        get_products_by_sold();
        get_products_for_showcase(); 
    }, []);

    return (
        <Layout>
            <div className="text-blue-500">
                <Banner data={products_showcase} />
                <ProductsArrival data={products_arrival} />
                <ProductsSold data={products_sold} />
                <Brand />
                <Product/>
            </div>
        </Layout>
    );
};

const mapStateToProps = state => ({
    products_arrival: state.Products.products_arrival,
    products_sold: state.Products.products_sold,
    products_showcase: state.Products.products_showcase 
});

export default connect(mapStateToProps, {
    get_products_by_arrival,
    get_products_by_sold,
    get_products_for_showcase 
})(Home);
