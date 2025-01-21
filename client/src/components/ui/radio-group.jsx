// src/components/ui/radio-group.jsx

import React from 'react';

export const RadioGroup = ({ children, value, onValueChange, ...props }) => {
  // your RadioGroup component logic here
  return (
    <div {...props}>
      {children}
    </div>
  );
};

// Also export RadioGroupItem if it's being used
export const RadioGroupItem = ({ value, children }) => {
  return (
    <label>
      <input type="radio" value={value} />
      {children}
    </label>
  );
};
