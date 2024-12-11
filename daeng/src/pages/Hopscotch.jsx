import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import ProgressBar from "../components/hopscotch/ProgressBar";
import HopscotchMap from "../components/map/HopscotchMap";
import MyLandLabel from "../components/hopscotch/MyLandLabel";
import rightarrow from "../assets/icons/arrow.svg";
import leftarrow from "../assets/icons/reversearrow.svg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
  padding-bottom: 76px;
`;

const LandContainer = styled.div`
  padding: 0px 30px;
`;

const Label = styled.p`
  padding-top: 10px;
  text-align: left;
  font-weight: bold;
`;

const Pink = styled.p`
  color: #FF69A9;
  display: inline;
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  ${(props) => (props.direction === "left" ? "left: -30px;" : "right: -30px;")}
  img {
    width: 24px;
    height: 24px;
  }
`;

const LandList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  white-space: nowrap;
  width: 100%;
  padding: 10px 0;
`;

const MyLandWrapper = styled.div`
  flex: 0 0 auto;
`;

const Hopscotch = () => {
  const { lands } = landdata.data;
  const landListRef = useRef(null);
  const [selectedArea, setSelectedArea] = useState([]);

  const scroll = (direction) => {
    if (landListRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        landListRef.current.scrollLeft -= scrollAmount;
      } else {
        landListRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const totalLands = lands.reduce((acc, land) => acc + land.cityDetails.length, 0);
 
  return (
    <Container>
      <Header label="땅따먹기" />
      <HopscotchMap removeUi={false} setSelectedArea={setSelectedArea}/>
      <LandContainer>
        {selectedArea[0]? (
          <>
            <Label>
              <Pink>{selectedArea[0]} {selectedArea[1]}</Pink> 점령까지 남은 방문횟수
            </Label>
            <ProgressBar current={1} total={selectedArea[2] || 2} />
          </>
        ):<Label>점령하고 싶은 땅을 선택해보세요</Label>}
        <Label>
          <Pink>{landdata.data.nickname}</Pink>님의 땅 목록
        </Label>
        <ScrollContainer>
          {totalLands > 3 && (
            <ArrowButton direction="left" onClick={() => scroll("left")}>
              <img src={leftarrow} alt="왼쪽 화살표" />
            </ArrowButton>
          )}
          <LandList ref={landListRef}>
            {lands.map((land) =>
              land.cityDetails.map((detail) => (
                <MyLandWrapper key={`${land.city}-${detail.cityDetail}`}>
                  <MyLandLabel region={land.city} subRegion={detail.cityDetail} />
                </MyLandWrapper>
              ))
            )}
          </LandList>
          {totalLands > 3 && (
            <ArrowButton direction="right" onClick={() => scroll("right")}>
              <img src={rightarrow} alt="오른쪽 화살표" />
            </ArrowButton>
          )}
        </ScrollContainer>
      </LandContainer>
      <Footer />
    </Container>
  );
};
  const landdata = {
    message: "success",
    data: {
      nickname: "내가 짱",
      lands: [
        {
          city: "서울",
          cityDetails: [
            {
              cityDetail: "강남구",
              count: 13,
            },
            {
                cityDetail: "중구",
                count: 13,
              },
          ],
        },
        {
            city: "서울",
            cityDetails: [
              {
                cityDetail: "강남구",
                count: 13,
              },
              {
                  cityDetail: "중구",
                  count: 13,
                },
            ],
          },
          {
            city: "서울",
            cityDetails: [
              {
                cityDetail: "강남구",
                count: 13,
              },
              {
                  cityDetail: "중구",
                  count: 13,
                },
            ],
          },
      ],
    },
    timestamp: "2024-12-11T09:58:07",
  };

export default Hopscotch;
