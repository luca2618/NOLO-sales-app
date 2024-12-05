import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg1-color)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative images */}
      <img
        src="PUYA.png"
        alt=""
        className="absolute top-[8%] left-[8%] w-0 md:w-64 opacity-90"
      />
      <img
        src="public/JADA.png"
        alt=""
        className="absolute top-[50%] left-[-1%] w-0 md:w-48 opacity-90"
      />
      <img
        src="public/BABAR.png"
        alt=""
        className="absolute top-[5%] left-[82%] w-0 md:w-64 opacity-90"
      />
      <img
        src="public/DAISY.png"
        alt=""
        className="absolute top-[65%] left-[85%] w-0 md:w-48 opacity-90"
      />
      
      {children}
    </div>
  );
}