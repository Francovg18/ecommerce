import FullWidthLayout from "../../../hocs/Layout";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { connect } from "react-redux";
import { CloudUploadIcon } from "@heroicons/react/outline";

function UserRegister() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [preview, setPreview] = useState({ anverso: null, reverso: null });

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
    if (onChange) onChange(event);
  };
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    numero_celular: "",
    correo: "",
    ciudad: "",
    direccion: "",
    actividad_economica: "",
    foto_anverso_ci: null,
    foto_reverso_ci: null,
  });

  const onChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Debes aceptar los términos y condiciones de privacidad.");
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user_register/`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Registro enviado correctamente.");
      setFormData({
        nombre: "",
        apellido: "",
        ci: "",
        numero_celular: "",
        correo: "",
        ciudad: "",
        direccion: "",
        actividad_economica: "",
        foto_anverso_ci: null,
        foto_reverso_ci: null,
      });
    } catch (error) {
      toast.error("Error al enviar el formulario.");
    }
    setLoading(false);
  };

  return (
    <FullWidthLayout>
      <div className="max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-3xl border border-gray-200 py-16 m-12">
        <h2 className="text-4xl font-extrabold text-midnight-blue text-center mb-6">
          Pre-Registro de Usuario
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Nos especializamos en ventas mayoristas. Evaluaremos la información proporcionada para verificar si califica para registrarse como cliente.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" name="nombre" placeholder="Nombre" required onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-night focus:ring focus:ring-blue-200" />
            <input type="text" name="apellido" placeholder="Apellido" required onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-night focus:ring focus:ring-blue-200" />
          </div>

          <div className="space-y-4">
            <input
                type="text"
                name="ci"
                placeholder="Cédula de Identidad"
                required
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-600 focus:ring focus:ring-purple-300"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {['anverso', 'reverso'].map((type) => (
                <label
                    key={type}
                    className="relative flex flex-col items-center justify-center  p-3 border-1 border-solid border-midnight-blue rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100"
                >
                    <CloudUploadIcon className="h-6 w-6 text-midnight-blue" />
                    <span>Subir foto {type} CI</span>
                    <input
                    type="file"
                    name={`foto_${type}_ci`}
                    required
                    onChange={(e) => handleFileChange(e, type)}
                    className="hidden"
                    accept="image/*"
                    />
                    {preview[type] && (
                    <img
                        src={preview[type]}
                        alt={`Vista previa ${type}`}
                        className="mt-2 w-48 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    )}
                </label>
                ))}
            </div>
            </div>

          <input type="text" name="numero_celular" placeholder="Número de Celular" required onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-night focus:ring focus:ring-blue-200" />
          <input type="email" name="correo" placeholder="Correo Electrónico" required onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-night focus:ring focus:ring-blue-200" />
          <input type="text" name="ciudad" placeholder="Ciudad" required onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-night focus:ring focus:ring-blue-200" />
          
          <textarea name="direccion" placeholder="Dirección" required onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-night focus:ring focus:ring-blue-200" />
          <textarea name="actividad_economica" placeholder="Actividad Económica" required onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-purple-night focus:ring focus:ring-blue-200" />

          <div className="flex items-center gap-3">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${agreed ? "bg-midnight-blue" : "bg-gray-300"}`}
            >
              <span className="sr-only">Aceptar términos</span>
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${agreed ? "translate-x-6" : "translate-x-1"}`}
              />
            </Switch>
            <p className="text-sm text-gray-600">Debes aceptar los términos y condiciones.</p>
          </div>

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-midnight-blue to-purple-night text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all">
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </FullWidthLayout>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(UserRegister);
