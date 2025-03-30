/* eslint-disable react-dom/no-missing-button-type */
'use client';
// import CustomFormField, { FormButton } from '@/components/custom-form';
// import FormContainer from '@/components/form-container';
import Message from '@/components/message';
// import { Form } from '@/components/ui/form';
import ApiCall from '@/services/api';
import useUserInfoStore from '@/zustand/userStore';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import * as z from 'zod';

const FormSchema = z
  .object({
    name: z.string().refine(value => value !== '', {
      message: 'Name is required',
    }),
    email: z.string().email(),
    password: z.string().refine(val => val.length > 6, {
      message: 'Password can\'t be less than 6 characters',
    }),
    confirmPassword: z.string().refine(val => val.length > 6, {
      message: 'Confirm password can\'t be less than 6 characters',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

const Page = () => {
  const t = useTranslations('SignUpPage');
  const router = useRouter();
  const params = useSearchParams().get('next');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { userInfo } = useUserInfoStore(state => state);

  const postApi = ApiCall({
    key: ['register'],
    method: 'POST',
    url: `auth/register`,
  })?.post;

  useEffect(() => {
    userInfo.id && router.push((params as string) || '/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, userInfo.id]);

  useEffect(() => {
    if (postApi?.isSuccess) {
      // eslint-disable-next-line ts/no-use-before-define
      form.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess, router]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    postApi?.mutateAsync(values);
  }
  return (
    <>
      <div className="flex justify-center">
        {postApi?.isError && <Message value={postApi?.error} />}
        <div
          className="bg-white p-10  rounded-3xl shadow-md text-center w-full max-w-lg animate-fadeIn sm:p-8 "
        >

          <div
            className="text-5xl font-bold text-black mt-[30px] mb-[30px]"
          >
            {t('title')}
          </div>

          <div className="relative mb-4 sm:mb-6">
            <input
              type="text"
              {...form.register('name')}
              required
              className="w-full py-3 px-4  border-2 border-gray-300  peer p-4   rounded-md focus:outline-none focus:ring-2 focus:green-700 focus:border-transparent"
            />
            <label
              htmlFor="name"
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

              {t('email')}
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
          <div className="relative mb-4 sm:mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              {...form.register('confirmPassword')}
              required
              className="w-full py-3 px-4 border-2 border-gray-300 peer p-4 rounded-md focus:outline-none focus:ring-2 focus:green-700 focus:border-transparent"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-4 top-3 text-gray-600 pointer-events-none transition-all duration-500
      peer-focus:top-[-22px] peer-focus:left-4 peer-focus:text-green-700 peer-focus:text-sm
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600
      peer-valid:top-[-22px] peer-valid:left-4 peer-valid:text-green-700 peer-valid:text-sm"
            >
              {t('confirmPassword')}
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
          <div className="mb-4 sm:mb-8 space-y-2">
            <button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-[#5F8D4E] text-white border-none py-4 px-6 rounded-3xl cursor-pointer transition duration-300 ease-in-out hover:bg-[#497e3b] hover:scale-105"
            >
              {t('title')}
            </button>
            <button
              className="w-full  border-2 py-4 px-6 rounded-3xl cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:scale-105"
              onClick={() => router.push('/auth/login')}
            >
              {t('cancel')}
            </button>

          </div>

        </div>
      </div>
      {postApi?.isSuccess && (
        <div className="text-green-500 text-center mt-5">
          <span>
            {t('check')}
          </span>
          <Link
            href={postApi?.data?.confirm}
            className="ml-2 text-blue-500 hover:text-red-500"
          >
            {t('click')}
          </Link>
        </div>
      )}

      <div className="mt-10 space-y-3 text-center">
        <hr />
        <div>{t('contact')}</div>
        <a
          className="text-gray-500 underline font-light"
          href="mailto:jirawatratsamee123@gmail.com"
        >
          jirawatratsamee123@gmail.com
        </a>
      </div>
    </>

  );
};

export default Page;
