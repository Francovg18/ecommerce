import Layout from '../../../hocs/Layout'
import { connect } from 'react-redux'
import { Navigate } from 'react-router';
import { reset } from '../../../redux/actions/payment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const ThankYou = ({
    isAuthenticated,
    reset,
    user,
    orders
}) => {
    const [animateConfetti, setAnimateConfetti] = useState(false);
    useEffect(() => {
        console.log("Orders:", orders);
    }, [orders]);
    
    useEffect(() => {
        reset();
        setTimeout(() => {
            launchConfetti();
            setAnimateConfetti(true);
        }, 500);
    }, [reset]);

    const launchConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    if (!isAuthenticated)
        return <Navigate to='/' />;

    return (
        <Layout>
            <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute top-80 -right-20 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 animate__animated animate__fadeIn animate__delay-1s transition-all transform hover:shadow-2xl hover:scale-[1.01] duration-300">
                        <div className="text-center">
                            <div className="flex justify-center mb-6 relative">
                                <div className={`absolute inset-0 rounded-full ${animateConfetti ? 'animate-ping' : ''} bg-green-400 opacity-20`} style={{width: '6rem', height: '6rem'}}></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-green-500 animate__animated animate__zoomIn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-midnight-blue via-midnight-blue to-blue-900 bg-clip-text text-transparent animate__animated animate__fadeIn animate__delay-1s">
                                ¡Gracias por tu compra!
                            </h1>
                            
                            <p className="max-w-2xl mt-6 mx-auto text-lg sm:text-xl text-gray-600 animate__animated animate__fadeIn animate__delay-2s">
                                ¡Estamos emocionados de que hayas elegido Silicom! Tu compra ha sido confirmada y pronto recibirás tu pedido. Te hemos enviado un correo electrónico con los detalles de tu compra.
                            </p>

                            {/* Orden*/}
                            <div className="mt-8 p-6 bg-indigo-50 rounded-xl max-w-md mx-auto animate__animated animate__fadeIn animate__delay-2s">
                                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Resumen de tu pedido</h3>
                                <div className="text-gray-700">
                                    <p className="mb-1">Fecha: <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
                                    <p>Estado: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Confirmado</span></p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-4 animate__animated animate__fadeIn animate__delay-3s">
                            <Link
                                to='/dashboard/payments'
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-midnight-blue bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Ver mis pedidos
                            </Link>

                                
                                <Link
                                    to="/cart"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-midnight-blue hover:bg-purple-night hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Continuar comprando
                                </Link>
                            </div>
                        </div>
                    </div>

                    
                    <div className="mt-16 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">¿Necesitas ayuda?</h3>
                        <p className="mt-2 text-gray-600">Nuestro equipo de soporte está disponible 24/7</p>
                        <Link to='/contacto' className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Contactar soporte
                        </Link>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    orders: state.Orders.orders,
})

export default connect(mapStateToProps, {
    reset
})(ThankYou)