import HomeHeader from "../components/Home/HomeHeader";
import HomeSlider from "../components/Home/HomeSlider";
import HomeStory from "../components/Home/HomeStory";
import HomeDogPlaces from "../components/Home/HomeDogPlaces";
import HomeTrendingPlaces from "../components/Home/HomeTrendingPlaces";
import HomeSanta from "../components/Home/HomeSanta";
import HomeLogout from "../components/Home/HomeLogout";
import HomeRecommendPlaces from "../components/Home/HomeRecommendPlaces";
import HomeKeywordPlaces from "../components/Home/HomeKeywordPlaces";
import Wrapper from "../components/Home/HomeWrapper";
import Footer from "../components/commons/Footer";
import useLocationStore from "../stores/useLocationStore";
import AlertDialog from "../components/commons/SweetAlert";
import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import axios from "axios";

function Home() {
  const userLocation = useLocationStore((state) => state.userLocation);
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const setLoginData = useUserStore((state) => state.setLoginData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatusInCookie = () => {
    const cookies = document.cookie.split("; ");
    const loginSuccessCookie = cookies.find((cookie) => cookie.startsWith("loginSuccess="));

    if (loginSuccessCookie) {
      const value = loginSuccessCookie.split("=")[1];
      return value === "true";
    }

    return false;
  };

  useEffect(() => {
    const loginStatus = checkLoginStatusInCookie();
    setIsLoggedIn(loginStatus);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (
            userLocation.lat !== newLocation.lat ||
            userLocation.lng !== newLocation.lng
          ) {
            setUserLocation(newLocation);
          }
        },
      );
    }
  }, [userLocation]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://www.daengdaeng-where.link/api/v1/user/adjust", {
        withCredentials: true,
      });
      const { user } = response.data.data;

      setLoginData(user);
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "데이터 불러오기 실패",
        text: "사용자 정보를 불러오는 데 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  return (
    <Wrapper>
      <HomeHeader />
      <HomeSlider />
      <HomeStory />
      {isLoggedIn ? <HomeDogPlaces /> : <HomeLogout />}
      <HomeTrendingPlaces />
      <HomeSanta />
      <HomeRecommendPlaces />
      <HomeKeywordPlaces />
      <Footer />
    </Wrapper>
  );
}

export default Home;