import React from 'react';

const Icon = ({ IconComponent, onClick, className }) => {
  return (
    <button onClick={onClick} className={`p-2 ${className}`}>
      <IconComponent className="h-5 w-5" />
    </button>
  );
};

export default Icon;
