import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PreferenceFavoriteOptionList from "./PreferenceFavoriteOptionList";
import star from "../../assets/icons/star.svg";
import notfillstar from "../../assets/icons/notfillstar.svg";
import addImg from "../../assets/icons/addImg.svg";
import axios from "axios";
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import AlertDialog from '../../components/commons/SweetAlert';
import usePetStore from "../../stores/usePetStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";
import reviewDefaultImg from '../../assets/icons/reviewDefaultImg.svg'


const TotalReviewContainer = styled.div`
  padding:3%;
`

const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  position: relative;
`;

const PlaceTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  margin-bottom: 27px;
  margin-left:3%;


  @media (max-width: 554px) {
    font-size: 20px;
    margin-left:20px;
    margin-bottom: 15px;
  }
`;

const WriteReviewDate = styled.span`
  position: absolute; 
  right: 20px; 
  top: 0; 
  color: #b3b3b3;
  font-size: 18px;

  @media (max-width: 554px) {
    font-size: 15px;
    top: 5px; 
  }
`;


const SelectPlaceOptionContainer = styled.div`
  width: auto;
  height: 90%;
  text-align: left;
  padding: 5%;
  border-radius:10px;

  background-color: #F7F7F7;

  @media (max-width: 554px) {
    padding:7%;
  }
`;

const WhatPointLike = styled.span`
  font-size: 20px;
  color: #333;
  font-weight: 600;

  @media (max-width: 554px) {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const SelectWarning = styled.span`
  color: #ff69a9;
  font-size: 15px;

  @media (max-width: 554px) {
    width: 95%;
    margin-left: 10px;
    font-size: 13px;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5%;
  align-items: center;
`;

const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
  border: none;


  @media (max-width: 554px) {
    margin-top: 2%;
  }
`;

const UserNickname = styled.span`
  font-size: 20px;
  color: #333;
  font-weight: bold;

  @media (max-width: 554px) {
    margin-top: 2%;
  }
`;

const UserQuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
`;


const Question = styled.span`
  font-size: 18px;

  p {
    display: inline-block;
    font-size: 15px;
    color: #d9d9d9;
    margin-left: 5px;
  }

  @media (max-width: 554px) {
      font-size: 14px; 
      margin-left: 0; 
      margin-right: 4px;
      display: block;
      text-wrap:nowrap;
    }
`;

const DateSelection = styled.input`
  width: 50%;
  height: 40px;
  padding: 10px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  padding-right: 1%;
  font-size: 15px;
  cursor: pointer;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }
`;

const StarContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

const StyleStar = styled.img`
  width: 20px;
  margin-right: 5px;
  cursor: pointer;
`;

const AddImgContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const AddImg = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  color: #d9d9d9;
  background-image: url(${(props) => props.src || "none"});
  background-size: cover;
  background-position: center;

  input {
    display: none;
    cursor: pointer;
  }
  
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
  }


  label {
    font-size: 12px;
    cursor: pointer;
  }


  .add-img-button {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const SecondContainer = styled.div`
  padding:3%;
`
const LastContainer = styled.div`
  margin-bottom: 15%;
  margin-left:1%;
  align-items: center;

  @media (max-width: 554px) {
    margin-bottom: 25%;
    align-items: center;
  }
`
const QuestionBox = styled.span`
  font-size: 18px;
  display: inline; 
  color: #333;

  p {
    display: inline-block;
    font-size: 13px;
    color: #D9D9D9;
    margin-left: 5px;
  }
`

const CountText = styled.span`
  font-size: 15px;
  color: #FF0000;
  margin-top:3px;
  margin-right:10px;
`

const TextDescriptionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-bottom: -12px;
  justify-content: space-between;  
  align-items: center;  
`
const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top:20px;
  margin-right:10px;
  margin-bottom:29px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 400px; 
  border: none;
  padding: 5px;
  resize: none; 
  font-size:15px;
  line-height: 1.5; 

  &:focus {
    outline: none;    
    border: none;  
    box-shadow: none;
  }

  @media (max-width: 554px) {
    min-height: 50px;
  }
`;

const AddImgPlus = styled.span`
  width:1px;
`

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "0.5px solid #ff69a9" : "0.5px solid #d9d9d9",
    borderRadius: "5px",
    padding: "2px",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      borderColor: "#ff69a9",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#ffcee1",
    borderRadius: "3px",
    padding: "2px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ff4b98",
      color: "white", 
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "5px",
    borderColor: "#ff69a9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f4f4f4" : "white",
    color: "#333",
    cursor: "pointer",
  }),
};


const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


function WriteReview({ review = {} }) {
  const { placeId } = useParams();
  const [nickname, setNickname] = useState("");
  const [placeName, setPlaceName] = useState("장소 이름 없음");

  useEffect(() => {
    const fetchUserNickname = async () => {
      try {
        const response = await axios.get("https://www.daengdaeng-where.link/api/v1/user/adjust", {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const userNickname = response.data?.data?.user?.nickname || "닉네임 없음";
        setNickname(userNickname);
      } catch (error) {
        console.error("Failed to fetch user nickname:", error);
        setNickname("닉네임 없음");
      }
    };

    fetchUserNickname();
  }, []);

  useEffect(() => {
    if (placeId) {
      axios
        .get(`https://www.daengdaeng-where.link/api/v1/places/${placeId}`)
        .then((response) => {
          const name = response.data?.data?.name; 
          setPlaceName(name || "장소 이름 없음"); 
        })
        .catch((error) => {
          console.error("Failed to fetch place name:", error);
          setPlaceName("장소 이름 없음");
        });
    }
  }, [placeId]);

  const placeIdValue = review?.placeId || placeId;

  if (!placeIdValue) {
    return <div>장소 정보를 가져올 수 없습니다.</div>;
  }

  const navigate = useNavigate();
  const { pets, fetchPetList } = usePetStore();
  const [selectPet, setSelectPet] = useState([]);
  const [ratings, setRatings] = useState([false, false, false, false, false]);
  const [previews, setPreviews] = useState([]);
  const [placeImgs, setPlaceImgs] = useState([]);
  const [selectKeywords, setSelectKeywords] = useState([]); 
  const [text, setText] = useState("");
  const [visitedAt, setVisitedAt] = useState("");
  const [selectedPetImage, setSelectedPetImage] = useState("");

  
  useEffect(() => {
    fetchPetList(); 
  }, [fetchPetList]);

  const petOptions = pets.map((pet) => ({
    value: pet.petId,
    label: pet.name,
    image: pet.image,
  }));
  
const handlePetSelection = (selectedOptions) => {
  setSelectPet(selectedOptions);

  if (selectedOptions.length > 0) {
    setSelectedPetImage(selectedOptions[0].image); 
  } else {
    setSelectedPetImage(""); 
  }
};

const handleFocus = (e) => {
  e.target.showPicker();
};

  if (!placeId) {
    return <div>장소 정보를 불러오는 데 실패했습니다.</div>;
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = previews.length + files.length;
  
    if (totalImages > 5) {
      AlertDialog({
        mode: "alert",
        title: "이미지 업로드 제한",
        text: "최대 5개의 이미지만 업로드할 수 있습니다.",
        confirmText: "확인",
      });
      return;
    }
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("video/")) {
          setPreviews((prev) => [
            ...prev,
            { type: "video", src: reader.result, name: file.name },
          ]);
        } else if (file.type.startsWith("image/")) {
          setPreviews((prev) => [
            ...prev,
            { type: "image", src: reader.result, name: file.name },
          ]);
        }
      };
      reader.readAsDataURL(file);
  
      setPlaceImgs((prev) => [...prev, file]);
    });
  };

  const handleStarClick = (index) => {
    const newRatings = [...ratings];
    for (let i = 0; i <= index; i++) {
      newRatings[i] = true;
    }

    for (let i = index + 1; i < newRatings.length; i++) {
      newRatings[i] = false;
    }
    setRatings(newRatings);
  };
  const handleRemoveImage = (index) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const maxLength = 500;
    const value = e.target.value;
  
    if (value.length > maxLength) {
      AlertDialog({
        mode: "alert",
        title: "선택 제한",
        text: `최대 ${maxLength}자까지만 작성 가능합니다.`,
        confirmText: "닫기" 
      });
      return;
    }   
    setText(value); 
  };

  const validateForm = () => {

    if (selectKeywords.length === 0) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "최소 하나 이상의 키워드를 선택해주세요.",
        confirmText: "확인"
      });
      return false;
    }

    if (selectPet.length === 0) { 
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "함께한 펫을 선택해주세요.",
        confirmText: "확인",
      });
      return false;
    }
  
    if (!visitedAt) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "방문한 날짜를 선택해주세요.",
        confirmText: "확인"
      });
      return false;
    }
  
    if (!ratings.filter(Boolean).length) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "별점을 선택해주세요.",
        confirmText: "확인"
      });
      return false;
    }
  
    if (!text.trim()) {
      AlertDialog({
        mode: "alert",
        title: "등록 실패",
        text: "리뷰 내용을 작성해주세요.",
        confirmText: "확인"
      });
      return false;
    }
  
    return true;
  };

  const uploadMedia = async (files) => {
  const uploadedUrls = [];
  for (const file of files) {
    try {
      const presignResponse = await axios.post(
        'https://www.daengdaeng-where.link/api/v1/S3',
        {
          prefix: 'REVIEW',
          fileNames: [file.name]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      const presignedUrl = presignResponse.data?.data?.[file.name];
      if (!presignedUrl) {
        throw new Error("Presigned URL을 받지 못했습니다");
      }

      const uploadResponse = await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        withCredentials: true,
      });

      if (uploadResponse.status === 200) {
        const uploadedUrl = presignedUrl.split("?")[0]; 
        uploadedUrls.push(uploadedUrl); 
      }
    }catch(error) {
        console.error(`파일 업로드 실패: ${file.name}`, error);
      }
  }
    return uploadedUrls;
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if (!validateForm()) return;
    
    let media = [];
    if (placeImgs.length > 0) {
      media = await uploadMedia(placeImgs);
    }
  
    const pets = selectPet.map((pet) => pet.value);

    const reviewData = {
      placeId,
      content: text.trim(), 
      score: ratings.filter(Boolean).length, 
      media, 
      keywords: selectKeywords, 
      pets,
      visitedAt, 
    };

    try {
      const response = await axios.post("https://www.daengdaeng-where.link/api/v1/review", reviewData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
      });

      AlertDialog({
        mode: "alert",
        title: "성공",
        text: `리뷰가 성공적으로 등록되었습니다.`,
        confirmText: "닫기",
        icon: "success",
        onConfirm: () => {
          navigate(`/total-review/${placeId}`);
          setTimeout(() => {
            window.location.reload(); 
          }, ); 
        },
      });
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "실패",
        text: `리뷰 등록에 실패했습니다.`,
        confirmText: "닫기" 
      });
      console.error("리뷰 등록 실패:", error);
    }
  };

  return (
    <TotalReviewContainer>
      <WriteReviewContainer>
      <PlaceTitle>{placeName}</PlaceTitle>
        <WriteReviewDate>{getCurrentDate()}</WriteReviewDate>
      </WriteReviewContainer>
      <SelectPlaceOptionContainer>
        <WhatPointLike>어떤 점이 좋았나요?</WhatPointLike>
        <br />
        <SelectWarning>*이 장소에 맞는 키워드를 골라주세요 (1개~3개)</SelectWarning>
      <PreferenceFavoriteOptionList
        selectedOptions={selectKeywords}
        onSelectOptions={setSelectKeywords}
      />
      </SelectPlaceOptionContainer>
      <SecondContainer>
        <UserInfoContainer>
        <UserImg
          src={selectedPetImage || reviewDefaultImg}
          alt="선택된 펫 이미지" 
        />
        <UserNickname>{nickname || '닉네임을 가져오는 중...'}</UserNickname>
        </UserInfoContainer>
        <UserQuestionContainer>
        <Question>댕댕이를 선택해주세요</Question>
        <Select
          isMulti
          options={petOptions}
          value={selectPet}
          onChange={handlePetSelection}
          styles={selectStyles}
          placeholder="댕댕이를 선택해주세요"
        />
        </UserQuestionContainer>

        <UserQuestionContainer>
          <Question>방문한 날짜를 선택해주세요</Question>
          <DateSelection
            type="date"
            max={getCurrentDate()}
            value={visitedAt} 
            onFocus={handleFocus}  
            onChange={(e) => setVisitedAt(e.target.value)} 
          />
          </UserQuestionContainer>
          <UserQuestionContainer>
            <Question>별점을 눌러 만족도를 공유해주세요</Question>
              <StarContainer>
                {[...Array(5)].map((_, index) => (
                  <StyleStar
                    key={index}
                    src={ratings[index] ? star : notfillstar}
                    alt="리뷰 작성하기 별점"
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </StarContainer>
            </UserQuestionContainer>
          <UserQuestionContainer>
            <Question>사진 / 동영상 업로드 <p>(선택)</p></Question>
          </UserQuestionContainer>
          <AddImgContainer>
          {previews.map((preview, index) => (
            <AddImg key={index} src={preview.src}>
              {preview.type === "video" ? (
                <video width="130" height="130" controls>
                  <source src={preview.src} type="video/mp4" />
                </video>
              ) : (
                <img src={preview.src} alt={`미리보기 이미지 ${index}`} />
              )}
              <RemoveButton onClick={() => handleRemoveImage(index)}>X</RemoveButton>
              </AddImg>
            ))}
            <AddImg>
              <label htmlFor="file-upload">
                <br />
                <AddImgPlus src={addImg} alt="이미지 업로드"/>
                사진 / 동영상
                <br /> 업로드
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                onChange={handleImageUpload}
                multiple
              />
            </AddImg>
          </AddImgContainer>
          <TextDescriptionContainer>
        <QuestionBox>리뷰를 작성해주세요</QuestionBox>
        <CountText>{text.length}자 | 최대 500자</CountText>
      </TextDescriptionContainer>
      <DivisionLine />
      <TextArea type='text' placeholder='경험을 공유해주세요' value={text} onChange={handleChange}/>
      <DivisionLine />
      <LastContainer>
      <ConfirmBtn onClick={handleSubmit}  label="작성 완료" />
      </LastContainer>
      </SecondContainer>
    </TotalReviewContainer>
    );
  }

export default WriteReview;