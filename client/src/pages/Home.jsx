import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/fetchDataSlice';
import Row from '../components/Row';
import Trending from '../components/Trending';
import LoadingLayout from '../components/Skeleton.jsx'; // Assuming you have a Skeleton component for loading
import requests from '../Requests.js';

function Home() {
  const dispatch = useDispatch();
  const { data, isLoading: isDataLoading } = useSelector((state) => state.data); // Fetching from fetchDataSlice
  const { isLoading: isUserLoading } = useSelector((state) => state.app); // Fetching from userSlice

  useEffect(() => {
    dispatch(fetchData(requests.requestTrending));
  }, [dispatch]);

  const loading = isUserLoading || isDataLoading; // Combine user and data loading states

  return (
    <>
      {loading ? (
        <LoadingLayout /> // Render skeleton while loading
      ) : (
        <>
          <Trending rowID='1' title='Trending' trendingData={data} />
          <Row rowID='2' title='Recommended for you' rowData={data} />
        </>
      )}
    </>
  );
}

export default React.memo(Home);
