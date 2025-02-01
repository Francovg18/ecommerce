import { SearchIcon } from '@heroicons/react/solid';

const SearchBox = ({ categories, search, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex items-center border border-orange-500 rounded-full shadow-md overflow-hidden w-full max-w-3xl mx-auto"
    >
      {/* Dropdown de categorías */}
      <div className="relative">
        <select
          onChange={(e) => onChange(e)}
          name="category_id"
          className="h-full rounded-l-full text-gray-700 text-sm bg-gray-50 border-r border-orange-500 px-4 py-2 outline-none focus:ring-orange-500"
        >
          <option value={0}>Todos los departamentos</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {/* Campo de búsqueda */}
      <input
        type="search"
        name="search"
        onChange={(e) => onChange(e)}
        value={search}
        required
        className="flex-grow text-sm text-gray-700 px-4 py-2 outline-none focus:ring-orange-500 focus:border-orange-500"
        placeholder="Buscar en la tienda"
      />

      {/* Botón de envío */}
      <button
        type="submit"
        className="flex items-center justify-center h-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-full"
      >
        <SearchIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBox;
