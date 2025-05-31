
# 🛒 eCommerce con Django y React

Este es un proyecto completo de eCommerce desarrollado con **Django Rest Framework** en el backend y **React** en el frontend. El sistema permite la gestión de productos, usuarios, pagos, sucursales, cupones, listas de deseos y más.

## 🚀 Características

- ✅ **Autenticación de Usuarios** (Registro, Inicio de sesión, JWT con refresh tokens).
- ✅ **Gestión de Productos y Categorías** (CRUD completo desde el admin o API).
- ✅ **Carrito de Compras** (Agregar, eliminar y modificar productos).
- ✅ **Procesamiento de Pagos** (Integración con Braintree y QR Payment).
- ✅ **Gestión de Sucursales** (Ubicación física de productos y control de inventario por sucursal).
- ✅ **Lista de Deseos y Reseñas** (Wishlist y reviews por usuario).
- ✅ **Sistema de Cupones de Descuento**.
- ✅ **Administración desde el Panel de Django**.
- ✅ **Editor Rich Text** para descripciones con CKEditor.
- ✅ **Importación y Exportación de Datos**.
- ✅ **Autenticación Social (Google, Facebook)** con Djoser y Social Django.

---

## 🛠️ Tecnologías Utilizadas

### 🔙 Backend

- **Django** - Framework web robusto en Python.
- **Django Rest Framework** - API REST para conectar con React.
- **PostgreSQL** - Base de datos relacional.
- **JWT Authentication** - Tokens seguros con `SimpleJWT`.
- **Djoser** - Endpoints para manejo de usuarios.
- **Social Django** - Login con redes sociales.
- **CKEditor** - Editor WYSIWYG para descripciones.
- **WhiteNoise** - Servir archivos estáticos en producción.
- **ImportExport** - Administración de datos desde el admin.

### 🔜 Frontend

- **React** - UI moderna y modular.
- **Redux** - Manejo del estado global.
- **Tailwind CSS** - Estilización rápida y responsiva.
- **Axios** - Cliente HTTP para consumir APIs.

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Francovg18/ecommerce.git
cd ecommerce
```

### 2️⃣ Configurar Backend

```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
cd backend
pip install -r requirements.txt

python manage.py migrate
python manage.py makemigrations
# Creación de un superusuario
python manage.py createsuperuser
cd ..
```

### 3️⃣ Configurar Frontend

```bash
cd frontend
npm install
npm run build
npm start
```

---

### 4️⃣ Iniciar Proyecto

```bash
# Debe encontrarse en el entorno virtual
cd backend
python manage.py runserver
```

---

## 📁 Estructura de Carpetas

```
ecommerce/
├── backend/              # Proyecto Django
│   └── apps/             # Apps internas (user, products, cart, etc.)
│   └── requirements.txt  # Dependencias Python
├── frontend/             # Proyecto React
├── .env                  # Variables de entorno
└── README.md
```

---

## 🧠 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz tus cambios y *commitea*.
4. Sube tus cambios: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request.

---

## 🛠️ Despliegue

Este proyecto puede desplegarse fácilmente en plataformas como:

- **Render**
- **Heroku**
- **Railway**
- **Vercel (para frontend)**
- **Netlify (para frontend)**

Para producción recuerda:

- Configurar `DEBUG=False`
- Usar HTTPS
- Añadir tus dominios a `ALLOWED_HOSTS`
- Configurar un servidor de correo real

---

## 📬 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme.

📧 Email: [alefrvg@gmail.com](mailto:alefrvg@gmail.com)  
🐙 GitHub: [github.com/Francovg18](https://github.com/Francovg18)  

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. ¡Úsalo con libertad!  
Hecho con 💻 y ☕ por [Alex](https://github.com/Francovg18)