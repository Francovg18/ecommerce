import { Tab } from '@headlessui/react'

const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
      {
        id: 1,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
      },
    ],
    colors: [
      { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
      { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
      { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: 
      <p className="text-gray-600 text-lg">The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, shoulder sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>,
    details: [
      {
        name: 'Features',
        items: [
          'Multiple strap configurations',
          'Spacious interior with top zip',
          'Leather handle and tabs',
          'Interior dividers',
          'Stainless strap loops',
          'Double stitched construction',
          'Water-resistant',
        ],
      },
    ],
  }
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ImageGallery = ({ photo }) => {
    return (
        <>
            <Tab.Group as="div" className="flex flex-col-reverse">
                <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                        <Tab
                            className="relative h-20 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                        >
                            {({ selected }) => (
                                <>
                                    <span className="absolute inset-0 rounded-md overflow-hidden">
                                        <img src={photo} alt="" className="w-full h-full object-center object-cover transition-transform duration-500 hover:scale-110" />
                                    </span>
                                    <span
                                        className={classNames(
                                            selected ? 'ring-blue-500' : 'ring-transparent',
                                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </Tab>
                    </Tab.List>
                </div>

                <Tab.Panels className="w-full max-w-lg mx-auto aspect-w-1 aspect-h-1">
                    {product.images.map((image) => (
                        <Tab.Panel key={image.id}>
                            <img
                                src={photo}
                                alt=""
                                className="w-full h-full object-center object-cover sm:rounded-lg shadow-xl transition duration-500 hover:scale-105 hover:shadow-2xl"
                            />
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </>
    )
}

export default ImageGallery;
