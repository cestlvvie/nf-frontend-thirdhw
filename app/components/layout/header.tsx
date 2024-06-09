import React from 'react';
import FlowerIcon from '../flowerican';
import Link from 'next/link';

const Header: React.FC = () => {
   

  return (
    <header className="bg-[#F5E0D8] text-[#333] py-4 px-6 md:px-8 lg:px-10 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <FlowerIcon className="h-6 w-6" />
        <span className="text-lg font-medium">{`aizh's cozy hearth`}</span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="#" className={`hover:underline`} prefetch={false}>
          create
        </Link>
        <Link href="/login">
          <span className={`border-l border-[#333] pl-6 hover:underline`}>login</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
