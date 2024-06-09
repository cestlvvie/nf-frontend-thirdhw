'use client'
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(username, password);
    router.push('/');  
  };

  return (
    <div className="flex-1 flex flex-col">
    <main className="flex-grow flex justify-center items-center">
      <div className="grid grid-cols-1 gap-8 p-6 md:p-8 lg:p-10">
        <div className="bg-[#F5E0D8] rounded-lg p-4 md:p-6 max-w-md">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">login</h1>
              <p className="text-[#666]">enter your email and password to access your account.</p>
            </div>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label>username:</label>
        <input className="ml-4 rounded-lg p-1" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label>password:</label>
        <input className="ml-4 rounded-lg p-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="w-full bg-white rounded-lg p-2">Login</button>
    </form>
    </div>
      </div>
    </div>
  </main>
    </div>
  );
};

export default LoginPage;

 





 