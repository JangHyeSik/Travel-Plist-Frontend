import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Home from "../components/Home";
import Main from "../components/Main";
import Mytravels from "../components/travel/Mytravels";
import TravelCreate from "../components/travel/TravelCreate";
import TravelDetail from "../components/travel/TravelDetail";
import TravelDetailCreate from "../components/travel/TravelDetailCreate";
import Mydiarys from "../components/Mydiarys";

function App() {
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading && <Loading />}

      <Routes>
        <Route path="/" element={<Home />} />
        {isLoggedIn && <Route path="/main" element={<Main />} />}
        <Route path="/mytravels" element={<Mytravels />} />
        <Route path="/travel-create" element={<TravelCreate />} />
        <Route path="/travel-detail/:travelid" element={<TravelDetail />} />
        <Route
          path="/travel-detail-create/:travellogid"
          element={<TravelDetailCreate />}
        />
        <Route path="/mydiarys" element={<Mydiarys />} />
      </Routes>
    </>
  );
}

export default App;
