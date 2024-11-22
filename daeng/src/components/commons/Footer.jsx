import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import footerHome from "../../assets/icons/footer_home.svg";
import footerHoverHome from "../../assets/icons/footer_hover_home.svg";
import footerSearch from "../../assets/icons/footer_search.svg";
import footerHoverSearch from "../../assets/icons/footer_hover_search.svg";
import footerBookmark from "../../assets/icons/footer_bookmark.svg";
import footerHoverBookmark from "../../assets/icons/footer_hover_bookmark.svg";
import footerVisiting from "../../assets/icons/footer_visiting.svg";
import footerHoverVisiting from "../../assets/icons/footer_hover_visiting.svg";
import footerMypage from "../../assets/icons/footer_mypage.svg";
import footerHoverMypage from "../../assets/icons/footer_hover_mypage.svg";

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 554px;
    height: 77px;
    z-index: 1000;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;

    @media (max-width: 554px) {
        height: 64px;
        padding: 0 10px;
    }
`;

const FooterItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 110px;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;

        @media (max-width: 554px) {
            width: 20px;
            height: 20px;
        }
    }

    span {
        margin-top: 4px;
        font-size: 12px;
        font-weight: bold;
        color: ${(props) => (props.isActive || props.isHovered ? "#ff4b98" : "#d9d9d9")};

        @media (max-width: 554px) {
            font-size: 10px;
        }
    }

    &:hover {
        span {
            color: #ff4b98;
        }
    }
`;

const items = [
    { icon: footerHome, hoverIcon: footerHoverHome, label: "홈", path: "/" },
    { icon: footerSearch, hoverIcon: footerHoverSearch, label: "검색", path: "/search" },
    { icon: footerBookmark, hoverIcon: footerHoverBookmark, label: "즐겨찾기" },
    { icon: footerVisiting, hoverIcon: footerHoverVisiting, label: "방문 일정" },
    { icon: footerMypage, hoverIcon: footerHoverMypage, label: "마이페이지", path: "/my-page" },
];

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const [activeIndex, setActiveIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // 현재 경로에 따라 활성화 상태 업데이트
    useEffect(() => {
        const currentIndex = items.findIndex((item) => item.path === location.pathname);
        setActiveIndex(currentIndex);
    }, [location.pathname, items]);

    return (
        <FooterContainer>
            {items.map((item, index) => (
                <FooterItem
                    key={index}
                    isActive={activeIndex === index}
                    isHovered={hoveredIndex === index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                        setActiveIndex(index);
                        navigate(item.path);
                    }}
                >
                    <img
                        src={
                            hoveredIndex === index || activeIndex === index
                                ? item.hoverIcon
                                : item.icon
                        }
                        alt={item.label}
                    />
                    <span>{item.label}</span>
                </FooterItem>
            ))}
        </FooterContainer>
    );
};

export default Footer;
