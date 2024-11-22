// File: components/ui/dialog.js
import React, { useState } from 'react';

export const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, toggleDialog })
      )}
    </div>
  );
};

export const DialogTrigger = ({ children, toggleDialog }) => (
  <div onClick={toggleDialog}>
    {children}
  </div>
);

export const DialogContent = ({ children, isOpen, toggleDialog }) => (
  isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2">
        <button
          onClick={toggleDialog}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  ) : null
);

export const DialogHeader = ({ children, ...props }) => (
  <div className="mb-4" {...props}>
    {children}
  </div>
);

export const DialogTitle = ({ children, ...props }) => (
  <h3 className="text-xl font-semibold text-gray-800" {...props}>
    {children}
  </h3>
);
