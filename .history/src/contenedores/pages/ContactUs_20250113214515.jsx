import React from 'react';

function ContactUs() {
  const branches = [
    {
      title: 'Oficina Central La Paz',
      address: 'Calle 21',
      tel: '591-2-2799588 - 2791838 - 2775854',
      fax: '591-2-2799868',
      cel: '70596000',
      email: 'silicom.bolivia@hotmail.com',
      buttonText: 'Central',
    },
    {
        title: 'Oficina Central Oruro',
        address: 'Calle 21',
        tel: '591-2-2799588 - 2791838 - 2775854',
        fax: '591-2-2799868',
        cel: '70596000',
        email: 'silicom.bolivia@hotmail.com',
        buttonText: 'Central',
      },
      {
        title: 'Oficina Central Cochabamba',
        address: 'Calle 21',
        tel: '591-2-2799588 - 2791838 - 2775854',
        fax: '591-2-2799868',
        cel: '70596000',
        email: 'silicom.bolivia@hotmail.com',
        buttonText: 'Central',
      },
      {
        title: 'Oficina Central Santa Cruz',
        address: 'Calle 21',
        tel: '591-2-2799588 - 2791838 - 2775854',
        fax: '591-2-2799868',
        cel: '70596000',
        email: 'silicom.bolivia@hotmail.com',
        buttonText: 'Central',
      },
      {
        title: 'Oficina Central Tarija',
        address: 'Calle 21',
        tel: '591-2-2799588 - 2791838 - 2775854',
        fax: '591-2-2799868',
        cel: '70596000',
        email: 'silicom.bolivia@hotmail.com',
        buttonText: 'Central',
      }
  ];

  return (
    <div className="px-16 py-16">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Nuestras Sucursales
      </h2>
      <div className="w-full h-2 bg-gray-300 mt-2 relative">
        <div className="h-full bg-red-500" style={{ width: '19%' }}></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="border-2 border-red-300 rounded-lg p-4 flex items-center gap-4 shadow-lg"
          >
            <img
              src="/path-to-map-image.png" // Reemplaza con la ruta real de tu imagen
              alt={`Mapa de ${branch.address}`}
              className="w-40 h-40 rounded-md object-cover"
            />
            <div>
              <h3 className="text-xl font-bold">{branch.title}</h3>
              <p>Telf/Fax: {branch.tel}</p>
              <p>Fax: {branch.fax}</p>
              <p>Cel: {branch.cel}</p>
              <p>Email: {branch.email}</p>
              <button className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
                {branch.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs;
