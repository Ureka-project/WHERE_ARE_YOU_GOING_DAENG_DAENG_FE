import styled from "styled-components";
import PropTypes from "prop-types";
import UploadStoryBtn_DefaultImg from "../../assets/icons/UploadStoryBtn_DefaultImg.svg";
import UploadStoryBtnCrown from "../../assets/icons/UploadStoryBtn_crown.svg";

const UploadStoryBtn = ({ location, nickname, isPinkBorder, imageSrc }) => {
  return (
    <ButtonContainer>
      <ImageContainer isPinkBorder={isPinkBorder}>
        <ProfileImageWrapper>
          <ProfileImage src={imageSrc || UploadStoryBtn_DefaultImg} alt="프로필 이미지" />
        </ProfileImageWrapper>
        <CrownIcon src={UploadStoryBtnCrown} alt="왕관 아이콘" />
      </ImageContainer>
      <TextContainer>
        <LocationText>{location}</LocationText>
        <NicknameText>{nickname}</NicknameText>
      </TextContainer>
    </ButtonContainer>
  );
};

UploadStoryBtn.propTypes = {
  location: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  isPinkBorder: PropTypes.bool,
  imageSrc: PropTypes.string,
};

UploadStoryBtn.defaultProps = {
  isPinkBorder: false,
  imageSrc: null,
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 150px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${({ isPinkBorder }) =>
    isPinkBorder
      ? "linear-gradient(45deg, #FF4B98 0%, #E7B1FF 52%, #FF4B98 100%)"
      : "#d9d9d9"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  width: 77px;
  height: 77px;
  border-radius: 50%;
  border: 6px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ProfileImage = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 50%;
`;

const CrownIcon = styled.img`
  position: absolute;
  top: -12px;
  right: 14.5px;
  width: 25px;
  height: auto;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 12px;
`;

const LocationText = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin: 0;
  color: black;
`;

const NicknameText = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin: 0;
  color: #ff69b4;
`;

export default UploadStoryBtn;
