import Layout from "../../hocs/Layout"
import {useParams} from 'react-router'
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ShoppingCartIcon, LockClosedIcon, DocumentTextIcon, PlayIcon } from "@heroicons/react/solid";

import { 
  add_wishlist_item, 
  get_wishlist_items, 
  get_wishlist_item_total ,
  remove_wishlist_item
} from '../../redux/actions/wishlist';
import { 
    get_product,
    get_related_products 
} from "../../redux/actions/products";
import {
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
  filter_reviews
} from '../../redux/actions/reviews';
import { 
    get_items,
    add_item,
    get_total,
    get_item_total
} from "../../redux/actions/cart";
import { useEffect, useState } from "react";
import ImageGallery from "../../components/product/ImageGallery";
import WishlistHeart from "../../components/product/WishlistHeart";
import { Navigate } from "react-router";

import Stars from '../../components/product/Stars'

const ProductDetail =({
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
    reviews
})=>{

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    
    const params = useParams()
    const productId = params.productId

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

    const leaveReview = e => {
      e.preventDefault()
      if (rating !== null)
        create_review(productId, rating, comment);
    }
    
    const updateReview = e => {
      e.preventDefault()
      if (rating !== null)
        update_review(productId, rating, comment);
    }
/* 
    const deleteReview = () => {
      const fetchData = async () => {
          await delete_review(productId);
          await get_review(productId);
          //ser
          setFormData({
              comment: ''
          });
      };
      fetchData();
    }; */

    const filterReviews = numStars => {
        filter_reviews(productId, numStars);
    };

    

    return(
        <Layout>
            <div className="bg-white">
              <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                  <ImageGallery photo={product && product.photo}/>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="relative mt-10 px-6 sm:px-8 sm:mt-16 lg:mt-0 bg-white shadow-xl rounded-3xl p-8 border border-gray-200 overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 opacity-30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 opacity-30 rounded-full blur-3xl"></div>

                    <h1 className="text-xl font-bold text-gray-800 mb-2">{product?.name}</h1>
                    <p className="text-lg text-gray-600">SKU: <span className="font-medium">{product?.sku}</span></p>
                    <p className="text-lg text-gray-600">Marca: <span className="font-medium">{product?.brand}</span></p>

                    <div className="mt-6 border-t border-gray-300 pt-4">
                      <h3 className="text-lg font-semibold text-gray-800">Descripción del producto</h3>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-base text-gray-700 bg-gray-100 p-4 rounded-lg"
                        dangerouslySetInnerHTML={{ __html: `${product?.description || ''} <br/><br/> ${product?.short_description || ''}` }}
                      />
                    </div>

                    <div className="mt-6 border-t border-gray-300 pt-4 flex justify-center">
                      {isAuthenticated ? (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                          className="text-green-600 text-l font-bold bg-green-100 px-6 py-3 rounded-lg shadow-md inline-block"
                        >
                          {product?.price} Bs
                        </motion.span>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="w-72 mx-auto text-white text-sm font-semibold px-4 py-2 bg-gray-700 shadow-lg rounded-md flex items-center justify-center gap-2"
                        >
                          <LockClosedIcon className="w-5 h-5" /> Inicia sesión para ver el precio
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
                        <WishlistHeart product={product} wishlist={wishlist} addToWishlist={addToWishlist} />
                      </div>
                    </div>
                  </motion.div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recursos del Producto</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* Sección de PDF */}
                    {product?.pdf && (
                      <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow">
                        <DocumentTextIcon className="w-10 h-10 text-blue-600" />
                        <h4 className="text-lg font-semibold text-blue-700 mt-2">Archivo PDF</h4>
                        <div className="flex flex-col gap-2 mt-3 w-full">
                          <a
                            href={product.pdf}
                            download
                            className="flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
                          >
                            Descargar PDF
                          </a>
                          <a
                            href={product.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition w-full"
                          >
                            Ver PDF
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Sección de Video */}
                    {product?.video_url && (
                      <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg shadow">
                        <PlayIcon className="w-10 h-10 text-green-600" />
                        <h4 className="text-lg font-semibold text-green-700 mt-2">Video del Producto</h4>
                        <div className="mt-3 w-full">
                          <a
                            href={product.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
                          >
                            Ver Video
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <section className='my-10 max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Reseñas del Producto</h2>
                <div className="grid  gap-6">
                  {/* Panel de filtrado y formulario de reseñas */}
                  <div className="col-span-2 bg-gray-50 p-4 rounded-lg shadow-md">
                    
                    {/* Filtro por estrellas */}
                    <div className='space-y-2'>
                      {[5, 4, 3, 2, 1].map((num) => (
                        <div key={num} className='flex items-center cursor-pointer' onClick={() => filterReviews(num)}>
                          <Stars rating={num} />
                          <span className='ml-2 text-gray-700'>{num} Estrellas</span>
                        </div>
                      ))}
                    </div>
                    {/* Formulario de Reseñas */}
                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold text-gray-800'>Añade tu Reseña</h3>
                      <form onSubmit={review && isAuthenticated ? updateReview : leaveReview} className='mt-3 space-y-4'>
                        <textarea
                          rows={4}
                          name="comment"
                          required
                          value={comment}
                          onChange={onChange}
                          placeholder={review?.comment || "Escribe tu opinión..."}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                          name="rating"
                          required
                          value={rating}
                          onChange={onChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} Estrella{num > 1 && 's'}</option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="w-full bg-midnight-blue text-white py-2 rounded-lg hover:bg-purple-night transition"
                        >
                          {review && isAuthenticated ? "Actualizar Reseña" : "Añadir Reseña"}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Lista de reseñas */}
                  {reviews && reviews.length > 0 ? (
                    <div className="col-span-3 space-y-6">
                      {reviews.map((review, index) => (
                        <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg shadow-md">
                          <div className="mr-4 flex-shrink-0">
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          </div>
                          <div>
                            <Stars rating={review.rating} />
                            <h4 className="text-lg font-bold text-gray-800">{review.user}</h4>
                            <p className="text-gray-600 mt-1">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="col-span-5 flex justify-center">
                      <p className="text-gray-500 text-lg">Aún no hay reseñas para este producto.</p>
                    </div>
                  )}
                </div>
              </section>

                </div>
              </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    product: state.Products.product,
    isAuthenticated: state.Auth.isAuthenticated,
    wishlist: state.Wishlist.wishlist,
    review: state.Reviews.review,
    reviews: state.Reviews.reviews
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
    filter_reviews
}) (ProductDetail)