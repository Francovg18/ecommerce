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
      <div className="max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
          Pre-Registro de Usuario
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Nos especializamos en ventas mayoristas. Evaluaremos la información proporcionada para verificar si califica para registrarse como cliente.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" name="nombre" placeholder="Nombre" required onChange={onChange} className="input-field" />
            <input type="text" name="apellido" placeholder="Apellido" required onChange={onChange} className="input-field" />
          </div>

          <input type="text" name="ci" placeholder="Cédula de Identidad" required onChange={onChange} className="input-field" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="file-upload">
              <CloudUploadIcon className="h-6 w-6 text-midnight-blue mr-2" />
              <span>Subir foto anverso CI</span>
              <input type="file" name="foto_anverso_ci" required onChange={onChange} className="hidden" />
            </label>
            <label className="file-upload">
              <CloudUploadIcon className="h-6 w-6 text-midnight-blue mr-2" />
              <span>Subir foto reverso CI</span>
              <input type="file" name="foto_reverso_ci" required onChange={onChange} className="hidden" />
            </label>
          </div>

          <input type="text" name="numero_celular" placeholder="Número de Celular" required onChange={onChange} className="input-field" />
          <input type="email" name="correo" placeholder="Correo Electrónico" required onChange={onChange} className="input-field" />
          <input type="text" name="ciudad" placeholder="Ciudad" required onChange={onChange} className="input-field" />
          
          <textarea name="direccion" placeholder="Dirección" required onChange={onChange} className="textarea-field" />
          <textarea name="actividad_economica" placeholder="Actividad Económica" required onChange={onChange} className="textarea-field" />

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

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-midnight-blue to-blue-700 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all">
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>

      
    </FullWidthLayout>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(UserRegister);
