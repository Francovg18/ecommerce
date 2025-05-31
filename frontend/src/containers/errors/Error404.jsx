import Layout from "../../hocs/Layout";

const Error404 = () => {
  return (
    <Layout>
      <div className="h-screen flex items-center justify-center bg-gradient-to-br bg-gray-100 text-black">
        <div className="text-center relative">
          <div className="mb-8">
            <h1 className="text-9xl font-bold animate__animated animate__bounceInDown">404</h1>
            <p className="text-xl font-semibold mt-4">¡Ups! Página no encontrada</p>
          </div>
          <div className="mb-8">
            <img
              src="https://media.giphy.com/media/3oEjHDo1ZXkbHgR76s/giphy.gif"
              alt="404 Gif"
              className="w-48 mx-auto"
            />
          </div>
          <p className="text-lg mb-6">
            Lo sentimos, pero la página que buscas parece haberse perdido en el ciberespacio.
          </p>
          <a
            href="/"
            className="bg-yellow-400 text-black py-3 px-8 rounded-full font-bold hover:bg-yellow-500 transition-all duration-300"
          >
            Regresar al Inicio
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center py-8 text-gray-700 -mb-1">
          <p className="animate__animated animate__fadeIn animate__delay-2s">Creado con ☕ por tu equipo de desarrollo</p>
        </div>
      </div>
    </Layout>
  );
};

export default Error404;
