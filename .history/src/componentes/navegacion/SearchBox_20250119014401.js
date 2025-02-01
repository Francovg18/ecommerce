import { SearchIcon } from '@heroicons/react/solid';

const SearchBox = ({
    categories,
    search,
    onChange,
    onSubmit,
}) => {
    return (
        <form onSubmit={e => onSubmit(e)} className="text-base font-medium text-gray-500 hover:text-gray-900">
            <div>
                <div className="mt-1 flex flex-col rounded-full shadow-sm border border-gray-200">

                    {/* Campo de búsqueda */}
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                            type="search"
                            name="search"
                            onChange={e => onChange(e)}
                            value={search}
                            required
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-t-md pl-2 sm:text-sm border-gray-300"
                            placeholder="¿Qué buscas hoy?"
                        />
                    </div>

                    {/* Fila con el select de categorías */}
                    <div className="mt-1 mx-1 px-2 py-1">
                        <select
                            onChange={e => onChange(e)}
                            name='category_id'
                            className='rounded-full text-sm w-full'
                        >
                            <option value={0}>All</option>
                            {
                                categories && 
                                categories !== null &&
                                categories !== undefined &&
                                categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Botón de búsqueda */}
                    <div className="mt-1 -ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-b-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <button type="submit">
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
}

export default SearchBox;
