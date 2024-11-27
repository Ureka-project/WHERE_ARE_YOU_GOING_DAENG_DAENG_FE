import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

// 알림 권한 요청 및 토큰 가져오기
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한 허용");
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        console.log("FCM 토큰:", token);
        return token;
      } else {
        console.error("토큰 가져오기 실패");
      }
    } else {
      console.error("알림 권한 거부됨");
    }
  } catch (error) {
    console.error("알림 권한 요청 실패:", error);
  }
};

// 포그라운드에서 푸시 알림을 수신하고 처리하는 핸들러
export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("알림 내용: ", payload);

    // 알림 정보
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      image: payload.notification.image,
      icon: payload.notification.icon,
    };

    // 알림을 화면에 표시
    const notification = new Notification(notificationTitle, notificationOptions);

    notification.onclick = function (event) {
      event.preventDefault(); // 알림 클릭 시 기본 동작 방지
      console.log("notification clicked!");
      notification.close(); // 클릭 후 알림 닫기
    };
  });
};

// 사용 예시: setupOnMessageHandler() 호출로 포그라운드 알림 수신 설정
setupOnMessageHandler();