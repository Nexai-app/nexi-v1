export const playNotificationSound = () => {
  const audio = new Audio("sound/notification.mp3");
  audio.play();
};
