
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Observatorio de Interconexiones. Todos los derechos reservados.</p>
        <p className="text-sm mt-1">Construyendo un futuro energético resiliente e integrado para América Latina y el Caribe.</p>
      </div>
    </footer>
  );
};
