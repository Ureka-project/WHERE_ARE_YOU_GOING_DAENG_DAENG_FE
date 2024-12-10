import React, { useState } from "react";
import ShowMyStory from "./ShowMystory";
import Detail from "./Detail";
import UploadVideo from "./UploadVideo";
import styled from "styled-components";

//테스트 버튼들
const Overlay = styled.div`
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

function StoryBtn() {
  const [currentPopup, setCurrentPopup] = useState(null); // Detail, ShowVideo 팝업 관리
  const [showUploadVideo, setShowUploadVideo] = useState(false); // UploadVideo 팝업 관리

  const handleOpenPopup = () => {
    setCurrentPopup("detail"); // 첫 번째 팝업 열기
  };

  const handleClosePopup = () => {
    setCurrentPopup(null); // 팝업 닫기
  };

  const handleNextPopup = () => {
    setCurrentPopup("showVideo"); // 두 번째 팝업 열기
  };

  const handleOpenUploadVideo = () => {
    setShowUploadVideo(true); // UploadVideo 팝업 열기
  };

  const handleCloseUploadVideo = () => {
    setShowUploadVideo(false); // UploadVideo 팝업 닫기
  };

  return (
    <>
      <button onClick={handleOpenPopup}>동영상 등록</button>

      {currentPopup === "detail" && (
        <Overlay>
          <Detail onClose={handleClosePopup} onNext={handleNextPopup} />
        </Overlay>
      )}

      {currentPopup === "showVideo" && (
        <Overlay>
          <UploadVideo onClose={handleClosePopup} />
        </Overlay>
      )}

      <button onClick={handleOpenUploadVideo}>내 스토리 조회</button> 
          
      {showUploadVideo && (
        <Overlay>
          <ShowMyStory onClose={handleCloseUploadVideo} />
        </Overlay>
      )}
    </>
  );
}//내 스토리 조회는 삭제 버튼 활성화

export default StoryBtn;
