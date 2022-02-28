import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Home from "../components/Home";
import Main from "../components/Main";

function App() {
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading && <Loading />}

      <Routes>
        <Route path="/" element={<Home />} />
        {isLoggedIn && <Route path="/main" element={<Main />} />}
      </Routes>
    </>
  );
}

export default App;
