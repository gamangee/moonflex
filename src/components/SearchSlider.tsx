import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getDetailData, IGetDetail } from '../api';
import { makeImagePath } from '../utils';

interface ISearch {
  dataId?: number;
  listType: string;
  menuName?: string;
  requestUrl: string;
}

export default function SearchModal({ dataId, listType, requestUrl }: ISearch) {
  const navigate = useNavigate();

  const { data } = useQuery<IGetDetail>(['search', dataId], () =>
    getDetailData(dataId + '', requestUrl)
  );

  const onOverlayClicked = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      <Overlay onClick={onOverlayClicked} />
      <Container layoutId={dataId + listType}>
        <Cover>
          <Img
            src={
              data?.backdrop_path === null
                ? 'data/no_img.png'
                : makeImagePath(data?.backdrop_path || '')
            }
          />
        </Cover>
        <Contents>
          <Title>{data?.title || data?.name}</Title>
          <Info>
            <Pop>평점 : {data?.vote_average}</Pop>
            <Date>개봉일 :{data?.first_air_date || data?.release_date}</Date>
          </Info>
          <Overview>{data?.overview}</Overview>
        </Contents>
      </Container>
    </AnimatePresence>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  position: fixed;
  top: 100px;
  width: 50vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
`;

const Cover = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
`;

const Contents = styled.div`
  padding: 40px 30px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Overview = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Pop = styled.div``;

const Date = styled.div``;
