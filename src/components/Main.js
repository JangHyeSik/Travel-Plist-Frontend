import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div>홈 컴포넌트입니다.</div>
      <button onClick={signOut}>로그아웃</button>
    </>
  );
}
