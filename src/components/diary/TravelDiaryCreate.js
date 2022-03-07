import React from "react";
import { useParams } from "react-router-dom";

export default function TravelDiaryCreate() {
  const { travelid, travellogid, traveldiaryid } = useParams();

  return (
    <>
      <div>일기 쓰기 컴포넌트입니다.</div>
    </>
  );
}
