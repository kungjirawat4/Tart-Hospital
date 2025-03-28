'use client';
import DateTime from '@/libs/dateTime';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

type Props = {
  value: string | any;
};

const Message = ({ value = 'Internal Server Error!' }: Props) => {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    toast.message(value, {
      description: DateTime().format('ddd D MMM YYYY HH:mm:ss'),
      action: {
        label: 'Close',
        onClick: () => {},
      },
    });

    const timeId = setTimeout(() => {
      setAlert(false);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return (
    <>
      {alert && (
        <div>
          <Toaster position="top-right" className="bg-red-500" />
        </div>
      )}
    </>
  );
};

export default Message;
