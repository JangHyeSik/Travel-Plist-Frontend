import React, { useState, useRef } from "react";
import styled from "styled-components";
import GoBackButton from "../GobackButton";
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

  const hiddenInput = useRef(null);
  const token = sessionStorage.getItem("token");

  const handleChangeImageFile = (e) => {
    setImageFile(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleClickSelectButton = (e) => {
    e.preventDefault();
    hiddenInput.current.click();
  };

  const handleChangeTextArea = (e) => {
    setTravelDiaryText(e.target.value);
  };

  function handleRecordAudio(e) {
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
  }

  function handleOffRecordAudio(e) {
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
  }

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
  console.log(imageFile);

  return (
    <TravelDiaryCreateWrapper>
      <GoBackButton />
      <FormWrapper onSubmit={handleSubmit}>
        <TitleWrapper>기록</TitleWrapper>
        <PhotoAudioContainer>
          {photoUrl ? (
            <ImageWrapper src={photoUrl} alt="대표사진" />
          ) : (
            <SelectButton onClick={handleClickSelectButton}>📷</SelectButton>
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
              <audio src={recordedAudioUrl} controls></audio>
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
  );
}

const TitleWrapper = styled.div`
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

const SelectButton = styled.button`
  padding: 15rem 17.5rem;
  border: none;
  border-radius: 4rem 4rem 0rem 0rem;
  background-color: #dff9fb;
  font-size: 6rem;
  opacity: 50%;
`;

const RecordContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem;
  margin-left: 1.5rem;
`;

const RecordButton = styled.button`
  width: 11rem;
  height: 11rem;
  border: none;
  border-radius: 180px;
  font-size: 2rem;
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

const TextAreaWrapper = styled.textarea`
  margin-bottom: 3rem;
  padding: 15rem 8rem;
  border: none;
  border-radius: 1rem;
  font-size: 2.5rem;
  text-align: center;
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 4rem 4rem 0rem 0rem;
`;

const TravelDiaryCreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #d4e3fc;
`;

const FormWrapper = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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