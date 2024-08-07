import React from 'react';

const LoadingLayout = () => {
  return (
    <div className='space-y-4 mt-2'>
      {/* First row with larger tiles */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='h-64 bg-gray-700 animate-pulse rounded-sm md:rounded-md'
          ></div>
        ))}
      </div>
      
      {/* Below rows with smaller tiles */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className='h-48 bg-gray-700 animate-pulse rounded-sm md:rounded-md'
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingLayout;
