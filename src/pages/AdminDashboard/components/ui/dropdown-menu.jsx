// import { useState } from 'react';

export function DropdownMenu({ children }) {
  return <div className="relative inline-block text-left">{children}</div>;
}

export function DropdownMenuTrigger({ children, onClick }) {
  return (
    <button onClick={onClick} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, show }) {
  if (!show) return null;
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">{children}</div>
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <button onClick={onClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
      {children}
    </button>
  );
}