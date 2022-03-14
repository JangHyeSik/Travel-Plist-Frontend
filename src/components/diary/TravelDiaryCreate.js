import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import GoBackButton from "../button/GobackButton";
import ErrorModal from "../modal/ErrorModal";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createTravelDiaryRequest } from "../../features/user/userSlice";

export default function TravelDiaryCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { travelid, travellogid, traveldiaryid } = useParams();
  const { travels } = useSelector((state) => state.user.user);

  const { travelLogs } = travels.find((travel) => travel._id === travelid);
  const { travelDiary } = travelLogs.find(
    (travelLog) => travelLog._id === travellogid
  );

  const [imageFile, setImageFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(
    travelDiary.photoUrl ? travelDiary.photoUrl : ""
  );
  const [stream, setStream] = useState(null);
  const [media, setMedia] = useState(null);
  const [source, setSource] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(
    travelDiary.audioUrl ? travelDiary.audioUrl : ""
  );

  const [analyser, setAnalyser] = useState(null);
  const [travelDiaryText, setTravelDiaryText] = useState(
    travelDiary.diary ? travelDiary.diary : ""
  );
  const [isCompleteRecord, setIsCompleteRecord] = useState(
    travelDiary.audioUrl === "" || !travelDiary.audioUrl ? false : true
  );
  const [isOnRecord, setIsOnRecord] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState({
    isInvalidType: false,
    isOverFileSize: false,
  });

  const { isInvalidType, isOverFileSize } = isOpenModal;

  const hiddenInput = useRef(null);
  const token = sessionStorage.getItem("token");

  const handleChangeImageFile = async (e) => {
    const file = e.target.files[0];
    const type = file.type.split("/")[1];

    if (
      !(type === "jpeg" || type === "jpg" || type === "png" || type === "gif")
    ) {
      setIsOpenModal({
        ...isOpenModal,
        isInvalidType: true,
      });

      return;
    }

    const fileSize = file.size / 1024 / 1024;

    if (fileSize > 10) {
      setIsOpenModal({
        ...isOpenModal,
        isOverFileSize: true,
      });

      return;
    }

    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 428,
    };

    const compressionImageFile = await imageCompression(file, options);

    setImageFile(compressionImageFile);
    setPhotoUrl(URL.createObjectURL(compressionImageFile));
  };

  const handleClickSelectButton = (e) => {
    e.preventDefault();
    hiddenInput.current.click();
  };

  const handleChangeTextArea = (e) => {
    setTravelDiaryText(e.target.value);
  };

  const handleRecordAudio = (e) => {
    e.preventDefault();

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);

    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);

      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach((track) => {
            track.stop();
          });
          mediaRecorder.stop();

          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setIsOnRecord(false);
            setIsCompleteRecord(false);
          };
        } else {
          setIsOnRecord(true);
          setIsCompleteRecord(false);
        }
      };
    });
  };

  const handleOffRecordAudio = (e) => {
    e.preventDefault();

    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setRecordedAudioUrl(URL.createObjectURL(e.data));
      setIsOnRecord(false);
      setIsCompleteRecord(true);
    };

    stream.getAudioTracks().forEach((track) => {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    let recordedAudioFiie;
    if (audioUrl) {
      recordedAudioFiie = new File([audioUrl], "audio", {
        lastModified: new Date().getTime(),
        type: "audio/mpeg",
      });
    }

    formData.append("image", imageFile);
    formData.append("audio", recordedAudioFiie);

    dispatch(
      createTravelDiaryRequest({
        travelid,
        travellogid,
        traveldiaryid,
        formData,
        travelDiaryText,
        photoUrl,
        recordedAudioUrl,
        token,
      })
    );

    navigate("/mydiarys");
  };

  return (
    <>
      <TravelDiaryCreateWrapper>
        <GoBackButton />
        <FormWrapper onSubmit={handleSubmit}>
          <TitleWrapper>기록</TitleWrapper>
          <PhotoAudioContainer>
            {photoUrl ? (
              <>
                <ImageWrapper src={photoUrl} alt="대표사진" />
                <ChangePhotoButton onClick={handleClickSelectButton}>
                  변경
                </ChangePhotoButton>
              </>
            ) : (
              <PhotoSelectButton onClick={handleClickSelectButton}>
                📷
              </PhotoSelectButton>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeImageFile}
              ref={hiddenInput}
            />

            <RecordContainer>
              <RecordButton
                isOnRecord={isOnRecord}
                onClick={!isOnRecord ? handleRecordAudio : handleOffRecordAudio}
              >
                {!isOnRecord
                  ? isCompleteRecord
                    ? "다시 녹음"
                    : "녹음"
                  : "녹음중지"}
              </RecordButton>
              {isCompleteRecord && (
                <ReactAudioPlayer src={recordedAudioUrl} controls />
              )}
            </RecordContainer>
          </PhotoAudioContainer>
          <TextAreaWrapper
            type="text"
            placeholder="오늘 여행의 평을
          입력해주세요."
            value={travelDiaryText}
            onChange={handleChangeTextArea}
          />
          <SaveButton>저장</SaveButton>
        </FormWrapper>
      </TravelDiaryCreateWrapper>
      {(isInvalidType || isOverFileSize) && (
        <ErrorModal setIsOpenModal={setIsOpenModal}>
          {isInvalidType && (
            <>
              <div>사진 또는 GIF 파일만</div>
              <div>올리실 수 있습니다:)</div>
            </>
          )}

          {isOverFileSize && (
            <div>파일 크기가 10MB 이하인 사진만 올리실 수 있습니다.</div>
          )}
        </ErrorModal>
      )}
    </>
  );
}

const TravelDiaryCreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 88vh;
  background-color: #d4e3fc;
`;

const FormWrapper = styled.form`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: bold;
`;

const PhotoAudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 43%;
  margin-bottom: 5rem;
  border-radius: 4rem;
  background-color: #ffffff;
`;

const PhotoSelectButton = styled.button`
  width: 100%;
  height: 70%;
  border: none;
  border-radius: 4rem 4rem 0rem 0rem;
  background-color: #dff9fb;
  font-size: 6rem;
  opacity: 50%;
`;

const ChangePhotoButton = styled.button`
  position: absolute;
  top: 15rem;
  left: 11rem;
  width: 5rem;
  height: 3rem;
  border-radius: 20%;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #9cbdf0;
`;

const RecordContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 30%;
`;

const RecordButton = styled.button`
  width: 7rem;
  height: 7rem;
  border: none;
  border-radius: 180px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  background-color: red;

  animation-name: pulse;
  animation-duration: ${(props) => (props.isOnRecord ? "1.5s" : "0s")};
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes pulse {
    0% {
      box-shadow: 0px 0px 5px 0px rgba(173, 0, 0, 0.3);
    }
    65% {
      box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0.3);
    }
    90% {
      box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0);
    }
  }
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 4rem 4rem 0rem 0rem;
`;

const TextAreaWrapper = styled.textarea`
  margin-bottom: 3rem;
  padding: 15rem 8rem;
  border: none;
  border-radius: 1rem;
  font-size: 2.5rem;
  text-align: center;
`;

const SaveButton = styled.button`
  width: 250px;
  height: 100px;
  border-radius: 1rem;
  border: none;
  font-size: 2rem;
  background-color: #9cbdf0;
  color: #ffffff;
`;
