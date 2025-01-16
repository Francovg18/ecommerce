const Banner = ({ data }) => {
    return (
      <div className="grid gap-4 p-8">
        {data &&
          data !== null &&
          data !== undefined && (
            <>
              {/* Primera fila */}
              <div className="flex">
                <div className="w-1/2 p-2">
                  <div className="relative w-full h-[180px] overflow-hidden rounded-lg m-2">
                    <img
                      src={data[0]?.get_thumbnail || "https://via.placeholder.com/600x300"}
                      alt={data[0]?.name || "Producto 1"}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="relative w-full h-[260px] overflow-hidden rounded-lg m-2">
                    <img
                      src={data[1]?.get_thumbnail || "https://via.placeholder.com/600x300"}
                      alt={data[1]?.name || "Producto 2"}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
  
              {/* Segunda fila */}
              <div className="flex items-start">
                <div className="w-1/4 p-2">
                  <div className="relative w-full h-[280px] overflow-hidden rounded-lg m-2 -mt-20">
                    <img
                      src={data[2]?.get_thumbnail || "https://via.placeholder.com/400x300"}
                      alt={data[2]?.name || "Producto 3"}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-1/4 p-2">
                  <div className="relative w-full h-[280px] overflow-hidden rounded-lg m-2 -mt-20">
                    <img
                      src={data[3]?.get_thumbnail || "https://via.placeholder.com/400x300"}
                      alt={data[3]?.name || "Producto 4"}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="relative w-full h-[200px] overflow-hidden rounded-lg m-2">
                    <img
                      src={data[4]?.get_thumbnail || "https://via.placeholder.com/600x300"}
                      alt={data[4]?.name || "Producto 5"}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    );
  };
  
  export default Banner;
  