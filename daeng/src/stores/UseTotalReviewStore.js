import { create } from "zustand";
import axios from "axios";

const useTotalReviewStore = create((set, get) => ({
  reviews: [],
  total: 0,
  bestKeywords: [], 
  score: 0, 
  page: 0,
  isLast: false,
  isLoading: false,
  placeName: "",
  error: null, 
  sortedType: "LATEST", 

  setSortedType: (type) =>
    set({
      sortedType: type,
      page: 0,
      reviews: [],
      isLast: false,
    }),

  fetchReviews: async (placeId) => {
    const { page, sortedType, isLoading, isLast } = get();
    const size = 15; 

    if (isLoading || isLast) return;

    set({ isLoading: true, error: null });

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
    
      set((state) => ({
        reviews: page === 0 ? data.reviews : [...state.reviews, ...data.reviews],
        total: data.total,
        bestKeywords: data.bestKeywords,
        score: data.score,
        page: state.page + 1,
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