import Layout from '../../../hocs/Layout';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { get_categories } from '../../../redux/actions/categories';
import { get_products, get_filtered_products } from '../../../redux/actions/products';
import ProductCard from '../../../components/product/ProductCard';

const Products = ({
    get_categories,
    get_products,
    products,
    filtered_products
}) => {
    const [filtered] = useState(false);
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
    
        const maxPagesToShow = 10;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
    
        return (
            <div className="flex justify-center mt-4 space-x-1 overflow-x-auto px-2">
                {currentPage > 1 && (
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-1 text-sm border rounded bg-gray-300"
                    >
                        ‹
                    </button>
                )}

                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-2 py-1 text-sm border rounded bg-gray-200"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-2 py-1 text-sm">...</span>}
                    </>
                )}

                {[...Array(endPage - startPage + 1).keys()].map((i) => (
                    <button
                        key={startPage + i}
                        onClick={() => handlePageChange(startPage + i)}
                        className={`px-2 py-1 text-sm border rounded ${
                            startPage + i === currentPage ? 'bg-red-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {startPage + i}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-2 py-1 text-sm">...</span>}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-2 py-1 text-sm border rounded bg-gray-200"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {currentPage < totalPages && (
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-2 py-1 text-sm border rounded bg-gray-300"
                    >
                        ›
                    </button>
                )}
            </div>

        );
    };

    return (
        <Layout>
            <div className="bg-white">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                        <h1 className="-mt-12 text-4xl font-extrabold tracking-tight text-gray-900">Todos los productos</h1>
                    </div>

                    <section className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">Productos</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {showProducts()}
                        </div>

                        {renderPagination()}
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

export default connect(mapStateToProps, {
    get_categories,
    get_products,
    get_filtered_products
})(Products);
