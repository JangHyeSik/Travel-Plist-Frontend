export const makeTime = (seconds) => {
  const hour =
    parseInt(seconds / 3600) < 10
      ? "0" + parseInt(seconds / 3600)
      : parseInt(seconds / 3600);
  const minutes =
    parseInt((seconds % 3600) / 60) < 10
      ? "0" + parseInt((seconds % 3600) / 60)
      : parseInt((seconds % 3600) / 60);

  let time;

  if (hour === "00" && minutes === "00") {
    time = "곧 도착예정";
    return time;
  }

  if (hour === "00") {
    time = `${minutes}분`;
    return time;
  }

  if (minutes === "00") {
    time = `${hour}시간`;
    return time;
  }

  time = `${hour}시간 ${minutes}분`;

  return time;
};
