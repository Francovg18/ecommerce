import { Link } from "react-router-dom";

const Banner = ({ data }) => {
  return (
    <div className="grid gap-4 p-8">
      {data && data.length > 0 && (
        <>
          {/* Primera fila */}
          <div className="flex">
            <div className="w-1/2 p-2">
              <Link to={`product/${data[0]?.id}`}>
                <div className="relative w-full h-[180px] overflow-hidden rounded-lg m-2 group">
                  <img
                    src={data[0]?.get_thumbnail}
                    alt={data[0]?.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </div>
            <div className="w-1/2 p-2">
              <Link to={`product/${data[1]?.id}`}>
                <div className="relative w-full h-[260px] overflow-hidden rounded-lg m-2 group">
                  <img
                    src={data[1]?.get_thumbnail}
                    alt={data[1]?.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </div>
          </div>

          {/* Segunda fila */}
          <div className="flex items-start">
            <div className="w-1/4 p-2">
              <Link to={`product/${data[2]?.id}`}>
                <div className="relative w-full h-[280px] overflow-hidden rounded-lg m-2 group -mt-20">
                  <img
                    src={data[2]?.get_thumbnail}
                    alt={data[2]?.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </div>
            <div className="w-1/4 p-2">
              <Link to={`product/${data[3]?.id}`}>
                <div className="relative w-full h-[280px] overflow-hidden rounded-lg m-2 group -mt-20">
                  <img
                    src={data[3]?.get_thumbnail}
                    alt={data[3]?.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </div>
            <div className="w-1/2 p-2">
              <Link to={`product/${data[4]?.id}`}>
                <div className="relative w-full h-[200px] overflow-hidden rounded-lg m-2 group">
                  <img
                    src={data[4]?.get_thumbnail}
                    alt={data[4]?.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
