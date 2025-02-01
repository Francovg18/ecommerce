import { useState, useEffect, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const SearchBox = ({ categories, search, onChange, onSubmit }) => {
  const [selectWidth, setSelectWidth] = useState(50); // Ancho inicial
  const selectRef = useRef(null);

  const handleCategoryChange = (e) => {
    onChange(e);
    adjustSelectWidth(); // Ajustar ancho después del cambio
  };

  const adjustSelectWidth = () => {
    if (selectRef.current) {
      const textLength = selectRef.current.options[selectRef.current.selectedIndex].text.length;
      const width = textLength * 9 + 20; // Ajuste personalizado para el ancho del texto
      setSelectWidth(width); // Actualiza el estado con el nuevo ancho
    }
  };

  useEffect(() => {
    adjustSelectWidth(); // Ajustar al cargar el componente
  }, [categories]);

  return (
    <form onSubmit={onSubmit} className="text-base font-medium text-gray-500 hover:text-gray-900">
      <div className="flex rounded-full shadow-sm border border-gray-200">
        <div className="flex items-center">
          <select
            ref={selectRef}
            onChange={handleCategoryChange}
            name="category_id"
            style={{ width: `${selectWidth}px` }} // Ancho dinámico
            className="rounded-full border-none focus:outline-none"
          >
            <option value={0}>All</option>
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <input
          type="search"
          name="search"
          onChange={onChange}
          value={search}
          required
          className="flex-grow focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 sm:text-sm border-gray-300"
          placeholder="¿Qué buscas hoy?"
        />

        <button
          type="submit"
          className="-ml-px flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
