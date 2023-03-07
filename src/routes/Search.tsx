import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getSearch,
  IGetSearch,
  IGetSearchResult,
  ISearch,
  ISearchList,
} from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { AnimatePresence, motion } from 'framer-motion';
import SearchSlider from '../components/SearchSlider';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const id = new URLSearchParams(location.search).get('id');
  const type = new URLSearchParams(location.search).get('type');

  const { isLoading, data } = useQuery<IGetSearch>(['search', keyword], () =>
    getSearch(keyword || '')
  );

  const onClick = (id: string, media_type: string) => {
    navigate(`/moonflix/search?query=${keyword}&id=${id}&type=${media_type}`);
  };

  return (
    <Wrapper>
      {isLoading && <Loader>loading...</Loader>}
      <SearchResult>{keyword} 검색 결과</SearchResult>
      <Boxs>
        {data?.results?.map((result) => (
          <Box
            key={result.id}
            layoutId={result.id + ''}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'tween' }}
            onClick={() => onClick(result.id + '', result.media_type)}
          >
            <ImgCover>
              <Img
                src={
                  result.poster_path === null
                    ? 'data/no_img.png'
                    : makeImagePath(result.poster_path || '')
                }
                alt={result.title === null ? '이미지없음' : result.title}
              />
            </ImgCover>
          </Box>
        ))}
      </Boxs>
      <AnimatePresence>
        {id && type && (
          <SearchSlider
            dataId={+id}
            listType={'searchItem'}
            requestUrl={type}
          />
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 80px 0;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchResult = styled.h1`
  text-align: center;
  font-size: 25px;
  margin-bottom: 30px;
`;

const Boxs = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  place-items: center;
`;

const Box = styled(motion.div)`
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const ImgCover = styled.div`
  width: 200px;
  height: 350px;
`;

const Img = styled.img`
  width: 100%;
`;
