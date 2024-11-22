import React from "react";

export const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md bg-white ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const CardFooter = ({ children }) => (
  <div className="p-4 border-t">{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`font-bold ${className}`}>{children}</h2>
);

export const CardDescription = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);
