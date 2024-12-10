import { useState, useEffect } from "react";
import styled from "styled-components";
// import survey_banner from "../../assets/icons/survey_banner.jpg";
import festival_banner from "../../assets/icons/festival_banner.jpg";
import banner1 from '../../assets/icons/banner1.jpg';
import banner2 from "../../assets/icons/banner2.jpg";
import { useNavigate } from "react-router-dom";

function HomeSlider() {
  const navigate = useNavigate();
  const slides = [festival_banner, banner1, banner2]; 
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleSlideClick = (index) => {
    if (slides[index] === banner1 || slides[index] === banner2) {
      navigate("/how-to-guide"); 
    } else {
      navigate("/event"); 
    }
  };

  return (
    <SliderWrapper>
      <SlidesContainer currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <Slide key={index} src={slide} alt={`Slide ${index + 1}`} onClick={() => handleSlideClick(index)}  />
        ))}
      </SlidesContainer>
      <DotsWrapper>
        {slides.map((_, index) => (
          <Dot
            key={index}
            isActive={currentSlide === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsWrapper>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;

  aspect-ratio: 554 / 189;

  @media (max-width: 554px) {
    aspect-ratio: 414 / 140;
  }
`;

const SlidesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  flex-shrink: 0;
  cursor: pointer;


`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;

  @media (max-width: 554px) {
    gap: 5px;
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#ff69b4" : "#D0D0D8")};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff69b4;
  }

  @media (max-width: 554px) {
    width: 6px;
    height: 6px;
  }
`;

export default HomeSlider;
