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

    const handleTrain = () => {
        train_sentiment_model();
    };

    const handlePredict = () => {
        if (comment.trim() !== "") {
            get_sentiment_prediction(comment);
        }
    };

    useEffect(() => {
        if (sentiment_prediction !== null) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [sentiment_prediction]);

    const getSentimentColor = (sentiment) => {
        switch (sentiment?.toLowerCase()) {
            case "feliz":
                return "bg-green-500";
            case "preocupado":
                return "bg-yellow-500";
            case "neutral":
                return "bg-blue-500";
            case "desmotivado":
                return "bg-red-500";
            case "agresivo":
                return "bg-pink-600";
            default:
                return "bg-gray-500";
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

    return (
        <FullWidthLayout>
            <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                    Análisis de Estado Emocional
                </h2>

                <button
                    onClick={handleTrain}
                    className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Entrenar Modelo
                </button>

                {sentiment_model_message && (
                    <p className="mb-4 text-green-700 font-medium">
                        {sentiment_model_message}
                    </p>
                )}

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="w-full border border-gray-300 rounded-md p-3 mb-4"
                    rows={4}
                />

                <button
                    onClick={handlePredict}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Analizar Comentario
                </button>

                {/* Resultado principal */}
                {showAlert && sentiment_prediction && (
                    <div
                        className={`mt-4 p-4 rounded-md text-white font-semibold text-center ${getSentimentColor(
                            sentiment_prediction
                        )}`}
                    >
                        {getEmoji(sentiment_prediction)} El comentario fue clasificado como:{" "}
                        <strong className="uppercase">{sentiment_prediction}</strong>
                        {sentiment_probability !== null && (
                            <span className="block mt-1 text-sm text-white font-normal">
                                Probabilidad: {(sentiment_probability * 100).toFixed(2)}%
                            </span>
                        )}
                    </div>
                )}

                {/* Mensaje especial para comentarios agresivos */}
                {showAlert && sentiment_prediction === "Agresivo" && (
                    <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800 text-center font-medium">
                        {suspendido ? (
                            <div>
                                🛑 Has alcanzado el límite de 3 comentarios agresivos. Tu cuenta ha sido suspendida.
                                <br />
                                <span className="text-sm">Por favor, contacta con soporte técnico.</span>
                            </div>
                        ) : (
                            <div>
                                ⚠️ Comentario agresivo detectado. Advertencia {faltas_agresivas}/3.
                            </div>
                        )}
                    </div>
                )}
            </div>
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





