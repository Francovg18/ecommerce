import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function Resultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultado } = location.state || { resultado: null };

  const [isVisible, setIsVisible] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!resultado) return;

    setIsVisible(true);
    setShowConfetti(true);

    const timer = setTimeout(() => setShowConfetti(false), 3000);

    const recommendationTimer = setInterval(() => {
      setCurrentRecommendation((prev) =>
        (prev + 1) % resultado.recomendaciones.length
      );
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(recommendationTimer);
    };
  }, [resultado]);

  const getEmotionalColor = (estado) => {
    if (estado.toLowerCase().includes("positiv"))
      return "from-green-500 to-blue-600";
    if (estado.toLowerCase().includes("equilibrad"))
      return "from-blue-500 to-indigo-600";
    if (estado.toLowerCase().includes("negativ"))
      return "from-orange-500 to-red-600";
    return "from-blue-500 to-purple-600";
  };

  const getEmotionalIcon = (estado) => {
    if (estado.toLowerCase().includes("positiv")) return "🌟";
    if (estado.toLowerCase().includes("equilibrad")) return "⚖️";
    if (estado.toLowerCase().includes("negativ")) return "🌧️";
    return "🧠";
  };

  const handleDownload = () => {
    if (!resultado) return;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("🧠 Reporte de Evaluación Emocional", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Estado emocional detectado: ${resultado.estado_emocional}`, 20, 40);

    doc.text("Recomendaciones:", 20, 60);
    resultado.recomendaciones.forEach((rec, index) => {
      doc.text(`• ${rec}`, 25, 70 + index * 10);
    });

    doc.setFontSize(10);
    doc.text("Generado por el sistema de evaluación emocional.", 20, 280);

    doc.save("reporte_emocional.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Confetti animado */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r ${getEmotionalColor(resultado.estado_emocional)} rounded-full animate-ping`}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: Math.random() * 2 + "s",
                animationDuration: Math.random() * 2 + 1 + "s",
              }}
            />
          ))}
        </div>
      )}

      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="w-full max-w-5xl">
          {/* Título */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${getEmotionalColor(resultado.estado_emocional)} rounded-3xl mb-6 shadow-2xl animate-bounce`}>
              <span className="text-4xl">{getEmotionalIcon(resultado.estado_emocional)}</span>
            </div>
            <h1 className={`text-6xl font-bold bg-gradient-to-r ${getEmotionalColor(resultado.estado_emocional)} bg-clip-text text-transparent mb-4 animate-pulse`}>
              ¡Análisis Completado!
            </h1>
            <p className="text-2xl text-gray-300">
              Tu perfil emocional ha sido procesado con éxito
            </p>
          </div>

          {/* Resultado emocional */}
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-r ${getEmotionalColor(resultado.estado_emocional)} opacity-10 rounded-3xl blur-sm`}></div>
            <div className="relative z-10 text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Tu Estado Emocional</h2>
              <div className={`inline-block px-8 py-4 bg-gradient-to-r ${getEmotionalColor(resultado.estado_emocional)} rounded-2xl shadow-xl`}>
                <p className="text-2xl font-bold text-white">
                  {resultado.estado_emocional}
                </p>
              </div>
            </div>
          </div>

          {/* Recomendaciones animadas */}
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-3xl blur-sm"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    Recomendaciones Personalizadas
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full"></div>
                </div>
              </div>

              {/* Carrusel de una sola recomendación visible */}
              <div className="relative h-32 overflow-hidden rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10">
                {resultado.recomendaciones.map((rec, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ${
                      index === currentRecommendation
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <p className="text-lg text-gray-200 text-center font-medium">
                      "{rec}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Indicadores del carrusel */}
              <div className="flex justify-center space-x-2 mt-6">
                {resultado.recomendaciones.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentRecommendation(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentRecommendation
                        ? "bg-gradient-to-r from-orange-500 to-red-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              {/* Lista completa de recomendaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {resultado.recomendaciones.map((rec, index) => (
                  <div
                    key={index}
                    className={`backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105 ${
                      index === currentRecommendation ? "ring-2 ring-orange-500" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botones finales */}
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              🔄 Realizar Nuevo Análisis
            </button>
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-green-700 hover:to-teal-700 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              📄 Descargar Reporte
            </button>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">
              ¡Gracias por confiar en nuestro sistema de análisis emocional!
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Recuerda que el bienestar emocional es un proceso continuo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resultado;
