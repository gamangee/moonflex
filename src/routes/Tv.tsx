import React from 'react';
import { useQuery } from 'react-query';
import { getTvShows, IGetTVResult } from '../api';
import { makeImagePath, TypesTvShows } from '../utils';
import TVSlider from '../components/TVSlider';
import styled from 'styled-components';

export default function Tv() {
  const { data: tvLatestData, isLoading: loadingTvLatest } =
    useQuery<IGetTVResult>(['tvshows', 'popular'], () =>
      getTvShows(TypesTvShows.popular)
    );

  return (
    <Wrapper>
      {loadingTvLatest && <Loader>Loading...</Loader>}
      {!loadingTvLatest && (
        <>
          <Banner
            bgphoto={makeImagePath(
              tvLatestData?.results[0].backdrop_path || ''
            )}
          >
            <Title>{tvLatestData?.results[0].name}</Title>
            <Overview>{tvLatestData?.results[0].overview}</Overview>
          </Banner>
          <TVSlider type={TypesTvShows.on_the_air} />
          <TVSlider type={TypesTvShows.airing_today} />
          <TVSlider type={TypesTvShows.top_rated} />
          <TVSlider type={TypesTvShows.popular} />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 24px;
`;
