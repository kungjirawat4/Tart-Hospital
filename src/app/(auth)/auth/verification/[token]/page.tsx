/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable react-web-api/no-leaked-timeout */
'use client';
// import { FormButton } from '@/components/custom-form';
// import FormContainer from '@/components/form-container';
import Message from '@/components/message';
import ApiCall from '@/services/api';
import useUserInfoStore from '@/zustand/userStore';
import { useTranslations } from 'next-intl';

// import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react';

type tParams = Promise<{ token: string[] }>;
const Verification = ({ params }: { params: tParams }) => {
  const router = useRouter();
  const { token } = use(params);
  const { userInfo } = useUserInfoStore(state => state);
  const t = useTranslations('Verify');
  const postApi = ApiCall({
    key: ['verification'],
    method: 'POST',
    url: `auth/verification`,
  })?.post;

  function onSubmit() {
    postApi?.mutateAsync({ verificationToken: token });
  }

  useEffect(() => {
    if (postApi?.isSuccess) {
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    }
  }, [postApi?.isSuccess, router]);

  useEffect(() => {
    userInfo.id && router.push('/medicine');
  }, [router, userInfo.id]);

  return (
    <>
      <div className="flex justify-center">

        <div
          className="bg-white p-10  rounded-3xl shadow-md text-center w-full max-w-lg animate-fadeIn sm:p-8 "
        >
          <div
            className="text-5xl font-bold text-black mt-[30px] mb-[30px]"
          >
            {t('title')}

          </div>
          {postApi?.isSuccess && <Message value={postApi?.data?.message} />}

          {postApi?.isError && <Message value={postApi?.error} />}
          <button
            onClick={onSubmit}
            className="w-full bg-[#5F8D4E] text-white border-none py-4 px-6 rounded-3xl cursor-pointer transition duration-300 ease-in-out hover:bg-[#497e3b] hover:scale-105"
          >
            {t('VerifyAccount')}
          </button>
        </div>

      </div>
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
      {/* <FormContainer title="Verification">
        <Head>
          <title>Verification</title>
          <meta property="og:title" content="Verification" key="title" />
        </Head>
        {postApi?.isSuccess && <Message value={postApi?.data?.message} />}

        {postApi?.isError && <Message value={postApi?.error} />}

        <FormButton
          loading={postApi?.isPending}
          label="Verify Account"
          className="w-full"
          onClick={onSubmit}
        />
      </FormContainer> */}
    </>

  );
};

export default Verification;
