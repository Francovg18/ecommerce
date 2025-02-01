import { Tab } from '@headlessui/react'


  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const ImageGallery =({photo})=>{
    
    return(
        <>
        <Tab.Group as="div" className="flex flex-col-reverse">
                    <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                        <Tab
                      
                            className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                        >
                            {({ selected }) => (
                            <>
                                <span className="absolute inset-0 rounded-md overflow-hidden">
                                <img src={photo} alt="" className="w-full h-full object-center object-cover" />
                                </span>
                                <span
                                className={classNames(
                                    selected ? 'ring-midnight-blue' : 'ring-transparent',
                                    'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                )}
                                aria-hidden="true"
                                />
                            </>
                            )}
                        </Tab>
                      
                    </Tab.List>
                    </div>

                </Tab.Group>
        </>
    )
}
export default ImageGallery