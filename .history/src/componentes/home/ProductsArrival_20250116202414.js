import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
export default function ProductsArrival({
      data
  }) { 
    const [progressWidth, setProgressWidth] = useState(0);
          const [maxLength, setMaxLength] = useState(35); 
          const headingRef = useRef(null);
        
          useEffect(() => {
            const updateMaxLength = () => {
              setMaxLength(window.innerWidth >= 1024 ? 90 : 35);
            };
        
            updateMaxLength();
            window.addEventListener('resize', updateMaxLength);
            return () => window.removeEventListener('resize', updateMaxLength);
          }, []);
        
          useEffect(() => {
            if (headingRef.current) {
              const textLength = headingRef.current.textContent.length;
              setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
            }
          }, [maxLength]);
    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-28">
          <div className="py-8">
            <div className="py-8">
              <h2
                ref={headingRef}
                className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block"
              >
                Productos nuevos
              </h2>
              <div className="w-full bg-gray-200 h-1 mt-1">
                <div
                  className="bg-red-500 h-1"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
              </div>
            </div>

  
          <div className="mt-2 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-16">
            {data &&
            data !== null &&
            data !== undefined &&
             data.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-100 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
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
  