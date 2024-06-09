'use client'
import React, { useEffect } from 'react';
import PostsList from './components/postlist';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  
    const { isAuthenticated } = useAuth();
    const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');  
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;  
  }

  return(
    <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr] gap-8 p-6 md:p-8 lg:p-10"> 
        <div> 
        <PostsList />
        </div>
    </main>
  );
};

export default Page;
