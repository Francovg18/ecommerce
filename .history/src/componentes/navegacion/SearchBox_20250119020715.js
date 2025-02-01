import { SearchIcon } from '@heroicons/react/solid';

const SearchBox = ({ categories, search, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex items-center border border-white rounded-md shadow-md overflow-hidden w-full max-w-3xl mx-auto"
    >
      {/* Dropdown de categorías */}
      <div className="relative">
        <select
          onChange={(e) => onChange(e)}
          name="category_id"
          className="h-full text-sm text-gray-700 bg-white border-r border-purple-night px-4 py-2 outline-none focus:ring-deep-rose"
        >
          <option value={0}>Todas las categorías</option>
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
        className="flex-grow text-sm text-gray-700 bg-white px-4 py-2 outline-none focus:ring-purple-night focus:border-crimson-red"
        placeholder="Buscar en la tienda"
      />

      {/* Botón de envío */}
      <button
        type="submit"
        className="flex items-center justify-center h-full bg-crimson-red hover:bg-deep-rose text-white px-4 py-2"
      >
        <SearchIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBox;
