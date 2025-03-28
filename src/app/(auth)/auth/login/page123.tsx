'use client';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
// import Swal from 'sweetalert2';

export default function LoginICU() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showResetPopup, setShowResetPopup] = useState<boolean>(false);
  const [resetName, setResetName] = useState<string>('');
  const [resetPassword, setResetPassword] = useState<string>('');
  const [confirmResetPassword, setConfirmResetPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [showConfirmResetPassword, setShowConfirmResetPassword]
    = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    // if (!email || !password) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'ข้อมูลไม่ครบถ้วน',
    //     text: 'กรุณาใส่ข้อมูลให้ครบถ้วน',
    //     showConfirmButton: true, // เพิ่มปุ่มยืนยัน
    //   });
    //   return;
    // }

    //   try {
    //     const response = await axios.post('/api/auth/login', { email, password });
    //     // บันทึก token และข้อมูลผู้ใช้ใน localStorage
    //     document.cookie = `token=${response.data.token}; path=/;`;
    //     localStorage.setItem('token', response.data.token);
    //     localStorage.setItem('user', JSON.stringify(response.data.user));
    //     // localStorage.setItem('user', JSON.stringify({ name: 'John Doe', image: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' }));
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'เข้าสู่ระบบสำเร็จ',
    //       text: 'ยินดีต้อนรับ!',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     }).then(() => {
    //       window.location.href = '/ICU/homeICU';
    //     });
    //   } catch (err: unknown) {
    //     if (axios.isAxiosError(err) && err.response) {
    //       setError(err.response.data.message);
    //     } else {
    //       setError('An unexpected error occurred.');
    //     }
    //   }
    // };

    const handleClosePopup = () => {
      setShowPopup(false);
    };

    const handleOpenResetPopup = () => {
      setShowResetPopup(true);
    };

    const handleCloseResetPopup = () => {
      setShowResetPopup(false);
      setStep(1); // Reset to initial step
      clearResetFields(); // Clear all reset fields
    };

    const clearResetFields = () => {
      setResetName('');
      setResetPassword('');
      setConfirmResetPassword('');
    };

    const handleCheckName = async () => {
    // if (!resetName) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'ข้อมูลไม่ครบถ้วน',
    //     text: 'กรุณากรอกชื่อเพื่อค้นหา',
    //   });
    //   return;
    // }

      try {
        const response = await axios.get(`/api/users?email=${resetName}`);
        if (response.data && response.data.id) {
          setUserId(response.data.id);
          setStep(2); // Proceed to next step
        } else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'ไม่พบผู้ใช้งาน',
        //   text: 'กรุณากรอกชื่อที่ถูกต้อง',
        // });
        }
      } catch (error) {
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'ไม่พบผู้ใช้งาน',
      //   text: 'กรุณากรอกชื่อที่ถูกต้อง',
      // });
      }
    };

    const handleResetPassword = async () => {
      const thaiCharPattern = /[\u0E00-\u0E7F]/;
      if (!resetPassword || !confirmResetPassword) {
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'ข้อมูลไม่ครบถ้วน',
      //   text: 'กรุณากรอกรหัสผ่านใหม่เพื่ออัพเดทรหัสผ่าน',
      // });
        return;
      }
      if (resetPassword.length < 8) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'รหัสผ่านสั้นเกินไป',
      //   text: 'รหัสผ่านต้องมีอย่างน้อย 8 หลัก',
      // });
        return;
      }
      if (thaiCharPattern.test(resetPassword)) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'รหัสผ่านไม่ถูกต้อง',
      //   text: 'รหัสผ่านต้องไม่มีอักขระภาษาไทย',
      // });
        return;
      }
      if (resetPassword !== confirmResetPassword) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'รหัสผ่านไม่ตรงกัน',
      //   text: 'กรุณาใส่รหัสผ่านใหม่ให้ตรงกัน',
      // });
        return;
      }

      try {
        await axios.put(`/api/users/${userId}`, { password: resetPassword });
        // Swal.fire({
        //   icon: 'success',
        //   title: 'สำเร็จ',
        //   text: 'รหัสผ่านของคุณถูกรีเซ็ตเรียบร้อยแล้ว',
        //   timer: 3000,
        //   showConfirmButton: false,
        // });
        handleCloseResetPopup();
      } catch (error) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'เกิดข้อผิดพลาด',
      //   text: 'ไม่สามารถรีเซ็ตรหัสผ่านได้',
      // });
      }
    };

    return (
      <div className="mb-20 sm:p-4">
        <div
          className="bg-white p-10 rounded-3xl shadow-md text-center w-full max-w-lg opacity-0 animate-fadeIn sm:p-8 "
        >
          <div className="mb-20 sm:mb-8">
            <Image
              src="/h.svg"
              alt="Hospital Icon"
              layout="responsive"
              width={444}
              height={324}
            />
          </div>
          <div
            className="text-5xl font-bold text-green-700 mt-[30px] mb-[30px]"
          >
            ระบบห้องผู้ป่วยหนัก
          </div>
          <div className="relative mb-4 sm:mb-6">
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              className="w-full py-3 px-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:border-green-700"
            />
            <label
              htmlFor="email"
              className="absolute top-0 left-4 px-2 text-green-700 transition-all duration-500"
            >
              ชื่อผู้ใช้งาน
            </label>
          </div>
          <div className="relative mb-4 sm:mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              className="w-full py-3 px-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:border-green-700"
            />
            <label
              htmlFor="password"
              className="absolute top-0 left-4 px-2 text-green-700 transition-all duration-500"
            >
              รหัสผ่าน
            </label>
            <div
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div
            className="mb-4 sm:mb-8 flex justify-between"
          >
            {/* <button
            onClick={handleOpenPopup}
            className={`${styles.login} bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300 hover:bg-green-600`}
          >
            สแกน
          </button> */}
            <button
              onClick={handleLogin}
              className=" bg-[#5F8D4E] text-white border-none py-3 px-6 rounded-3xl cursor-pointer transition-all duration-300 hover:bg-[#497e3b] hover:scale-105"
            >
              เข้าสู่ระบบ
            </button>
          </div>
          <div className="flex justify-between">
            <div
              className="block mt-5 text-[#5F8D4E] text-left no-underline hover:underline"
              half="/src/app/page.tsx"
            >
              กลับไปเลือกบทบาท
            </div>
            {/* <a
            onClick={handleOpenResetPopup}
            className={`${styles.selectRole} text-green-700 hover:underline`}
          >
            ลืมรหัสผ่าน?
          </a> */}
          </div>
        </div>
      </div>
    );
  };
}
