
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <div className="relative w-8 h-8">
        <div className="absolute top-0 w-full h-full border-2 border-secondary rounded-full"></div>
        <div className="absolute top-0 w-full h-full border-2 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
