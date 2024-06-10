'use client'
import React from 'react';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {

  const { theme, toggleTheme } = useTheme();
  
  return (
    <footer className={` py-4 px-6 md:px-8 lg:px-10 flex items-center justify-between ${theme === 'dark' ? 'bg-[#1f2937] text-white' : 'bg-[#F5E0D8] text-[#333]]'}`}>
      <div className="text-sm">&copy; 2024. All rights reserved.</div>
      <nav className="flex items-center gap-6">
        <Link href="/contact" className="hover:underline" prefetch={false}>
          contact me ;3
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
