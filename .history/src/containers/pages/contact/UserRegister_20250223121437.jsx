import FullWidthLayout from "../../../hocs/Layout";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { connect } from "react-redux";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
    <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Pre-Registro de Usuario</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="nombre" placeholder="Nombre" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <input type="text" name="apellido" placeholder="Apellido" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <input type="text" name="ci" placeholder="Cédula de Identidad" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <input type="file" name="foto_anverso_ci" required onChange={onChange} className="w-full bg-gray-100 p-2 rounded-lg shadow-sm" />
      <input type="file" name="foto_reverso_ci" required onChange={onChange} className="w-full bg-gray-100 p-2 rounded-lg shadow-sm" />
      <input type="text" name="numero_celular" placeholder="Número de Celular" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <input type="email" name="correo" placeholder="Correo Electrónico" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <input type="text" name="ciudad" placeholder="Ciudad" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <textarea name="direccion" placeholder="Dirección" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <textarea name="actividad_economica" placeholder="Actividad Económica" required onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

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

      <button type="submit" className="w-full py-3 bg-midnight-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  </div>
</FullWidthLayout>

  );
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(UserRegister);