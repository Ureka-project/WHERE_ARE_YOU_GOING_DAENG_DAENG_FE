import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import pinIcon from "../../assets/icons/pin.svg";
import FavoriteList from "../commons/FavoriteList";
import houseIcon from "../../assets/icons/house.svg"
import { useNavigate } from "react-router-dom";
import useFavoriteStore from "../../stores/useFavoriteStore";
import AlertDialog from "../commons/SweetAlert";
import Loading from "../commons/Loading";
import SearchNoImage from "../../assets/icons/search_noimage.svg";

const slideUp = keyframes`
    from {
        transform: translateY(80%);
    }
    to {
        transform: translateY(0);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(78%);
    }
`;
const Overlay = styled.div`
    position: fixed;
    top: 0;
    width: 554px;
    height: 100%;
    z-index: 998;
    @media (max-width: 554px) {
        width: 100%;
    }
`;
const Modal = styled.div`
    position: fixed;
    bottom: 76px;
    width: 554px;
    height: 60%;
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.4s ease-out;
    z-index: 999;
    overflow: visible;
    -webkit-overflow-scrolling: touch;

    @media (max-width: 554px) {
        width: 100%;
        bottom: 64px;
    }
`;
const ModalTitle = styled.div`
	font-weight: bold;
	font-size: 20px;
	margin: 39px 0 0; 
`

const ModalIcon = styled.img`
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
`

const ModalContent = styled.div`
    margin: 30px 0px;
	display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: calc(100% - 120px);

    p{
        font-weight: bold;
    }
`
const BookMarkList = ({ isOpen, onClose , data, onPlaceClick, fetchNextPage, page}) => {
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();

    const observerRef = useRef(null);
    const removeFavorite  = useFavoriteStore((state) => state.removeFavorite);
    const isLoading = useFavoriteStore((state) => state.isLoading);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [isLoading, fetchNextPage]);

    const handleDelete = async (id) => {
        AlertDialog({
            mode: "confirm",
            title: "즐겨찾기 삭제",
            text: "즐겨찾기를 삭제하시겠습니까?",
            confirmText: "삭제",
            cancelText: "취소",
            onConfirm: async () => {
                await removeFavorite(id);
            }
        })
    };

    const handlePlace = (location)=> {
        onPlaceClick(location.latitude, location.longitude)
        handleClose();
    }

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 400);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return(
        <>
            <Overlay onClick={handleClose} />
            <Modal isClosing={isClosing}>
                <ModalIcon className="pin" src={pinIcon} alt="즐겨찾기" />
                <ModalTitle>즐겨찾기한 장소</ModalTitle>
                <ModalContent>
                    { isLoading && page === 0 ?(
                        <Loading />
                    ): data.length === 0 ? (
                        <p>즐겨찾기한 장소가 없습니다.</p>
                    ):(
                        <>
                            {data.map((location)=>(
                                <FavoriteList
                                    key={location.favoriteId}
                                    imgUrl={location.placeImage? location.placeImage : SearchNoImage}
                                    icon={houseIcon}
                                    title={location.name}
                                    place={location.streetAddresses}
                                    time={`영업시간 | ${location.startTime} - ${location.endTime}`}
                                    onTitleClick={()=> navigate(`/search/${location.placeId}`)}
                                    onPlaceClick={() => handlePlace(location)}
                                    onDelete={()=>handleDelete(location.favoriteId)}
                                />
                            ))}
                            <div ref={observerRef}>
                                {isLoading && page > 0 && <Loading />}
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};

BookMarkList.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
          favoriteId: PropTypes.number.isRequired,
          placeId: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          streetAddresses: PropTypes.string.isRequired,
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          startTime: PropTypes.string.isRequired,
          endTime: PropTypes.string.isRequired,
        })
    ),
    onPlaceClick: PropTypes.func.isRequired,
    fetchNextPage: PropTypes.func.isRequired,
};

export default BookMarkList;