"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      router.push('/auth/login');
    }
    else {
      router.push('/dashboard');
    }
  }, []);
}
