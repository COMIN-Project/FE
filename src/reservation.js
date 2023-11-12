import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slider";
import "./slider.css";
import "./reservation.css";
import { format } from "date-fns";
import fetchReservation from "./fetchReservation";

Modal.setAppElement("#root");

function Reservation({
  selectedPlace,
  selectedClass,
  selectedDate,
  isLoggedIn,
  userID,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [facilityName, setFacilityName] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(21);
  const [endMinute, setEndMinute] = useState(0);
  const [companions, setCompanions] = useState([{ email: "", name: "" }]);

  var nowdate = selectedDate;

  useEffect(() => {
    if (isLoggedIn) {
      setCompanions([{ email: "", name: "", userId: userID }]);
    }
  }, [isLoggedIn, userID]);

  const handleConfirm = async () => {
    console.log("Current userID:", userID);

    const reservationData = {
      userId: isLoggedIn ? { userId: userID } : null,
      companions: companions.map((companion) => companion.userId || null),
      roomId: { roomId: selectedClass },
      startTime: `${format(selectedDate, "yyyy-MM-dd")}T${startHour
        .toString()
        .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}:00`,
      endTime: `${format(selectedDate, "yyyy-MM-dd")}T${endHour
        .toString()
        .padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}:00`,
      reservationDate: format(selectedDate, "yyyy-MM-dd"),
    };

    if (reservationData.userId) {
      reservationData.userId = reservationData.userId.userId;
    }

    try {
      await fetchReservation(reservationData);
      console.log("데이터 전송 성공");
    } catch (error) {
      console.error("데이터 전송 에러:", error);
    }

    setModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setStartHour(9);
    setStartMinute(0);
    setEndHour(21);
    setEndMinute(0);
    setCompanions([{ email: "", name: "" }]);
    setReservationDate(selectedDate);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setStartHour(9);
    setStartMinute(0);
    setEndHour(21);
    setEndMinute(0);
    setCompanions([{ email: "", name: "" }]);
  };

  const handleAddCompanion = () => {
    setCompanions([...companions, { email: "", name: "" }]);
  };
  const handleCompanionEmailChange = (event, index) => {
    const updatedCompanions = [...companions];
    updatedCompanions[index].email = event.target.value;
    setCompanions(updatedCompanions);
  };
  const handleCompanionNameChange = (event, index) => {
    const updatedCompanions = [...companions];
    updatedCompanions[index].name = event.target.value;
    setCompanions(updatedCompanions);
  };

  const handleFacilityNameChange = (e) => {
    setFacilityName(e.target.value);
  };

  const handleReservationDateChange = (e) => {
    setReservationDate(e.target.value);
  };

  const handleSliderChange = (value) => {
    setStartHour(Math.floor(value[0]));
    setStartMinute((value[0] % 1) * 60);
    setEndHour(Math.floor(value[1]));
    setEndMinute((value[1] % 1) * 60);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "startHour") {
      setStartHour(Number(value));
    } else if (name === "startMinute") {
      setStartMinute(Number(value));
    } else if (name === "endHour") {
      setEndHour(Number(value));
    } else if (name === "endMinute") {
      setEndMinute(Number(value));
    }
  };

  const bounds = {
    min: 9,
    max: 21,
  };

  const renderTrack = (props, state) => {
    const { value } = state;

    const trackStyle = {
      left: `${
        Math.floor(((value[0] - bounds.min) / (bounds.max - bounds.min)) * 24) *
        (100 / 24)
      }%`,
      width: `${
        ((Math.ceil(value[1]) - Math.floor(value[0])) /
          (bounds.max - bounds.min)) *
        (100 / 24)
      }%`,
    };

    return (
      <>
        {[...Array(Math.floor(bounds.max - bounds.min) + 1)].map((_, i) => (
          <span
            key={i} // 고유한 key 값 추가
            className={`mark`}
            style={{
              left: `${(
                (i / Math.floor(bounds.max - bounds.min)) *
                100
              ).toFixed(2)}%`,
            }}
          >
            {bounds.min + i}
          </span>
        ))}

        <div {...props} className="track" />

        {value && <div className="slider-fill" style={trackStyle} />}
      </>
    );
  };

  return (
    <div className="container">
      {console.log(nowdate)}

      <style>
        {`
          .mark { width: 25px; height: 25px;}

        `}
      </style>
      <button className="예약하기" onClick={handleOpenModal}>
        예약하기
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="예약하기"
        style={{
          content: {
            width: "1000px",
            height: "640px",
            margin: "auto",
          },
        }}
      >
        <h2>예약하기</h2>
        <div className="reservation-info">
          <h4>
            시설명: {selectedPlace} {selectedClass}
          </h4>
          <h4>
            날짜: {selectedDate ? selectedDate.toLocaleDateString() : "날짜"}
          </h4>
        </div>

        <div
          className="reservation-slider"
          style={{
            width: "850px",
            height: "520px",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <Slider
            value={[startHour + startMinute / 60, endHour + endMinute / 60]}
            onChange={handleSliderChange}
            min={9}
            max={21}
            step={0.5}
            renderTrack={renderTrack}
          />

          <div className="time-inputs" style={{ width: "860px" }}>
            <div className="time-name">
              <div className="startTime-name">
                <label htmlFor="startHour">시작 시간</label>
              </div>
              <div className="endTime-name">
                <label htmlFor="endHour">종료 시간</label>
              </div>
            </div>
            <div className="time-blank">
              <div className="startTime-blank">
                <input
                  type="number"
                  id="startHour"
                  name="startHour"
                  value={startHour}
                  onChange={handleInputChange}
                  min={9}
                  max={21}
                />
                <input
                  type="number"
                  id="startMinute"
                  name="startMinute"
                  value={startMinute}
                  onChange={handleInputChange}
                  min={0}
                  max={59}
                />
              </div>
              <div className="endTime-blank">
                <input
                  type="number"
                  id="endHour"
                  name="endHour"
                  value={endHour}
                  onChange={handleInputChange}
                  min={9}
                  max={21}
                />
                <input
                  type="number"
                  id="endMinute"
                  name="endMinute"
                  value={endMinute}
                  onChange={handleInputChange}
                  min={0}
                  max={59}
                />
              </div>
            </div>
          </div>

          <div className="companion-inputs">
            <div className="companion-info">
              <div className="companion-email">
                <label htmlFor="email">동반자 이메일</label>
              </div>
              <div className="companion-name">
                <label htmlFor="name">동반자 이름</label>
              </div>
            </div>

            {companions.map((companion, index) => (
              <div key={index} className="companion-blank">
                <input
                  type="email"
                  placeholder={`동반자 ${index + 1} 이메일`}
                  value={companion.email}
                  onChange={(event) => handleCompanionEmailChange(event, index)}
                />
                <input
                  type="text"
                  placeholder={`동반자 ${index + 1} 이름`}
                  value={companion.name}
                  onChange={(event) => handleCompanionNameChange(event, index)}
                />
              </div>
            ))}

            <button
              style={{ marginLeft: "400px", marginTop: "150px" }}
              onClick={handleAddCompanion}
            >
              추가
            </button>
          </div>
        </div>

        <button className="check" onClick={handleConfirm}>
          확인
        </button>
      </Modal>
    </div>
  );
}

export default Reservation;
ReactDOM.render(
  <BrowserRouter>
    <Reservation />
  </BrowserRouter>,
  document.getElementById("root")
);
