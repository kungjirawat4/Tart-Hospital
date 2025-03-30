/* eslint-disable react-dom/no-missing-button-type */
'use client';
import useAuthorization from '@/hooks/useAuthorization';
import useUserInfoStore from '@/zustand/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const path = useAuthorization();
  const router = useRouter();
  useEffect(() => {
    if (path) {
      router.push(path);
    }
  }, [path, router]);
  const onLogout = () => {
    useUserInfoStore.getState().logout();
  };
  return (
    <>
      <div className="flex justify-center">
        หน้าหลักจ้า
      </div>

      <div>
        <button className="w-full bg-[#5F8D4E] text-white border-none py-4 px-6 rounded-3xl cursor-pointer transition duration-300 ease-in-out hover:bg-[#497e3b] hover:scale-105" onClick={() => onLogout()}>ออกจากระบบ</button>
      </div>

    </>

  );
};

export default Home;
