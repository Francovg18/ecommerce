import { ChevronDownIcon } from '@heroicons/react/solid'; // Importamos el ícono

// Componente para una categoría con submenú
const CategoryWithSubmenu = ({ firstWord, groupedCategories, formData, onChange }) => {
  return (
    <li key={firstWord} className="relative">
      <div className="flex items-center h-5 my-5">
        <input
          name="category_id"
          type="radio"
          value={firstWord} 
          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
          checked={formData.category_id === firstWord}
          onChange={onChange}
        />
        <label className="ml-3 text-gray-900 font-bold cursor-pointer">{firstWord}</label>

        {/* Ícono indicando que tiene un submenú */}
        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-600 cursor-pointer" />
      </div>

      {/* Menú desplegable */}
      <ul className="absolute left-0 w-full bg-white border border-gray-200 shadow-md rounded-md z-10 hidden group-hover:block group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-300 ease-in-out">
        {groupedCategories.map(category => (
          <li key={category.id} className="px-4 py-2 hover:bg-gray-100">
            <input
              name="category_id"
              type="radio"
              value={category.id}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
              checked={formData.category_id === String(category.id)}
              onChange={onChange}
            />
            <label className="ml-3 text-gray-500">{category.name}</label>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default CategoryWithSubmenu;
