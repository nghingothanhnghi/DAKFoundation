import React from 'react';

interface MasterLayoutProps {
  children: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-grow w-full h-full">
        {children}
      </main>
    </div>
  );
};

export default MasterLayout; 