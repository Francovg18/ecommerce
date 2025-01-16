import { Link } from "react-router-dom"

export default function ProductsArrival({
      data
  }) { 
    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-28">
          <div className="py-8">
            <div className="py-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Productos nuevos
              </h2>
              <div className="w-full h-2 bg-gray-300 mt-2 relative">
                <div className="h-full bg-red-500" style={{ width: "19%" }}></div>
                </div>
              </div>
            </div>

  
          <div className="mt-2 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {data &&
            data !== null &&
            data !== undefined &&
             data.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.get_thumbnail}
                    alt=""
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-5 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    
                  </div>
                  <p className="text-sm font-medium text-gray-900">Bs{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  