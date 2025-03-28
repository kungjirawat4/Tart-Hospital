// import Button from '@/components/Button';
// import CustomFormField, { FormButton } from '@/components/custom-form';

// import { Form } from '@/components/ui/form';
// import { useTranslations } from 'next-intl';
// import router from 'next/dist/shared/lib/router/router';
// import Image from 'next/image';
// import { BsQrCode } from 'react-icons/bs';
'use client';

import CustomFormField, { FormButton } from '@/components/custom-form';
import WebcamCapture from '@/components/qrscanner/WebcamCapture';
import { Form } from '@/components/ui/form';
import ApiCall from '@/services/api';

import { Button } from '@heroui/button';

import { Modal, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsQrCode } from 'react-icons/bs';
import * as z from 'zod';

const Page = () => {
  const t = useTranslations('Login');
  const router = useRouter();
  const _params = useSearchParams().get('next');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState<string>('');
  const postApi = ApiCall({
    key: ['login'],
    method: 'POST',
    url: `auth/login`,
  })?.post;

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
      <div className="mb-20 sm:p-4">
        <div
          className="bg-white p-10 rounded-3xl shadow-md text-center w-full max-w-lg animate-fadeIn sm:p-8 "
        >
          <div className="mb-20 sm:mb-8">
            <Image
              src="/assets/h.svg"
              alt="Hospital Icon"
              layout="responsive"
              width={444}
              height={324}
            />
          </div>
          <div
            className="text-5xl font-bold text-green-700 mt-[30px] mb-[30px]"
          >
            {t('title')}
          </div>
          <div className="relative mb-4 sm:mb-6">
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full py-3 px-4  border-2 border-gray-300  peer p-4   rounded-md focus:outline-none focus:ring-2 focus:green-700 focus:border-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-[12px] text-gray-600 pointer-events-none transition-all duration-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-[-30px] peer-focus:left-4 peer-focus:text-green-700 peer-focus:text-sm "
            >

              {t('user')}
            </label>

          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <CustomFormField
                form={form}
                name="password"
                label="รหัสผ่าน"
                placeholder="กรุณากรอกรหัสผ่าน"
                type="password"
              />

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <FormButton
                    loading={postApi?.isPending}
                    label="เข้าสู่ระบบ"
                    className="w-full"
                  />
                </div>
                <Button color="danger" startContent={<BsQrCode size={20} />} variant="bordered" onPress={onOpen}>QR</Button>

              </div>

              <FormButton
                label="สมัครสมาชิก"
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => router.push('/auth/register')}
              />
            </form>

          </Form>
          <div className="row pt-3">
            <div className="col">
              <Link href="/auth/forgot-password" className="ps-1">
                ลืมรหัสผ่าน?
              </Link>
            </div>
          </div>

          <Modal
            backdrop="opaque"
            classNames={{
              backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
            }}
            size="xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >

            <ModalContent>
              {onClose => (
                <>
                  <ModalHeader className="flex flex-col gap-1">กรุณานำ QR Code มาแสกน </ModalHeader>
                  <WebcamCapture onScan={handleScan} />
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>

    </>
  );
};
export default Page;
