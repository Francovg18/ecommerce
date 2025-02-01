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
    const productsPerPage = 8;

    const { category_id, price_range, sortBy, order } = formData;

    useEffect(() => {
        get_categories();
        get_products();
        window.scrollTo(0, 0);
    }, [get_categories, get_products]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        get_filtered_products(category_id, price_range, sortBy, order);
        setFiltered(true);
        setCurrentPage(1);
    };

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
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                            <form onSubmit={onSubmit} className="hidden lg:block">
                                <h3 className="sr-only">Categorías</h3>
                               

                            
                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex items-center justify-between w-full text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Precios</span>
                                                {open ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-6">
                                                    {prices.map((price) => (
                                                        <div key={price.id} className="form-check">
                                                            <input
                                                                name="price_range"
                                                                type="radio"
                                                                value={price.name}
                                                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                                                checked={formData.price_range === price.name}
                                                                onChange={onChange}
                                                            />
                                                            <label className="ml-3 text-gray-500">{price.name}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                    
                                </Disclosure>
                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                        <span className="font-sofiapro-regular text-gray-900">Mas Filtros</span>
                                        <span className="ml-6 flex items-center">
                                        {open ? (
                                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                        </span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-6">
                                        <div className='form-group '>
                                            <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                            >Ver por</label>
                                                <select
                                                    className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                    id='sortBy'
                                                    name='sortBy'
                                                    onChange={e => onChange(e)}
                                                    value={sortBy}
                                                >
                                                <option value='date_created'>Fecha</option>
                                                <option value='price'>Precio</option>
                                                <option value='sold'>Sold</option>
                                                <option value='title'>Nombre</option>

                                                </select>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                            >Orden</label>
                                            <select
                                                className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                id='order'
                                                name='order'
                                                onChange={e => onChange(e)}
                                                value={order}
                                            >
                                                <option value='asc'>A - Z</option>
                                                <option value='desc'>Z - A</option>
                                            </select>
                                        </div>
                                        </div>
                                    </Disclosure.Panel>
                                    </h3>
                                    </>
                                )}
                                </Disclosure>
                                <button
                                    type="submit"
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
                                >
                                    Buscar
                                </button>
                            </form>


                            <div className="lg:col-span-3">
                                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
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