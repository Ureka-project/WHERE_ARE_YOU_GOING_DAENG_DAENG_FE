import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const VideoContainer = styled.div`
  width: 500px;
  height: 90%;
  border-radius: 10px;
  padding-top: 10px;
  background-color: #fdf2f8;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 554px) {
    width: 80%;
    height: 80%;
  }
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 17px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const TextContainer = styled.div`
  color: #b3b3b3;
  font-size: 14px;
  text-align: center;
  margin-top: 40px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const BottomBar = styled.div`
  text-align: center;
  font-size: 14px;
  color: #ff69b4;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  padding-bottom: 30px;
  border-radius: 10px;
  align-items: center;
  background-color: #fdf2f8;

  & > span {
    font-size: 16px;
    font-weight: bold;
    color: #ff69b4;
  }

  & > div {
    font-size: 14px;
    color: #333;
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  & > span {
    font-size: 16px;
    font-weight: bold;
    color: #ffd700;
  }
`;

export const UploadImg = styled.div`
  cursor: pointer;
`;
