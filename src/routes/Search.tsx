import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getSearch, IGetSearchResult } from '../api';
import styled from 'styled-components';
import SearchSlider from '../components/SearchSlider';

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { isLoading } = useQuery<IGetSearchResult>(['search', keyword], () =>
    getSearch(keyword || '')
  );

  return (
    <>
      {isLoading && <Loader>loading...</Loader>}
      {!isLoading && <SearchSlider keyword={keyword as string} />}
    </>
  );
}

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
