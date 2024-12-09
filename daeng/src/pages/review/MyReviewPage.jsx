import React, { useEffect } from "react";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import ReviewForm from "../../components/review/ReviewForm";
import styled from "styled-components";
import useReviewStore from "../../stores/UseReviewStore";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;
  padding-bottom: 20%;
`;

const StyledTotalReview = styled.span`
  font-weight: bold;
  font-size: 20px;
  display: block;
  margin-right: 65%;
  margin-top: 5%;

  @media (max-width: 554px) {
    font-size: 18px;
    margin-right: 65%;
  }
`;

function MyReviewPage({ userId }) {
  const { reviews, total, fetchUserReviews, isLoading, error } = useReviewStore();

  useEffect(() => {
    fetchUserReviews(0, 15);
  }, [userId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <>
      <Header label="내 리뷰" />
      <ReviewContainer>
        <StyledTotalReview>등록한 리뷰 {total} 건</StyledTotalReview>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewForm key={review.reviewId} review={review} />
          ))
        ) : (
          <div>작성한 리뷰가 없습니다.</div>
        )}
        <Footer />
      </ReviewContainer>
    </>
  );
}


export default MyReviewPage;
