import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingData, fetchRecommendedData } from '../redux/fetchDataSlice';
import Row from '../components/Row';
import Trending from '../components/Trending';
import LoadingLayout from '../components/Skeleton.jsx'; // Assuming you have a Skeleton component for loading
import requests from '../Requests.js';

function Home() {
  const dispatch = useDispatch();
  const { trendingData, recommendedData, isLoading: isDataLoading } = useSelector((state) => state.data); // Fetching from fetchDataSlice
  const { isLoading: isUserLoading } = useSelector((state) => state.app); // Fetching from userSlice

  useEffect(() => {
    dispatch(fetchTrendingData(requests.requestTrending));
    dispatch(fetchRecommendedData(requests.requestRecommended)); // Adjust to your API request
  }, [dispatch]);

  const loading = isUserLoading || isDataLoading; // Combine user and data loading states

  return (
    <>
      {loading ? (
        <LoadingLayout /> // Render skeleton while loading
      ) : (
        <>
          <Trending rowID='1' title='Trending' trendingData={trendingData} />
          <Row rowID='2' title='Recommended for you' rowData={recommendedData} />
        </>
      )}
    </>
  );
}

export default React.memo(Home);
