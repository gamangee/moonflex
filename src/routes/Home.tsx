import React from 'react';
import { useQuery } from 'react-query';
import { getMovies, IGetMovieResult } from '../api';
import { makeImagePath, TypesMovies } from '../utils';
import Slider from '../components/Slider';
import styled from 'styled-components';

export default function Home() {
  const { data: nowPlayingData, isLoading: loadingNowPlaying } =
    useQuery<IGetMovieResult>(['movies', 'nowPlaying'], () =>
      getMovies(TypesMovies.now_playing)
    );

  return (
    <Wrapper>
      {loadingNowPlaying && <Loader>Loading...</Loader>}
      {!loadingNowPlaying && (
        <>
          <Banner
            bgphoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ''
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          <Slider type={TypesMovies.now_playing} />
          <Slider type={TypesMovies.popular} />
          <Slider type={TypesMovies.top_rated} />
          <Slider type={TypesMovies.upcoming} />
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
