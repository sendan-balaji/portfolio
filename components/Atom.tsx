
import React from 'react';

const Atom: React.FC = () => {
  return (
    <div className="relative w-56 h-56 md:w-80 md:h-80 flex items-center justify-center">
      <div className="absolute w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* Orbit 1 */}
        <div className="absolute inset-0 animate-orbit-horizontal" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 border-2 border-indigo-400/50 rounded-full"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-indigo-400 rounded-full shadow-[0_0_10px_theme(colors.indigo.400)]"></div>
        </div>

        {/* Orbit 2 */}
        <div className="absolute inset-0 animate-orbit-vertical" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 border-2 border-purple-400/50 rounded-full"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_theme(colors.purple.400)]"></div>
        </div>

        {/* Orbit 3 */}
        <div className="absolute inset-0 animate-orbit-diagonal" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 border-2 border-sky-400/50 rounded-full"></div>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_10px_theme(colors.sky.400)]"></div>
        </div>
      </div>
      {/* Nucleus */}
      <div className="w-8 h-8 bg-white rounded-full shadow-[0_0_25px_white,0_0_50px_theme(colors.indigo.400)]"></div>
    </div>
  );
};

export default Atom;