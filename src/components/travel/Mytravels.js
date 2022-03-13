import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import Navigation from "../Navigation";
import ConfirmModal from "../modal/ConfirmModal";
import { auth } from "../../firebase";
import { logoutRequest } from "../../features/auth/authSlice";
import { deleteTravelRequest } from "../../features/user/userSlice";

export default function Mytravels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteTravelId, setDeleteTravelId] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { user, isLoading } = useSelector((state) => state.user);
  const { _id, username, travels } = user;

  const token = sessionStorage.getItem("token");

  const signOut = () => {
    auth.signOut();
    sessionStorage.removeItem("persist:root");
    sessionStorage.removeItem("token");

    dispatch(logoutRequest());
    navigate("/");
  };

  const handleCloseModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleDeleteTravel = () => {
    setIsOpenDeleteModal(false);
    setDeleteTravelId("");

    dispatch(
      deleteTravelRequest({
        userId: _id,
        travelId: deleteTravelId,
        token,
      })
    );
  };

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <TailSpin color="#00BFFF" height={100} width={100} />
          <LoadingTextWrapper>여행을 생성하는 중입니다 :)</LoadingTextWrapper>
        </LoadingWrapper>
      )}
      <MytravelsWrapper>
        <UserInfoContainer>
          <Div>
            <div className="character-container">
              <img
                className="character"
                src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
                alt="캐릭터"
              />
            </div>
            <div className="username-container">{username} 님</div>
          </Div>
          <LogoutButton className="logout-button" onClick={signOut}>
            로그아웃
          </LogoutButton>
        </UserInfoContainer>

        <div className="title">나의 여행 ✈️</div>
        <MytravelsContainer>
          {travels.length ? (
            travels.map((travel) => {
              const startDate = travel.startDate.slice(0, 10);
              const endDate = travel.endDate.slice(0, 10);

              return (
                <div key={travel._id}>
                  <div className="travel-date">
                    {startDate} ~ {endDate}
                  </div>

                  <TravelBox>
                    <div
                      onClick={() => navigate(`/travel-detail/${travel._id}`)}
                    >
                      {travel.title}
                    </div>

                    <DeleteButton
                      onClick={() => {
                        setIsOpenDeleteModal(true);
                        setDeleteTravelId(travel._id);
                      }}
                    >
                      🗑️
                    </DeleteButton>
                  </TravelBox>
                </div>
              );
            })
          ) : (
            <>
              <div>여행 일정이 없습니다.</div>
            </>
          )}
          <TravelCreateButton
            className="travel-create-button"
            onClick={() => navigate("/travel-create")}
          >
            +
          </TravelCreateButton>
        </MytravelsContainer>
        <Navigation />
      </MytravelsWrapper>
      {isOpenDeleteModal && (
        <ConfirmModal
          onClose={handleCloseModal}
          handleDeleteTravel={handleDeleteTravel}
        >
          <div>삭제하시면</div>
          <div>여행기록도 같이 삭제됩니다.</div>
          <div> 정말 삭제하시겠습니까?</div>
        </ConfirmModal>
      )}
    </>
  );
}

const MytravelsWrapper = styled.div`
  width: 100%;
  height: 88vh;
  background-color: #d4e3fc;

  .title {
    display: flex;
    align-items: center;
    height: 7%;
    padding-left: 2rem;
    border-radius: 4rem;
    background-color: #9cbdf0;
    font-size: 3rem;
    font-weight: bold;
    color: #ffffff;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 13%;
  font-size: 3rem;
  font-weight: bold;

  .character-container {
    width: 8rem;
    height: 9rem;
    overflow: hidden;
  }
  .character {
    width: 32rem;
  }
`;

const MytravelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: 57%;
  font-size: 2rem;
  font-weight: bold;
  overflow: scroll;

  .travel-date {
    margin-top: 2.5rem;
    font-size: 2.5rem;
  }
`;

const TravelCreateButton = styled.button`
  margin-top: 2rem;
  padding: 2rem 25rem;
  border: none;
  font-size: 5rem;
  color: #aaaaaa;
  opacity: 70%;
`;

const TravelBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  width: 50rem;
  padding: 3rem;
  border-radius: 4rem;
  font-size: 2.3rem;
  background-color: #ffffff;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-right: 7rem;
`;

const LogoutButton = styled.button`
  padding: 20px 45px;
  margin-right: 3rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #9cbdf0;
  color: #ffffff;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  z-index: 12;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 88vh;
  background-color: #91e4fb;
`;

const LoadingTextWrapper = styled.div`
  margin-top: 10rem;
  font-size: 3rem;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  padding: 20px 45px;
  border: none;
  border-radius: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  background-color: #ffffff;
`;
