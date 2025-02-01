import { Link } from "react-router-dom"
const ProductCard =({product})=>{
    return(
        
      <div key={product.id} className="group relative mx-2">
        <div className="w-full min-h-48 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-48 lg:aspect-none">
          <img
            src={product.photo}
            alt=""
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}Bs</p>
        </div>
      </div>
    
    )
}

export default ProductCard