'use client';

import moment from 'moment';

const Footer = () => {
  const year = moment().format('YYYY');
  return (
    <footer className="footer footer-center text-center font-light flex justify-center items-center  dark:bg-gray-900 text-base-content h-[68px]">
      <div>
        <p className="text-gray-400 dark:text-gray-500">
          Copyright ©
          {' '}
          {year}
          {' '}
          - Developed by
          <a
            className="mx-1 font-bold text-blue-500 dark:text-blue-400"
            target="_blank"
            href="https://ahmedibra.com"
            rel="noreferrer"
          >
            Jirawat Ratsamee
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
