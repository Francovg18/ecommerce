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
                      src={data[0]?.get_thumbnail }
                      alt={data[0]?.name }
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="relative w-full h-[260px] overflow-hidden rounded-lg m-2">
                    <img
                      src={data[1]?.get_thumbnail }
                      alt={data[1]?.name }
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
                      src={data[2]?.get_thumbnail }
                      alt={data[2]?.name }
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-1/4 p-2">
                  <div className="relative w-full h-[280px] overflow-hidden rounded-lg m-2 -mt-20">
                    <img
                      src={data[3]?.get_thumbnail }
                      alt={data[3]?.name }
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="relative w-full h-[200px] overflow-hidden rounded-lg m-2">
                    <img
                      src={data[4]?.get_thumbnail }
                      alt={data[4]?.name }
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
  