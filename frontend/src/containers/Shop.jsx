import Layout from '../hocs/Layout';
import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import { get_categories } from '../redux/actions/categories';
import { get_products, get_filtered_products } from '../redux/actions/products';
import ProductCard from '../components/product/ProductCard';
import { prices } from '../helpers/fixedPrices';
const Shop = ({
    get_categories,
    categories,
    get_products,
    products,
    get_filtered_products,
    filtered_products
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filtered, setFiltered] = useState(false);
    const [formData, setFormData] = useState({
        category_id: '0',
        price_range: 'Any',
        sortBy: 'created',
        order: 'desc'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    const { category_id, price_range, sortBy, order } = formData;

    useEffect(() => {
        get_categories();
        get_products();
        window.scrollTo(0, 0);
    }, [get_categories, get_products]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleCategoryChange = (e) => {
        setFormData({ ...formData, category_id: parseInt(e.target.value) }); 
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        get_filtered_products(parseInt(category_id), price_range, sortBy, order);
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
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Categorías y Filtros</h1>
                    {/* <button
                        type="submit"
                        className="mr-4 px-20 py-2 text-sm font-medium text-white bg-midnight-blue rounded-md shadow-sm hover:bg-purple-night"
                    >
                        Buscar
                    </button> */}
                    </div>
                    
                    <div className="flex items-center justify-between lg:hidden">
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <ChevronDownIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Filtros
                        </button>
                        {mobileFiltersOpen && (
                        <div className="fixed inset-0 flex z-40 lg:hidden">
                            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)}></div>
                            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                                    <button
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="h-6 w-6 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <MinusSmIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={onSubmit} className="lg:block">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full text-gray-900 font-medium px-2 py-3">
                                            <span className='mb-4'>Categorías</span>
                                            {open ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5 mr-2" />}
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pt-2 space-y-3  max-h-80 overflow-y-auto">
                                            {categories && categories.map(category => (
                                                <div key={category.id} className='flex items-center h-5 my-2'>
                                                    <input
                                                        name='category_id'
                                                        onChange={handleCategoryChange}
                                                        value={category.id.toString()}
                                                        type='radio'
                                                        className='ml-4 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                    />
                                                    <label className="ml-3 text-gray-700 text-sm">{category.name}</label>
                                                </div>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>

                            <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full text-gray-900 font-medium">
                                            <span>Precios</span>
                                            {open ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5" />}
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pt-6">
                                            <div className="space-y-3">
                                                {prices.map((price) => (
                                                    <div key={price.id} className="flex items-center h-5">
                                                        <input
                                                            name="price_range"
                                                            type="radio"
                                                            value={price.name}
                                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                                            checked={formData.price_range === price.name}
                                                            onChange={onChange}
                                                        />
                                                        <label className="ml-3 text-gray-700">{price.name}</label>
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
                                        <Disclosure.Button className="flex items-center justify-between w-full text-gray-900 font-medium">
                                            <span>Más Filtros</span>
                                            {open ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5" />}
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pt-6">
                                            <div className="space-y-3">
                                                <div className='form-group'>
                                                    <label htmlFor='sortBy' className='text-gray-700'>Ver por</label>
                                                    <select
                                                        id='sortBy'
                                                        name='sortBy'
                                                        onChange={onChange}
                                                        value={sortBy}
                                                        className='block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm'
                                                    >
                                                        <option value='date_created'>Fecha</option>
                                                        <option value='price'>Precio</option>
                                                        <option value='sold'>Sold</option>
                                                        <option value='title'>Nombre</option>
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='order' className='text-gray-700'>Orden</label>
                                                    <select
                                                        id='order'
                                                        name='order'
                                                        onChange={onChange}
                                                        value={order}
                                                        className='block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm'
                                                    >
                                                        <option value='asc'>A - Z</option>
                                                        <option value='desc'>Z - A</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>

                            <button
                                type="submit"
                                className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-midnight-blue rounded-md shadow-sm hover:bg-purple-night"
                            >
                                Buscar
                            </button>
                        </form>
                            </div>
                        </div>
                    )}

                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">Productos</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                        <form onSubmit={onSubmit} className="hidden lg:block">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full text-gray-900 font-medium px-2 py-3">
                                            <span className='mb-4'>Categorías</span>
                                            {open ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5 mr-2" />}
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pt-2 space-y-3  max-h-80 overflow-y-auto">
                                            {categories && categories.map(category => (
                                                <div key={category.id} className='flex items-center h-5 my-2'>
                                                    <input
                                                        name='category_id'
                                                        onChange={handleCategoryChange}
                                                        value={category.id.toString()}
                                                        type='radio'
                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                    />
                                                    <label className="ml-3 text-gray-700 text-sm">{category.name}</label>
                                                </div>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>

                            <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full text-gray-900 font-medium">
                                            <span>Precios</span>
                                            {open ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5" />}
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pt-6">
                                            <div className="space-y-3">
                                                {prices.map((price) => (
                                                    <div key={price.id} className="flex items-center h-5">
                                                        <input
                                                            name="price_range"
                                                            type="radio"
                                                            value={price.name}
                                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                                            checked={formData.price_range === price.name}
                                                            onChange={onChange}
                                                        />
                                                        <label className="ml-3 text-gray-700">{price.name}</label>
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
                                        <Disclosure.Button className="flex items-center justify-between w-full text-gray-900 font-medium">
                                            <span>Más Filtros</span>
                                            {open ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5" />}
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pt-6">
                                            <div className="space-y-3">
                                                <div className='form-group'>
                                                    <label htmlFor='sortBy' className='text-gray-700'>Ver por</label>
                                                    <select
                                                        id='sortBy'
                                                        name='sortBy'
                                                        onChange={onChange}
                                                        value={sortBy}
                                                        className='block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm'
                                                    >
                                                        <option value='date_created'>Fecha</option>
                                                        <option value='price'>Precio</option>
                                                        <option value='sold'>Sold</option>
                                                        <option value='title'>Nombre</option>
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='order' className='text-gray-700'>Orden</label>
                                                    <select
                                                        id='order'
                                                        name='order'
                                                        onChange={onChange}
                                                        value={order}
                                                        className='block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm'
                                                    >
                                                        <option value='asc'>A - Z</option>
                                                        <option value='desc'>Z - A</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>

                            <button
                                type="submit"
                                className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-midnight-blue rounded-md shadow-sm hover:bg-purple-night"
                            >
                                Buscar
                            </button>
                        </form>


                            <div className="lg:col-span-3">                               
                                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
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
}) (Shop)