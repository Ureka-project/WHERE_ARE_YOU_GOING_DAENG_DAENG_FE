import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { requestNotificationPermission } from "../../firebase/firebaseMessaging";
import AlertDialog from "../commons/SweetAlert";
import axios from "axios";
import { pushAgree } from "../../data/CommonCode";
import AlarmList from "./AlarmList";

const AlarmContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: auto;
  padding: 30px 20px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #f2f2f2;
  background: linear-gradient(to bottom, #fff, #f9f9f9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  border-radius: 8px;
  color: #fff;
  background-color: ${({ isSubscribed }) => (isSubscribed ? "#FFC1DA" : "#FF69A9")};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSubscribed }) =>
      isSubscribed ? "#FFD7EB" : "#FF4580"};
  }
`;

const AlarmBox = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPushType] = useState(pushAgree[0].code);
  
  useEffect(() => {
    const fetchNotificationConsent = async () => {
      try {
        const response = await axios.get(
          "https://www.daengdaeng-where.link/api/v1/notifications/consent",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsSubscribed(response.data.data.isNotificationConsent);
        } else {
          console.error("알림 활성화 상태 확인 실패:", response);
        }
      } catch (error) {
        console.error("알림 활성화 상태 요청 중 오류:", error);
      }
    };

    fetchNotificationConsent();
  }, []);

  const handleNotificationRequest = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        const response = await axios.post(
          "https://www.daengdaeng-where.link/api/v1/notifications/pushToken",
          {
            token,
            pushType: selectedPushType,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setIsSubscribed(true);
          AlertDialog({
            mode: "alert",
            title: "알림 활성화 성공",
            text: "알림이 성공적으로 활성화되었습니다.",
            confirmText: "확인",
            icon: "success",
          });
        } else {
          console.error("알림 활성화 실패:", response);
        }
      }
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "알림 활성화 요청 중 문제가 발생했습니다.",
        confirmText: "닫기",
        icon: "error",
      });
    }
  };

  const handleCancelNotification = async () => {
    try {
      const response = await axios.delete(
        "https://www.daengdaeng-where.link/api/v1/notifications",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsSubscribed(false);
        AlertDialog({
          mode: "alert",
          title: "알림 비활성화 성공",
          text: "알림이 성공적으로 비활성화되었습니다.",
          confirmText: "확인",
          icon: "success",
        });
      } else {
        console.error("알림 비활성화 실패:", response);
      }
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "알림 비활성화 요청 중 문제가 발생했습니다.",
        confirmText: "닫기",
        icon: "error",
      });
    }
  };

  return (
    <>
    <AlarmContainer>
      <ToggleButton
        isSubscribed={isSubscribed}
        onClick={isSubscribed ? handleCancelNotification : handleNotificationRequest}>
      {isSubscribed ? "알림 그만 받기" : "알림 받기"}
      </ToggleButton>
      <p>{isSubscribed ? "현재 알림이 활성화된 상태입니다." : "현재 알림이 비활성화된 상태입니다."}</p>
    </AlarmContainer>
      {isSubscribed && <AlarmList activeTab="subscribe" />}
    </>
  );
};

export default AlarmBox;
