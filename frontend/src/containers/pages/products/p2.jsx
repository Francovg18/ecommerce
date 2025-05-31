import Layout from "../../../hocs/Layout"
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Navigate } from "react-router";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { setAlert } from '../../../redux/actions/alert';

import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ShoppingCartIcon, 
  LockClosedIcon, 
  DocumentTextIcon, 
  PlayIcon,
  DownloadIcon,
  EyeIcon,
  ExclamationIcon,
  LocationMarkerIcon 
} from "@heroicons/react/solid";
import { MapPinIcon, AlertTriangleIcon } from 'lucide-react';

import { get_brands } from "../../../redux/actions/brands";
import { add_wishlist_item, get_wishlist_items, get_wishlist_item_total , remove_wishlist_item } from '../../../redux/actions/wishlist';
import { get_product, get_related_products } from "../../../redux/actions/products";
import { get_reviews, get_review, create_review, update_review, delete_review, filter_reviews } from '../../../redux/actions/reviews';
import { get_items, add_item, get_total, get_item_total } from "../../../redux/actions/cart";
import { get_categories } from '../../../redux/actions/categories';
import { get_products, get_filtered_products } from '../../../redux/actions/products';

import ImageGallery from "../../../components/product/ImageGallery";
import WishlistHeart from "../../../components/product/WishlistHeart";
import ProductCard from '../../../components/product/ProductCard';
import Stars from '../../../components/product/Stars'

const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const ProductDetail = ({
    get_product,
    get_related_products,
    product,
    get_items,
    add_item,
    get_total,
    get_item_total,
    add_wishlist_item, 
    get_wishlist_items, 
    get_wishlist_item_total,
    isAuthenticated,
    remove_wishlist_item,
    wishlist,
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    filter_reviews,
    review,
    brands, 
    get_brands,
    reviews,
    get_categories,
    get_products,
    products,
    filtered_products,
    user
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filtered] = useState(false);
  const [currentPage] = useState(1);
  const productsPerPage = 5;
  const [selected, setSelected] = useState("");
  const [expandedReviews, setExpandedReviews] = useState({});
  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  

  const params = useParams()
  const productId = params.productId

  const addToCart = async () => {
    if (product && product !== null && product !== undefined && product.quantity > 0) {
        setLoading(true)
        await add_item(product);
        await get_items();
        await get_total();
        await get_item_total();
        setLoading(false)
        navigate('/cart')
    }
  }

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelected(value);
    filterReviews(value);
  };

  useEffect(() => {
    get_categories();
    get_products();
    window.scrollTo(0, 0);
  }, [get_categories, get_products]);

  useEffect(() => {
    window.scrollTo(0,0)
    get_product(productId)
    get_related_products(productId)
    get_wishlist_items()
    get_wishlist_item_total()
  }, [get_product, get_related_products, get_wishlist_items, get_wishlist_item_total, productId])

  useEffect(() => {
    get_reviews(productId);
  }, [productId, get_reviews]);

  useEffect(() => {
    get_review(productId);
  }, [productId, get_review]);

  const [formData, setFormData] = useState({
    comment:'',
    rating:'',
  })

  const { comment,rating } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  
  const createReview = e => {
    e.preventDefault()
    if (rating !== null)
      create_review(productId, rating, comment);
  }

  const updateReview = e => {
    e.preventDefault()
    if (rating !== null)
      update_review(productId, rating, comment);
  }

  const deleteReview = () => {
    const fetchData = async () => {
        await delete_review(productId);
        await get_review(productId);
        setFormData({
            comment: ''
        });
    };
    fetchData();
  }; 

  const filterReviews = numStars => {
    filter_reviews(productId, numStars);
  };
  const [hoveredRow, setHoveredRow] = useState(null);

  const addToWishlist = async () => {
    if (isAuthenticated) {
      let isPresent = false;
        if(
          wishlist &&
          wishlist !== null &&
          wishlist !== undefined &&
          product &&
          product !== null &&
          product !== undefined
          ){
            isPresent = wishlist.some(item => item.product.id.toString() === product.id.toString())
        }
        
        if (isPresent) {
          await remove_wishlist_item(product.id);
          await get_wishlist_items();
          await get_wishlist_item_total();
        } else {
          await remove_wishlist_item(product.id);
            await add_wishlist_item(product.id);
            await get_wishlist_items();
            await get_wishlist_item_total();
            await get_items();
            await get_total();
            await get_item_total();
        }
          
      } else {
        return <Navigate to="/cart"/>
      }
    };

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedLetter] = useState("ALL");

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
  
  const showProducts = () => {
    if (!product || !product.category) return null;
    const productsToDisplay = filtered ? filtered_products : products;
    const filteredByCategory = productsToDisplay?.filter(p =>
        p.category === product.category
    ) || [];

    const shuffledProducts = [...filteredByCategory].sort(() => Math.random() - 0.5);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = shuffledProducts.slice(startIndex, startIndex + productsPerPage);

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
  };
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    axios.get('/api/branches/stock')
      .then(res => {
        setStockList(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener stock:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando sucursales...</p>;

  return(
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start text-sm">
            <ImageGallery 
              photos={[
                  product?.photo,  
                  ...(product?.extra_images ? product.extra_images.map(image => image.image) : [])
              ]}
              short_description={product?.short_description || ""} 
            />
        
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="relative mt-10 px-6 sm:px-8 sm:mt-16 lg:mt-0 bg-white shadow-xl rounded-3xl p-8 border border-gray-200 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 opacity-30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 opacity-30 rounded-full blur-3xl"></div>

              <h1 className="text-xl font-bold text-gray-800 mb-2">Producto: {product?.name}</h1>
              <p className="text-lg text-gray-600">SKU: <span className="font-medium">{product?.sku}</span></p>
              <div className="mt-6 border-t border-gray-300 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Descripción del producto: </h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-700 bg-gray-100 p-4 rounded-lg text-sm"
                  dangerouslySetInnerHTML={{ __html: `${product?.description || ''} ` }}
                />
              </div>

              <div className="mt-6 border-t border-gray-300 pt-4 flex justify-center">
                {isAuthenticated ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                    className="bg-white shadow-lg rounded-lg overflow-hidden p-6"
                  >
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Detalles del Producto</h2>
                    
                    <table className="w-full border-collapse border border-gray-300">
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2 text-gray-600 font-normal bg-gray-100 text-sm">Cantidad Disponible</td>
                          <td className="px-4 py-2 text-sm">{product?.quantity === 1 ? "1 unidad" : `${product?.quantity} unidades`}</td>
                        </tr>
                  
                        <tr className="border-b">
                          <td className="px-4 py-2 text-sm text-gray-600 font-normal bg-gray-100">Productos Vendidos</td>
                          <td className="px-4 py-2 text-sm">{product?.sold === 1 ? "1 unidad" : `${product?.sold} unidades`}</td>
                        </tr>

                        <tr className="border-b">
                          <td className="px-4 py-2 text-sm text-gray-600 font-normal bg-gray-100">Precio por tu categoría</td>
                          <td className="px-4 py-2 text-sm text-green-700 font-medium">
                            {user && user.mayorista_tipo !== undefined ? (
                              user.mayorista_tipo === 0 ? `${product?.price} Bs` :
                              user.mayorista_tipo === 1 ? `${product?.price_mayorista_1} Bs` :
                              user.mayorista_tipo === 2 ? `${product?.price_mayorista_2} Bs` :
                              user.mayorista_tipo === 3 ? `${product?.price_mayorista_3} Bs` :
                              "N/A"
                            ) : "Inicia sesión para ver precios"}
                          </td>
                        </tr>

                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-600 font-normal bg-gray-100">Marca</td>
                          <td className="px-4 py-2 text-sm flex items-center gap-2">
                            {(() => {
                              const brand = filteredBrands?.find((brand) => brand.id === product?.brand);
                              if (!brand) return <span className="font-normal">Desconocida</span>;

                              return brand.logo ? (
                                <>
                                  <img 
                                    src={brand.logo} 
                                    alt={brand.name} 
                                    className="w-26 h-8 object-contain border"
                                  />
                                </>
                              ) : (
                                <span className="font-medium">{brand.name}</span>
                              );
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-72 mx-auto text-white text-sm font-semibold px-4 py-2 bg-gray-700 shadow-lg rounded-md flex items-center justify-center gap-2"
                  >
                    <LockClosedIcon className="w-5 h-5" /> Inicia sesión para más detalles
                  </motion.div>
                )}
              </div>

              <div className="mt-6">
                <motion.p 
                  className="mt-4 flex items-center gap-2 text-lg font-medium"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {product?.quantity > 0 ? (
                    <span className="text-green-600 flex items-center gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 animate-bounce" /> En Stock
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-2">
                      <XCircleIcon className="w-6 h-6 text-red-500 animate-pulse" /> Agotado
                    </span>
                  )}
                </motion.p>

                <div className="mt-6 flex gap-4">
                  {loading ? (
                    <button className="flex-1 bg-gray-500 rounded-lg py-3 px-8 text-white cursor-not-allowed">
                      Cargando...
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addToCart}
                      className="w-max bg-midnight-blue hover:bg-purple-night transition-all rounded-lg py-3 px-8 text-white shadow-md flex items-center justify-center"
                    >
                      <ShoppingCartIcon className="w-6 h-6 mr-2" /> Agregar al Carrito
                    </motion.button>
                  )}
                  <WishlistHeart
                    product={product}
                    wishlist={wishlist}
                    setAlert={setAlert}
                    addToWishlist={async (product) => {
                      await add_wishlist_item(product.id);
                      return true;
                    }}
                    removeFromWishlist={async (id) => {
                      await remove_wishlist_item(id);
                    }}
                  />


                </div>
              </div>
            </motion.div>
          </div>

          <div className="bg-white p-2 rounded-lg shadow-md mt-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recursos del Producto</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* recursos*/}
              <div className="space-y-6">
                {product?.pdf || product?.video_url ? (
                  <>
                    {/* PDF Section */}
                    {product?.pdf && (
                      <div className="bg-blue-50 p-6 rounded-lg shadow-md transform transition hover:scale-105">
                        <div className="flex items-center mb-4">
                          <DocumentTextIcon className="w-10 h-10 text-blue-600 mr-3" />
                          <h4 className="text-xl font-semibold text-blue-800">Manual de usuario</h4>
                        </div>
                        <div className="flex space-x-4">
                          <a
                            href={product.pdf}
                            download
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                          >
                            <DownloadIcon className="w-5 h-5 mr-2" /> Descargar PDF
                          </a>
                          <a
                            href={product.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition flex items-center justify-center"
                          >
                            <EyeIcon className="w-5 h-5 mr-2" /> Visualizar
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Video Section */}
                    {product?.video_url && (
                      <div className="bg-green-50 p-6 rounded-lg shadow-md transform transition hover:scale-105">
                        <div className="flex items-center mb-4">
                          <PlayIcon className="w-10 h-10 text-green-600 mr-3" />
                          <h4 className="text-xl font-semibold text-green-800">Video Explicativo</h4>
                        </div>
                        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                          <iframe
                            src={`https://www.youtube.com/embed/${extractYouTubeId(product.video_url)}`}
                            title="Product Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <p className="text-gray-600 text-md font-medium">
                      🚧 Estamos trabajando en agregar recursos para este producto. ¡Vuelve pronto! 🚀
                    </p>
                  </div>
                )}
              </div>
              {isAuthenticated ? (
                <motion.div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-midnight-blue to-purple-night p-5 flex items-center space-x-4 text-white">
                    <LocationMarkerIcon className="w-8 h-8 animate-bounce text-red-500" />
                    <h2 className="text-l font-bold tracking-wide">Stock por Sucursal</h2>
                  </div>
                  <div className="p-6">
                  <h1 className="text-l font-extrabold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-3">
                    Producto: {product?.name}
                  </h1>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                      <thead className="bg-indigo-50">
                        <tr>
                          <th className="p-4 text-sm font-semibold text-indigo-800 uppercase">Sucursal</th>
                          <th className="p-4 text-sm font-semibold text-indigo-800 uppercase text-center">Cantidad</th>
                        </tr>
                      </thead>
                        <tbody>
                          {stockList.filter(item => item.producto_nombre === product?.name).map((item, index) => (
                            <motion.tr 
                              key={item.id} 
                              className={`border-b transition-all ${item.cantidad === 0 ? 'bg-red-50' : hoveredRow === index ? 'bg-blue-50' : ''}`}
                              whileHover={{ scale: 1.02 }}
                              onMouseEnter={() => setHoveredRow(index)}
                              onMouseLeave={() => setHoveredRow(null)}
                            >
                              <td className="p-4 text-gray-700 font-medium text-sm">{item.sucursal_nombre}</td>
                              <td className="p-4 text-center font-bold flex justify-center items-center gap-2 text-xs">
                                {item.cantidad === 0 ? (
                                  <XCircleIcon className="w-5 h-5 text-red-600" />
                                ) : item.cantidad <= 5 ? (
                                  <ExclamationIcon className="w-5 h-5 text-yellow-600" />
                                ) : (
                                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                )}
                                <span className={item.cantidad === 0 ? 'text-red-600' : item.cantidad <= 5 ? 'text-yellow-600' : 'text-green-600'}>
                                  {item.cantidad}
                                </span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-72 h-1/6 mx-auto text-white text-sm font-semibold px-4 py-2 bg-gray-700 shadow-lg rounded-md flex items-center justify-center gap-2"
                  >
                    <LockClosedIcon className="w-5 h-5" /> Inicia sesión para más detalles
                  </motion.div>
              )}

            </div>
          </div>

          {/* Reviews */}
          <section className='my-10 max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Reseñas del Producto</h2>
            <div className="mt-6 border-t border-gray-300 pt-4 flex justify-center">
              {isAuthenticated ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  
                  {/* Formulario de reseña */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
                    <div className="flex items-center space-x-2 mb-4">
                      <label htmlFor="starFilter" className="text-gray-700">Filtrar por estrellas:</label>
                      <select 
                        id="starFilter" 
                        className="border p-2 rounded cursor-pointer" 
                        value={selected} 
                        onChange={handleChange}
                      >
                        <option value="">Último</option>
                        {[5, 4, 3, 2, 1].map((num) => (
                          <option key={num} value={num}>{num} Estrellas</option>
                        ))}
                      </select>
                    </div>

                    <h3 className='text-lg font-semibold text-gray-800'>Añade tu Reseña</h3>
                    <form 
                      onSubmit={review && review.comment ? updateReview : createReview} 
                      className='mt-3 space-y-4 text-left'
                    >
                      <textarea
                        rows={5}
                        name="comment"
                        required
                        value={comment}
                        onChange={onChange}
                        placeholder={review?.comment || "Escribe tu opinión..."}
                        className="text-sm w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <select
                        name="rating"
                        required
                        value={rating}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Selecciona una calificación</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} Estrella{num > 1 && 's'}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        disabled={!rating || (!comment && review?.comment === comment)}
                        className={`w-full py-2 rounded-lg transition ${
                          rating && (comment || !review?.comment)
                            ? "bg-midnight-blue text-white hover:bg-purple-night"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {review && review.comment ? "Actualizar Reseña" : "Añadir Reseña"}
                      </button>
                    </form>

                    {review && review.comment && isAuthenticated && (
                      <button
                        onClick={deleteReview}
                        className="mt-2 w-full bg-crimson-red text-white py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Eliminar Reseña
                      </button>
                    )}
                  </div>

                  {/*Lista de reseñas */}
                  <div className="space-y-4">
                    {reviews && reviews.length > 0 ? (
                      <>
                        {reviews.map((review, index) => (
                          <div 
                            key={index} 
                            className="flex items-start bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                          >
                            <div className="mr-3 flex-shrink-0">
                              <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>
                            </div>
                            <div className="flex-1">
                              <Stars rating={review.rating} />
                              <h4 className="text-sm font-semibold text-gray-800">{review.user}</h4>
                              <p className={`text-gray-600 text-sm mt-1 ${!expandedReviews[index] ? 'line-clamp-2' : ''}`}>
                                {review.comment}
                              </p>
                              {review.comment.length > 100 && (
                                <button
                                  onClick={() => toggleExpand(index)}
                                  className="text-indigo-600 hover:underline text-sm mt-1"
                                >
                                  {expandedReviews[index] ? 'Mostrar menos' : 'Mostrar más'}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="flex justify-center">
                        <p className="text-gray-500 text-sm">Aún no hay reseñas para este producto.</p>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-72 mx-auto text-white text-sm font-semibold px-4 py-2 bg-gray-700 shadow-lg rounded-md flex items-center justify-center gap-2"
                >
                  <LockClosedIcon className="w-5 h-5" /> Inicia sesión para ver reseñas de los productos
                </motion.div>
              )}
            </div>
          </section>




          {/* Products */}
          <div className="flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Productos relacionados</h1>
          </div>
          <section aria-labelledby="products-heading" className="pt-10 pb-6 px-6 sm:px-10 lg:px-4 md:px-4">
            <h2 id="products-heading" className="sr-only">Productos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12">
              <div className="lg:col-span-3">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {showProducts()}
                </div>
                <div className="mt-10">
                  {renderPagination()}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
const mapStateToProps = state => ({
    product: state.Products.product,
    isAuthenticated: state.Auth.isAuthenticated,
    wishlist: state.Wishlist.items,
    review: state.Reviews.review,
    brands: state.Brands.brands,
    reviews: state.Reviews.reviews,
    categories: state.Categories.categories,
    products: state.Products.products,
    filtered_products: state.Products.filtered_products,
    user: state.Auth.user,
})

export default connect(mapStateToProps, {
    get_product,
    get_related_products,
    get_items,
    add_item,
    get_total,
    get_item_total,
    add_wishlist_item, 
    get_wishlist_items, 
    get_wishlist_item_total,
    remove_wishlist_item,
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    filter_reviews,
    get_brands,
    get_categories,
    get_products,
    get_filtered_products,
    setAlert

}) (ProductDetail)