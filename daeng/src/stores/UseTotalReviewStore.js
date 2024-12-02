import { create } from "zustand";
import axios from "axios";

const useTotalReviewStore = create((set, get) => ({
  reviews: [],
  total: 0, // 총 리뷰 개수
  bestKeywords: [], // 많이 언급된 키워드
  score: 0, // 평균 별점
  page: 0, // 현재 페이지
  isLast: false, // 마지막 페이지 여부
  isLoading: false, // 로딩 상태
  placeName: "",
  error: null, // 에러 상태
  sortedType: "LATEST", // 기본 정렬 타입

  setSortedType: (type) =>
    set({
      sortedType: type,
      page: 0,
      reviews: [], // 정렬 변경 시 기존 리뷰 초기화
      isLast: false, // 새 정렬에서는 처음부터 다시 로드
    }),

  fetchReviews: async (placeId) => {
    const { page, sortedType, isLoading, isLast } = get();
    const size = 15; // 고정된 페이지 크기
    

    if (isLoading || isLast) return; // 중복 요청 방지 및 마지막 페이지 처리

    set({ isLoading: true, error: null }); // 로딩 상태 활성화

    try {
      const response = await axios.get(
        `https://www.daengdaeng-where.link/api/v1/reviews/place/${placeId}/${sortedType}?page=${page}&size=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data.data;
      const firstReview = data.reviews.length > 0 ? data.reviews[0] : null;

      set((state) => ({
        reviews: page === 0 ? data.reviews : [...state.reviews, ...data.reviews],
        total: data.total,
        bestKeywords: data.bestKeywords,
        score: data.score,
        page: state.page + 1, // 다음 페이지를 위해 증가
        placeName: firstReview?.placeName || state.placeName, 
        isLast: data.isLast,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "리뷰 데이터를 가져오는 데 실패했습니다.";
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default useTotalReviewStore;