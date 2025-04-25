import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-[#BBBBBB] text-center text-sm p-4">
      <div className="mx-auto">
        <div className='flex px-3'>
        <p>
          © {new Date().getFullYear()}{" "}
          <strong className="text-white">Nigeria Ground Water Admin Console</strong>
        </p>
        <p className="text-[#888] px-4">
          Confidential and secure. Managed by Nigeria Ground Water
        </p>
        

        <a
          href="mailto:support@ngwater.app"
          className="text-pink-300 no-underline block  hover:underline"
        >
          support@ngwater.app
        </a>
        </div>
        <div className="mt-2 space-x-2 text-[#90CAF9]">
          <a href="/faq" className="hover:underline inline-block">FAQ</a>
          <span>|</span>
          <a href="/report-issue" className="hover:underline inline-block">Report Issue</a>
          <span>|</span>
          <a href="/privacy" className="hover:underline inline-block">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
