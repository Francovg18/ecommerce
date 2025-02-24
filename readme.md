# 🛒 eCommerce con Django y React

Este es un proyecto de eCommerce desarrollado con **Django Rest Framework** en el backend y **React** en el frontend. El sistema permite la gestión de productos, marcas y usuarios.

## 🚀 Características

- **Autenticación de Usuarios** (Registro, Inicio de sesión, JWT Tokens).
- **Gestión de Productos** (CRUD de productos).
- **Gestión de Marcas** (Modelo `Brand` con `name` y `logo`).
- **Carrito de Compras** (Agregar, eliminar y modificar productos en el carrito).
- **Procesamiento de Pagos** (Integración con pasarela de pagos).
- **Panel de Administración** (Administración de productos, usuarios y pedidos).

## 🛠️ Tecnologías Utilizadas

### Backend:

- **Django** - Framework web en Python.
- **Django Rest Framework** - API REST para la comunicación con el frontend.
- **PostgreSQL** - Base de datos relacional.
- **JWT Authentication** - Autenticación basada en tokens.

### Frontend:

- **React** - Biblioteca para la creación de interfaces de usuario.
- **Redux** - Manejo del estado global.
- **Tailwind CSS** - Estilización del frontend.
- **Axios** - Cliente HTTP para interactuar con la API.

## 📦 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
 git clone https://github.com/Francovg18/ecommerce.git
 cd ecommerce
```

### 2️⃣ Configurar el Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3️⃣ Configurar el Frontend (React)

```bash
cd frontend
npm install
npm run dev  # Iniciar la aplicación
```

### 📬 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme.

📧 Email: [alefrvg@gmail.com](mailto:alefrvg@gmail.com)  
🐙 GitHub: [github.com/Francovg18](https://github.com/Francovg18)
