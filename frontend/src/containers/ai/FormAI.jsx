import { useState } from "react";
import { useDispatch } from "react-redux";
import { get_emotion_prediction } from "../../redux/actions/rl";
import { useNavigate } from "react-router-dom";
import Layout from "../../hocs/Layout";
function FormAI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = [
    {
      title: "Estado Emocional Positivo",
      icon: "😎",
      gradient: "from-blue-600 via-blue-700 to-indigo-800",
      questions: [
        "Me siento feliz y satisfecho/a con mi vida en este momento.",
        "Tengo la energía suficiente para realizar mis actividades diarias.",
        "Me siento optimista respecto a mi futuro.",
        "Disfruto de las actividades que realizo diariamente.",
        "Me siento valorado/a por las personas cercanas a mí.",
      ],
    },
    {
      title: "Estado Emocional Negativo",
      icon: "😠",
      gradient: "from-red-600 via-red-700 to-red-900",
      questions: [
        "Me siento estresado/a o abrumado/a con frecuencia.",
        "Me cuesta concentrarme en mis actividades diarias.",
        "Me siento desanimado/a con frecuencia.",
        "Tengo dificultades para manejar mis emociones.",
        "Me siento solo/a con frecuencia.",
      ],
    },
    {
      title: "Ansiedad y Preocupación",
      icon: "😰",
      gradient: "from-orange-600 via-red-600 to-red-800",
      questions: [
        "Me preocupo en exceso por problemas o situaciones.",
        "Tengo dificultades para dormir debido a preocupaciones.",
        "Me siento ansioso/a incluso sin una razón clara.",
        "Me siento constantemente en alerta o tenso/a.",
        "Experimento síntomas físicos como palpitaciones o sudoración.",
      ],
    },
  ];

  const handleInputChange = (questionIndex, value) => {
    setResponses((prev) => ({
      ...prev,
      [`pregunta_${questionIndex + 1}`]: parseInt(value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const respuestas = Array.from({ length: 15 }, (_, i) =>
      responses[`pregunta_${i + 1}`] || 1
    );

    try {
      const action = await dispatch(get_emotion_prediction(respuestas));
      if (action.type === "EMOTION_PREDICTION_SUCCESS") {
        navigate("/resultado-emocion", { state: { resultado: action.payload } });
      } else {
        alert("No se pudo obtener la predicción.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormComplete = () => Object.keys(responses).length === 15;

  return (
    <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-2xl">
              <span className="text-3xl">🧠</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 bg-clip-text text-transparent mb-4">
              Análisis Emocional
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Responde las 15 preguntas y conoce tu estado emocional actual
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {sections.map((section, sectionIndex) => {
              const startIndex = sectionIndex * 5;
              return (
                <div key={sectionIndex} className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-20 rounded-3xl blur-sm`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${section.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                        <span className="text-2xl">{section.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {section.title}
                        </h2>
                        <div className={`w-24 h-1 bg-gradient-to-r ${section.gradient} rounded-full`}></div>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      {section.questions.map((question, questionIndex) => {
                        const globalIndex = startIndex + questionIndex;
                        return (
                          <div key={questionIndex} className="group relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                            <label className="block text-gray-200 text-lg font-medium mb-4 group-hover:text-white transition-colors">
                              {question}
                            </label>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Totalmente en desacuerdo</span>
                              <div className="flex space-x-3 mx-6">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <button
                                    key={value}
                                    type="button"
                                    onClick={() => handleInputChange(globalIndex, value)}
                                    className={`w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center font-bold text-lg ${
                                      responses[`pregunta_${globalIndex + 1}`] === value
                                        ? `bg-gradient-to-r ${section.gradient} text-white shadow-xl scale-110`
                                        : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white hover:scale-105'
                                    }`}
                                  >
                                    {value}
                                  </button>
                                ))}
                              </div>
                              <span className="text-sm text-gray-400">Totalmente de acuerdo</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={!isFormComplete() || isSubmitting}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isFormComplete() && !isSubmitting
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-xl hover:shadow-2xl hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analizando...</span>
                  </div>
                ) : (
                  '🚀 Obtener Análisis'
                )}
              </button>
            </div>

            <div className="text-center text-gray-400 text-sm mt-4">
              Progreso: {Object.keys(responses).length}/15 preguntas completadas
            </div>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default FormAI;
