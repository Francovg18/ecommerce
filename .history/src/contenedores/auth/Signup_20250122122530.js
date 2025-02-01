import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../redux/actions/auth'

const Signup = ({ signup }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [accountCreated, setAccountCreated] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  })
  const [errors, setErrors] = useState({})

  const { first_name, last_name, email, password, re_password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    if (!first_name.trim()) newErrors.first_name = 'El nombre es obligatorio'
    if (!last_name.trim()) newErrors.last_name = 'El apellido es obligatorio'
    if (!emailRegex.test(email)) newErrors.email = 'Correo no válido'
    if (!passwordRegex.test(password))
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo'
    if (password !== re_password) newErrors.re_password = 'Las contraseñas deben coincidir'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = e => {
    e.preventDefault()
    if (validateForm()) {
      signup(first_name, last_name, email, password, re_password)
      setAccountCreated(true)
      window.scrollTo(0, 0)
    }
  }

  return (
    <Layout>
  <div className="min-h-full flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
    <div className="flex bg-white shadow-md border border-gray-200 rounded-lg w-full max-w-lg">
      <div className="w-[50px] bg-gradient-to-b from-crimson-red via-deep-rose via-dark-burgundy via-royal-purple to-midnight-blue rounded-l-lg"></div>
      
      <div className="px-6 py-8 flex-1">
        <h2 className="text-2xl font-bold text-center text-gray-900">Crear cuenta</h2>
        <form onSubmit={onSubmit} className="space-y-5 mt-5">
          <InputField
            label="Nombre"
            name="first_name"
            value={first_name}
            onChange={onChange}
            error={errors.first_name}
          />
          <InputField
            label="Apellido"
            name="last_name"
            value={last_name}
            onChange={onChange}
            error={errors.last_name}
          />
          <InputField
            label="Correo"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            error={errors.email}
          />
          <InputField
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            error={errors.password}
          />
          <InputField
            label="Confirmar contraseña"
            name="re_password"
            type="password"
            value={re_password}
            onChange={onChange}
            error={errors.re_password}
          />
          <button
            type="submit"
            className="w-full bg-midnight-blue hover:bg-purple-night text-white py-2 px-4 rounded-md shadow-md focus:outline-none"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  </div>
</Layout>

  )
}

const InputField = ({ label, name, type = 'text', value, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full px-3 py-2 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { signup })(Signup);
