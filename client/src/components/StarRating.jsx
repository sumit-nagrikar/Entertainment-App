import React from 'react';

const StarRating = ({ rating }) => {
  // Total number of stars in the rating system
  const totalStars = 5;
  // Calculate the number of full stars based on the rating
  const fullStars = Math.floor(rating);
  // Determine if there's a half star based on the fractional part of the rating
  const hasHalfStar = rating - fullStars >= 0.5;
  // Calculate the number of empty stars based on the total stars, full stars, and half star
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <svg key={index} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.995a1 1 0 00.95.69h5.261c.969 0 1.371 1.24.588 1.81l-4.258 3.087a1 1 0 00-.364 1.118l1.618 4.995c.3.921-.755 1.688-1.54 1.118l-4.258-3.087a1 1 0 00-1.176 0l-4.258 3.087c-.784.57-1.84-.197-1.54-1.118l1.618-4.995a1 1 0 00-.364-1.118L2.64 10.423c-.783-.57-.38-1.81.588-1.81h5.261a1 1 0 00.95-.69l1.618-4.996z" />
        </svg>
      ))}
      {/* Render half star if applicable */}
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.995a1 1 0 00.95.69h5.261c.969 0 1.371 1.24.588 1.81l-4.258 3.087a1 1 0 00-.364 1.118l1.618 4.995c.3.921-.755 1.688-1.54 1.118l-4.258-3.087a1 1 0 00-1.176 0l-4.258 3.087c-.784.57-1.84-.197-1.54-1.118l1.618-4.995a1 1 0 00-.364-1.118L2.64 10.423c-.783-.57-.38-1.81.588-1.81h5.261a1 1 0 00.95-.69l1.618-4.996zM10 12.94v4.853l3.382 2.453-1.029-3.176a2 2 0 00-.728-1.12L10 12.941z" />
        </svg>
      )}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <svg key={index + fullStars} className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.995a1 1 0 00.95.69h5.261c.969 0 1.371 1.24.588 1.81l-4.258 3.087a1 1 0 00-.364 1.118l1.618 4.995c.3.921-.755 1.688-1.54 1.118l-4.258-3.087a1 1 0 00-1.176 0l-4.258 3.087c-.784.57-1.84-.197-1.54-1.118l1.618-4.995a1 1 0 00-.364-1.118L2.64 10.423c-.783-.57-.38-1.81.588-1.81h5.261a1 1 0 00.95-.69l1.618-4.996z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
