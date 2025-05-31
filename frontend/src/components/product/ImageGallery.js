import { Tab } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ImageGallery = ({ photos, short_description }) => {
    return (
        <>
            <Tab.Group as="div" className="flex flex-col-reverse">
                <div className="mt-10 w-full max-w-2xl mx-auto lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-4 p-2 bg-gray-100 rounded-lg">
                        {photos.map((photo, index) => (
                            <Tab key={index} className="relative h-16 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
                                {({ selected }) => (
                                    <>
                                        <span className="absolute inset-0 rounded-md overflow-hidden">
                                            <img src={photo} alt="" className="w-full h-full object-center object-cover transition-transform duration-500 hover:scale-110" />
                                        </span>
                                        <span
                                            className={classNames(
                                                selected ? 'ring-midnight-blue border-2 border-gray-300 shadow-md' : 'ring-transparent',
                                                'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>

                    <div className="mt-16 max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <p className="text-xl font-semibold text-gray-900 mb-4">Características Principales:</p>
                        <p className="text-gray-600 text-l">
                            {short_description}
                        </p>
                    </div>
                </div>

                <Tab.Panels className="w-full max-w-md mx-auto aspect-w-1 aspect-h-1 mt-8">
                    {photos.map((photo, index) => (
                        <Tab.Panel key={index}>
                            <img
                                src={photo}
                                alt=""
                                className="border-2 p-2 w-[90%] h-auto mx-auto object-center object-cover sm:rounded-lg shadow-xl transition duration-500 hover:scale-105 hover:shadow-2xl"
                            />
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </>
    )
}

export default ImageGallery;
