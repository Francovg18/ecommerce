import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="group relative">
      <div className="w-full h-48 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900 text-right">{product.price} Bs</p>
      </div>
    </div>
  );
};

export default ProductCard;
