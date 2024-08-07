import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaLink } from "react-icons/fa6";
import StarRating from "./StarRating";
import { key } from "../Requests";

function MovieDetail() {
  const { mediaType, id } = useParams();

  // State to manage movie/show details, credits, loading, and errors
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mediaType || !id) {
      // Set error if media type or ID is missing
      setError("Media type or ID is missing");
      setLoading(false);
      return;
    }

    // Function to fetch movie/show details and credits
    const fetchDetailsData = async () => {
      try {
        // Fetch movie/show details
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${key}`
        );
        setDetails(detailsResponse.data);

        // Fetch movie/show credits
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${key}`
        );
        setCredits(creditsResponse.data);
      } catch (error) {
        // Set error message if there's an issue with the API calls
        setError("Error fetching details or credits");
      } finally {
        // Set loading to false once the API calls are done
        setLoading(false);
      }
    };

    fetchDetailsData(); // Call the fetch function when component mounts or id/mediaType changes
  }, [id, mediaType]);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message
  if (error) {
    return <div>{error}</div>;
  }

  // Display error if details are not available
  if (!details) {
    return <div>Error loading details.</div>;
  }

  // Extract necessary details from the response
  const title = details.title || details.name;
  const tagline = details.tagline || "";
  const releaseDate = details.release_date || details.first_air_date;
  const lastAirDate = details.last_air_date || null;

  return (
    <div className="p-8 mt-2 min-h-available bg-[#10141E] text-white flex flex-col md:flex-row items-start gap-8">
      {/* Display movie/show poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
        alt={title}
        className="w-full md:w-1/3 lg:w-1/4 h-auto object-cover rounded-md mb-4 md:mb-0"
      />
      <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-3/4">
        {/* Title and tagline */}
        <h1 className="text-4xl font-medium break-words">{title}</h1>
        <p className="text-lg italic text-gray-500">{tagline}</p>
        <div>
          <h2 className="font-bold">Ratings</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xl">
              {details.vote_average.toFixed(1)}
            </span>
            <StarRating rating={details.vote_average / 2} />
            <p>{details.vote_count} votes</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <h2 className="font-medium text-gray-500">Language</h2>
            <p>{details.original_language}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="font-medium text-gray-500">First Air</h2>
            <p>{releaseDate}</p>
          </div>
          {lastAirDate && (
            <div className="flex flex-col">
              <h2 className="font-medium text-gray-500">Last Air</h2>
              <p>{lastAirDate}</p>
            </div>
          )}
          <div className="flex flex-col">
            <h2 className="font-medium text-gray-500">Status</h2>
            <p>{details.status}</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold mt-4">Genres</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {details.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-white text-black font-medium rounded-md px-2 py-1 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-medium my-2">Overview</h2>
          <p className="text-gray-400">{details.overview}</p>
        </div>
        <div>
          <h2 className="font-medium">Casts</h2>
          <div className="flex flex-wrap gap-2">
            {credits && credits.cast.slice(0, 5).map((castMember) => (
              <span
                key={castMember.cast_id}
                className="bg-[#10141E] border border-white rounded-md px-2 py-1 my-2 text-sm"
              >
                {castMember.name}
              </span>
            ))}
          </div>
        </div>
        {details.homepage && (
          <div>
            <a
              href={details.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full md:w-40 bg-[#5A6B90] text-white px-4 py-2 rounded flex items-center justify-center"
            >
              Website <FaLink className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
