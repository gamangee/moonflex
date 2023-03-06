import { AnimatePresence, motion, useScroll } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTvShows, IGetTVResult } from '../api';
import { makeImagePath, TypesTvShows } from '../utils';

const rowVariants = {
  hidden: (goRight: number) => ({
    x: goRight > 0 ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (goRight: number) => ({
    x: goRight > 0 ? -window.outerWidth : window.outerWidth,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

export default function TVSlider({ type }: { type: TypesTvShows }) {
  const navigate = useNavigate();
  const bigTVMatch: PathMatch<string> | null = useMatch(
    `/moonflix/tv/${type}/:tvId`
  );
  const { data } = useQuery<IGetTVResult>(['tvshows', type], () =>
    getTvShows(type)
  );
  const { scrollY } = useScroll();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [goRight, setGoRight] = useState(0);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = (isNext: boolean) => {
    if (data) {
      if (leaving) return;
      setGoRight(isNext ? 1 : -1);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) =>
        isNext
          ? prev === maxIndex
            ? 0
            : prev + 1
          : prev === 0
          ? maxIndex
          : prev - 1
      );
    }
  };

  const onBoxClicked = (tvId: number, type: string) => {
    navigate(`/moonflix/tv/${type}/${tvId}`);
  };

  const onOverlayClick = () => navigate('/moonflix/tv');

  const clickedMovie =
    bigTVMatch?.params.tvId &&
    data?.results.find((tv) => tv.id === +bigTVMatch.params.tvId!);

  const offset = 6;

  return (
    <>
      <Sliders>
        <Title>
          {type === TypesTvShows.airing_today
            ? 'ariring today'
            : type === TypesTvShows.on_the_air
            ? 'on the air'
            : type === TypesTvShows.popular
            ? 'popualr'
            : type}
        </Title>
        <PrevBtn onClick={() => increaseIndex(false)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z' />
          </svg>
        </PrevBtn>
        <NextBtn onClick={() => increaseIndex(true)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z' />
          </svg>
        </NextBtn>
        <AnimatePresence
          custom={goRight}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={goRight}
            variants={rowVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ type: 'tween', duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={tv.id + '' + type}
                  onClick={() => onBoxClicked(tv.id, type)}
                  key={tv.id}
                  whileHover='hover'
                  initial='normal'
                  variants={boxVariants}
                  transition={{ type: 'tween' }}
                  bgphoto={
                    !tv.backdrop_path
                      ? '/data/no_img.png'
                      : makeImagePath(tv.backdrop_path, 'w500')
                  }
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Sliders>
      <AnimatePresence>
        {bigTVMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={bigTVMatch.params.tvId + type}
            >
              {clickedMovie && (
                <>
                  <BigCover>
                    <BigImg
                      src={
                        !clickedMovie.backdrop_path
                          ? '/data/no_img.png'
                          : makeImagePath(clickedMovie.backdrop_path, 'w500')
                      }
                    />
                    {!clickedMovie.backdrop_path && (
                      <ErrorText>
                        Sorry, We don't have a poster image.
                      </ErrorText>
                    )}
                    <DeleteBtn onClick={onOverlayClick}>
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        height='28px'
                        width='28px'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path fill='none' d='M0 0h24v24H0z'></path>
                        <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
                      </svg>
                    </DeleteBtn>
                  </BigCover>
                  <BigText>
                    <BigTitle>{clickedMovie.name}</BigTitle>
                    <BigInfo>
                      <BigRate>평점 : {clickedMovie.vote_average}</BigRate>
                      <BigRelease>
                        방영일 : {clickedMovie.first_air_date}
                      </BigRelease>
                    </BigInfo>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                  </BigText>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const Sliders = styled.div`
  position: relative;
  height: 200px;
  top: -100px;
  margin-bottom: 100px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-left: 10px;
  color: ${(props) => props.theme.white.lighter};
  text-transform: uppercase;
  margin-bottom: 15px;
`;

const PrevBtn = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: transparent;
  fill: rgba(255, 255, 255, 0.3);
  &:hover {
    fill: rgba(255, 255, 255, 1);
    scale: 1.1;
  }
  z-index: 1;
  top: 50%;
  left: 1%;
  transform: translateY(80%);
`;

const NextBtn = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: transparent;
  fill: rgba(255, 255, 255, 0.3);
  &:hover {
    fill: rgba(255, 255, 255, 1);
    scale: 1.1;
  }
  z-index: 1;
  top: 50%;
  right: 1%;
  transform: translateY(80%);
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  margin-bottom: 10px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  z-index: 90;
  position: absolute;
  width: 40vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.4);
`;

const BigCover = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const ErrorText = styled.h1`
  position: absolute;
  bottom: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  color: #ffffff;
  text-align: center;
`;

const BigImg = styled.img`
  width: 100%;
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 1em;
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
`;

const BigText = styled.div`
  padding: 50px 30px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 35px;
  margin-bottom: 20px;
`;

const BigInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 20px;
  margin-bottom: 20px;
`;

const BigRate = styled.div``;

const BigRelease = styled.div``;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
`;
