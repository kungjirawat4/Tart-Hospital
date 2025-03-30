/* eslint-disable react-dom/no-missing-button-type */
// import Button from '@/components/Button';
// import CustomFormField, { FormButton } from '@/components/custom-form';

// import { Form } from '@/components/ui/form';
// import { useTranslations } from 'next-intl';
// import router from 'next/dist/shared/lib/router/router';
// import Image from 'next/image';
// import { BsQrCode } from 'react-icons/bs';
'use client';

import Message from '@/components/message';

// import CustomFormField, { FormButton } from '@/components/custom-form';
// import { Form } from '@/components/ui/form';
import ApiCall from '@/services/api';
import useUserInfoStore from '@/zustand/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
// import jsQR from 'jsqr';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import * as z from 'zod';

const Page = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const params = useSearchParams().get('next');

  const { userInfo, updateUserInfo } = useUserInfoStore(state => state);

  const [_qrCode, _setQrCode] = React.useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const postApi = ApiCall({
    key: ['login'],
    method: 'POST',
    url: `auth/login`,
  })?.post;
  useEffect(() => {
    if (postApi?.isSuccess) {
      const { id, email, menu, routes, token, name, mobile, role, image }
        = postApi.data;
      updateUserInfo({
        id,
        email,
        menu,
        routes,
        token,
        name,
        mobile,
        role,
        image,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess]);

  useEffect(() => {
    userInfo.id && router.push((params as string) || '/ICU/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, userInfo.id]);
  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    postApi?.mutateAsync(values);
  }

  return (
    <>

      <div className=" sm:p-4 flex justify-center">
        {postApi?.isError && <Message value={postApi?.error} />}
        <span
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            animation: 'fadeUp 2s ease-out 0.25s forwards',
          }}
          className="text-center leading-tight tracking-tighter"
        >
          <div
            className="bg-white p-10  rounded-3xl shadow-md text-center w-full max-w-lg animate-fadeIn sm:p-8 "
          >
            <div className="mb-20 sm:mb-8">
              <Image
                src="/assets/h.svg"
                alt="Hospital Icon"
                width={444}
                height={324}
              />
            </div>
            <div
              className="text-5xl font-bold text-green-700 mt-[30px] mb-[30px]"
            >
              {t('title1')}
            </div>

            <div className="relative mb-4 sm:mb-6">
              <input
                type="text"
                {...form.register('email')}
                required
                className="w-full py-3 px-4  border-2 border-gray-300  peer p-4   rounded-md focus:outline-none focus:ring-2 focus:green-700 focus:border-transparent"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-600 pointer-events-none transition-all duration-500
              peer-focus:top-[-22px] peer-focus:left-4 peer-focus:text-green-700 peer-focus:text-sm
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
              peer-valid:top-[-22px] peer-valid:left-4 peer-valid:text-green-700 peer-valid:text-sm"
              >

                {t('user')}
              </label>

            </div>

            <div className="relative mb-4 sm:mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                {...form.register('password')}
                required
                className="w-full py-3 px-4 border-2 border-gray-300 peer p-4 rounded-md focus:outline-none focus:ring-2 focus:green-700 focus:border-transparent"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-3 text-gray-600 pointer-events-none transition-all duration-500
      peer-focus:top-[-22px] peer-focus:left-4 peer-focus:text-green-700 peer-focus:text-sm
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
      peer-valid:top-[-22px] peer-valid:left-4 peer-valid:text-green-700 peer-valid:text-sm"
              >
                {t('password')}
              </label>

              {/* Replace the div with button */}
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'} // Add aria-label for screen readers
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div
              className="mb-4 sm:mb-8 flex justify-center"
            >
              <button
                onClick={form.handleSubmit(onSubmit)}
                // loading={postApi?.isPending}
                className="w-full bg-[#5F8D4E] text-white border-none py-4 px-6 rounded-3xl cursor-pointer transition duration-300 ease-in-out hover:bg-[#497e3b] hover:scale-105"
              >
                {t('login')}
              </button>
            </div>
            <button
              className="w-full  border-2 py-4 px-6 rounded-3xl cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:scale-105"
              onClick={() => router.push('/auth/register')}
            >
              {t('reg')}
            </button>
            <div className="flex justify-between">
              <div className="text-green-700 hover:underline pt-3">
                <Link href="/" className="ps-1">
                  {t('back')}
                </Link>
              </div>
              <div className="row text-green-700 hover:underline pt-3">
                <Link href="/auth/forgot-password" className="ps-1">
                  {t('foget')}
                </Link>
              </div>
            </div>

          </div>

        </span>

      </div>

    </>
  );
};
export default Page;
