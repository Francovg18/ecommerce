import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import { get_categories } from '../../redux/actions/categories';
import { get_products, get_filtered_products } from '../../redux/actions/products';
import ProductCard from '../../components/product/ProductCard';
import { prices } from '../../helpers/fixedPrices';
const Products = ({
    get_categories,
    categories,
    get_products,
    products,
    get_filtered_products,
    filtered_products
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [filtered, setFiltered] = useState(false);
    const [formData, setFormData] = useState({
        category_id: '0',
        price_range: 'Any',
        sortBy: 'created',
        order: 'desc'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 18;


    useEffect(() => {
        get_categories();
        get_products();
        window.scrollTo(0, 0);
    }, [get_categories, get_products]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const showProducts = () => {
        const productsToDisplay = filtered ? filtered_products : products;
        const startIndex = (currentPage - 1) * productsPerPage;
        const currentProducts = productsToDisplay?.slice(startIndex, startIndex + productsPerPage) || [];

        return currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ));
    };

    const renderPagination = () => {
        const productsToDisplay = filtered ? filtered_products : products;
        const totalPages = productsToDisplay ? Math.ceil(productsToDisplay.length / productsPerPage) : 0;

        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map((i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${
                            i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <Layout>
            <div className="bg-white">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Todos los productos</h1>
                    </div>
                   

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">Productos</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                            <div className="lg:col-span-3">
                                <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-3 gap-2">
                                    {showProducts()}
                                </div>
                                {renderPagination()}
                            </div>

                            
                        </div>
                    </section>
                </main>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    categories: state.Categories.categories,
    brands: state.Brands.brands,
    products: state.Products.products,
    filtered_products: state.Products.filtered_products
});
export default connect(mapStateToProps,{
    get_categories,
    get_products,
    get_filtered_products
}) (Products)