import React, { useState } from "react";
import x from "../../assets/icons/x.svg";
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  BottomBar,
  Location,
  UploadImg,
} from './StoryCommonStyle';
import axios from 'axios';

function UploadVideo({ onClose }) {

  return (
    <VideoContainer>
      <TextContainer>스토리는 24시간 동안 업로드 됩니다.</TextContainer>
      <CloseButton src={x} alt="팝업 닫기" onClick={onClose} />
      <ImageContainer>
        <UploadImg>이미지 업로드</UploadImg>
      </ImageContainer>
      <BottomBar>
        <Location>
          <span>👑</span> 
          서울 강남구 
        </Location>
        <span>내가 진짜님</span>
      </BottomBar>
    </VideoContainer>
  );
}

export default UploadVideo;
