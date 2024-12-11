import React, { useState, useEffect } from "react";
import flag from "../../assets/icons/flag.svg";
import styled, { keyframes } from "styled-components";

// 애니메이션 정의
const fillAnimation = (progress) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${progress}%;
  }
`;

const GaugeContainer = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  margin: 30px auto;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
`;

const BarBackground = styled.div`
  flex: 1;
  height: 15px;
  border-radius: 10px;
  background: #f0f0f0;
  position: relative;
`;

const Bar = styled.div`
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(to right, #d8b4fe, #ff7eb3);
  animation: ${(props) => fillAnimation(props.progress)} 1s ease-out forwards;
`;

const NumberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
`;

const NumberText = styled.span`
  font-size: 13px;
  font-weight: bold;
  position: relative;
  transform: translateX(-50%);
`;

const CurrentText = styled.div`
  font-size: 13px;
  font-weight: bold;
  position: absolute;
  top: 20px;
  left: ${(props) => props.progress}%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const FlagIcon = styled.img`
  position: absolute;
  top: -30px;
  right: -23px;
  width: 40px;
`;

const ProgressBar = ({ current, total }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetProgress = (current / total) * 100;
    setProgress(targetProgress);
  }, [current, total]);

  return (
    <GaugeContainer>
      <BarContainer>
        <BarBackground>
          <Bar progress={progress} />
          <CurrentText progress={progress}>{current}</CurrentText>
        </BarBackground>
        <FlagIcon src={flag} alt="깃발" />
      </BarContainer>

      <NumberContainer>
        <NumberText style={{ left: "0%" }}>0</NumberText>
        <NumberText style={{ right: "0%", position: "absolute" }}>{total}</NumberText>
      </NumberContainer>
    </GaugeContainer>
  );
};

export default ProgressBar;
