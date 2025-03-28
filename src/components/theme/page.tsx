// /* eslint-disable react-dom/no-missing-button-type */
// 'use client';
// import { Tooltip } from '@heroui/tooltip';
// import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
// import { useEffect, useState } from 'react';

// export default function ThemeSwitcher() {
//   const [theme, setTheme] = useState(() =>
//     typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'dark'
//       ? 'dark'
//       : 'light',
//   );
//     // const [theme, setTheme] = useState(() => {
//     //     if (typeof window !== "undefined") {
//     //         const storedTheme = localStorage.getItem("theme");
//     //         if (storedTheme) return storedTheme;
//     //         return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//     //     }
//     //     return "light";
//     // });

//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [theme]);

//   return (
//     <Tooltip content={theme === 'dark' ? 'ธีมสว่าง' : 'ธีมมืด'}>
//       <button
//         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//         className="p-2 rounded-full  dark:bg-gray-800  dark:hover:bg-gray-700 transition"
//       >
//         {theme === 'dark' ? <SunIcon width={20} height={20} /> : <MoonIcon width={20} height={20} />}
//       </button>
//     </Tooltip>

//   );
// }

/* eslint-disable react-dom/no-missing-button-type */
'use client';

import { Tooltip } from '@heroui/tooltip';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null); // แก้เป็น null ตอนแรก

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (!theme) {
      return;
    } // รอจนกว่าธีมจะมีค่า

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (theme === null) {
    return null; // ป้องกัน Hydration error โดยไม่แสดงอะไรเลยจนกว่าธีมจะถูกตั้งค่า
  }

  return (
    <Tooltip content={theme === 'dark' ? 'ธีมสว่าง' : 'ธีมมืด'}>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full dark:bg-gray-800 dark:hover:bg-gray-700 transition"
      >
        {theme === 'dark' ? <SunIcon width={20} height={20} /> : <MoonIcon width={20} height={20} />}
      </button>
    </Tooltip>
  );
}
