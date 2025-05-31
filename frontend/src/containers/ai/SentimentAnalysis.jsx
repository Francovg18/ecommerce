
import { connect } from "react-redux";
import FullWidthLayout from "../../hocs/Layout";
import { useState, useEffect } from "react";
import {
    get_sentiment_prediction,
    train_sentiment_model,
} from "../../redux/actions/rl";

function SentimentAnalysis({
    sentiment_prediction,
    sentiment_model_message,
    sentiment_probability,
    faltas_agresivas,
    suspendido,
    get_sentiment_prediction,
    train_sentiment_model,
}) {
    const [comment, setComment] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isTraining, setIsTraining] = useState(false);

    const handleTrain = async () => {
        setIsTraining(true);
        await train_sentiment_model();
        setTimeout(() => setIsTraining(false), 1000);
    };

    const handlePredict = async () => {
        if (comment.trim() !== "") {
            setIsAnalyzing(true);
            await get_sentiment_prediction(comment);
            setTimeout(() => setIsAnalyzing(false), 800);
        }
    };

    useEffect(() => {
        if (sentiment_prediction !== null) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [sentiment_prediction]);

    const getSentimentStyles = (sentiment) => {
        switch (sentiment?.toLowerCase()) {
            case "feliz":
                return {
                    bg: "from-emerald-400 via-green-500 to-emerald-600",
                    shadow: "shadow-emerald-500/30",
                    border: "border-emerald-300",
                    glow: "shadow-2xl shadow-emerald-500/40"
                };
            case "preocupado":
                return {
                    bg: "from-amber-400 via-yellow-500 to-orange-500",
                    shadow: "shadow-amber-500/30",
                    border: "border-amber-300",
                    glow: "shadow-2xl shadow-amber-500/40"
                };
            case "neutral":
                return {
                    bg: "from-blue-400 via-cyan-500 to-blue-600",
                    shadow: "shadow-blue-500/30",
                    border: "border-blue-300",
                    glow: "shadow-2xl shadow-blue-500/40"
                };
            case "desmotivado":
                return {
                    bg: "from-slate-400 via-gray-500 to-slate-600",
                    shadow: "shadow-slate-500/30",
                    border: "border-slate-300",
                    glow: "shadow-2xl shadow-slate-500/40"
                };
            case "agresivo":
                return {
                    bg: "from-red-500 via-pink-600 to-red-700",
                    shadow: "shadow-red-500/40",
                    border: "border-red-300",
                    glow: "shadow-2xl shadow-red-500/50"
                };
            default:
                return {
                    bg: "from-gray-400 via-slate-500 to-gray-600",
                    shadow: "shadow-gray-500/30",
                    border: "border-gray-300",
                    glow: "shadow-2xl shadow-gray-500/40"
                };
        }
    };

    const getEmoji = (sentiment) => {
        switch (sentiment?.toLowerCase()) {
            case "feliz":
                return "😊";
            case "preocupado":
                return "😟";
            case "neutral":
                return "😐";
            case "desmotivado":
                return "😞";
            case "agresivo":
                return "😡";
            default:
                return "🤔";
        }
    };

    const getPulseAnimation = (sentiment) => {
        if (sentiment?.toLowerCase() === "agresivo") {
            return "animate-pulse";
        }
        return "";
    };

    return (
        <FullWidthLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header con animación */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
                            <span className="text-2xl">🧠</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            Análisis de Estado Emocional
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Inteligencia artificial para comprender emociones en texto
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Panel Principal */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Card de Entrenamiento */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">⚡</span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Entrenamiento del Modelo</h2>
                                </div>
                                
                                <button
                                    onClick={handleTrain}
                                    disabled={isTraining}
                                    className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isTraining ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Entrenando...
                                        </>
                                    ) : (
                                        <>
                                            <span className="mr-2">🚀</span>
                                            Entrenar Modelo
                                        </>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </button>

                                {sentiment_model_message && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-slide-up">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500 text-lg">✅</span>
                                            <p className="text-green-700 font-medium">{sentiment_model_message}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Card de Análisis */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">💭</span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Analizar Comentario</h2>
                                </div>

                                <div className="relative">
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="✍️ Escribe aquí tu comentario para analizar su estado emocional..."
                                        className="w-full border-2 border-gray-200 rounded-xl p-4 mb-4 resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                                        rows={5}
                                    />
                                    <div className="absolute bottom-6 right-4 text-sm text-gray-400">
                                        {comment.length} caracteres
                                    </div>
                                </div>

                                <button
                                    onClick={handlePredict}
                                    disabled={isAnalyzing || !comment.trim()}
                                    className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 via-cyan-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analizando...
                                        </>
                                    ) : (
                                        <>
                                            <span className="mr-2">🔍</span>
                                            Analizar Comentario
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Panel de Resultados */}
                        <div className="space-y-6">
                            {/* Resultado Principal */}
                            {showAlert && sentiment_prediction && (
                                <div className={`transform transition-all duration-500 animate-slide-up ${getPulseAnimation(sentiment_prediction)}`}>
                                    <div className={`bg-gradient-to-br ${getSentimentStyles(sentiment_prediction).bg} rounded-2xl p-6 text-white shadow-2xl ${getSentimentStyles(sentiment_prediction).glow} border-2 ${getSentimentStyles(sentiment_prediction).border}`}>
                                        <div className="text-center">
                                            <div className="text-6xl mb-4 animate-bounce">
                                                {getEmoji(sentiment_prediction)}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Estado Emocional Detectado</h3>
                                            <div className="bg-white/20 rounded-lg p-3 mb-4 backdrop-blur-sm">
                                                <span className="text-2xl font-extrabold uppercase tracking-wider">
                                                    {sentiment_prediction}
                                                </span>
                                            </div>
                                            {sentiment_probability !== null && (
                                                <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm">
                                                    <div className="text-sm opacity-90 mb-1">Nivel de Confianza</div>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-32 bg-white/20 rounded-full h-2">
                                                            <div 
                                                                className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
                                                                style={{ width: `${sentiment_probability * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-bold text-lg">
                                                            {(sentiment_probability * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Alerta de Comportamiento Agresivo */}
                            {showAlert && sentiment_prediction === "Agresivo" && (
                                <div className="transform transition-all duration-500 animate-slide-up">
                                    {suspendido ? (
                                        <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-6 text-white shadow-2xl border-2 border-red-300 animate-pulse">
                                            <div className="text-center">
                                                <div className="text-5xl mb-4">🛑</div>
                                                <h3 className="text-xl font-bold mb-3">Cuenta Suspendida</h3>
                                                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                                    <p className="font-semibold mb-2">
                                                        Has alcanzado el límite de 3 comentarios agresivos
                                                    </p>
                                                    <div className="border-t border-white/30 pt-2 mt-2">
                                                        <p className="text-sm opacity-90">
                                                            📞 Contacta con soporte técnico para reactivar tu cuenta
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-2xl border-2 border-orange-300">
                                            <div className="text-center">
                                                <div className="text-4xl mb-4">⚠️</div>
                                                <h3 className="text-lg font-bold mb-3">Advertencia de Comportamiento</h3>
                                                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                                    <p className="font-semibold mb-2">
                                                        Comentario agresivo detectado
                                                    </p>
                                                    <div className="flex items-center justify-center gap-2 mb-2">
                                                        <span className="text-lg font-bold">{faltas_agresivas}/3</span>
                                                        <span className="text-sm opacity-90">advertencias</span>
                                                    </div>
                                                    <div className="w-full bg-white/20 rounded-full h-2">
                                                        <div 
                                                            className="bg-white h-2 rounded-full transition-all duration-1000"
                                                            style={{ width: `${(faltas_agresivas / 3) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Card Informativa */}
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span>💡</span>
                                    Estados Emocionales
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                                        <span>😊</span>
                                        <span className="text-green-700 font-medium">Feliz</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50">
                                        <span>😟</span>
                                        <span className="text-yellow-700 font-medium">Preocupado</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                                        <span>😐</span>
                                        <span className="text-blue-700 font-medium">Neutral</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                                        <span>😞</span>
                                        <span className="text-gray-700 font-medium">Desmotivado</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50">
                                        <span>😡</span>
                                        <span className="text-red-700 font-medium">Agresivo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out;
                }
            `}</style>
        </FullWidthLayout>
    );
}

const mapStateToProps = (state) => ({
    sentiment_prediction: state.rl.sentiment_prediction,
    sentiment_model_message: state.rl.sentiment_model_message,
    sentiment_probability: state.rl.sentiment_probability,
    faltas_agresivas: state.rl.faltas_agresivas,
    suspendido: state.rl.suspendido,
});

export default connect(mapStateToProps, {
    get_sentiment_prediction,
    train_sentiment_model,
})(SentimentAnalysis);