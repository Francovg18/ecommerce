import Layout from "../hocs/Layout";
import { connect } from "react-redux";
import {
    get_products_by_arrival,
    get_products_by_sold,
    get_products_for_showcase // Nueva acción
} from '../redux/actions/products';
import { useEffect } from "react";
import Banner from "../componentes/home/Banner";
import ProductsArrival from "../componentes/home/ProductsArrival";
import ProductsSold from "../componentes/home/ProductsSold";

const Home = ({
    get_products_by_arrival,
    get_products_by_sold,
    get_products_for_showcase, // Nueva acción
    products_arrival,
    products_sold,
    products_showcase // Nuevo estado
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
            </div>
        </Layout>
    );
};

const mapStateToProps = state => ({
    products_arrival: state.Products.products_arrival,
    products_sold: state.Products.products_sold,
    products_showcase: state.Products.products_showcase // Nuevo estado
});

export default connect(mapStateToProps, {
    get_products_by_arrival,
    get_products_by_sold,
    get_products_for_showcase // Nueva acción
})(Home);
