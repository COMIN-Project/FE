import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slider";
import "./slider.css";
import "./reservation.css";

Modal.setAppElement("#root");

function Reservation() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [facilityName, setFacilityName] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(21);
  const [endMinute, setEndMinute] = useState(0);
  const [companions, setCompanions] = useState([{ email: "", name: "" }]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
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
      left: `${((value[0] - bounds.min) / (bounds.max - bounds.min)) * 100}%`,
      width: `${((value[1] - value[0]) / (bounds.max - bounds.min)) * 100}%`,
    };

    return (
      <>
        {[...Array(Math.floor(bounds.max - bounds.min) + 1)].map((_, i) => (
          <span
            key={i}
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

  const modalContent = (
    <div className="modal">
      <div className="modal-background" onClick={handleCloseModal}></div>
      <div className="modal-content">
        <h2>예약하기</h2>
        <div className="reservation-info">
          <h4>시설명</h4>
          <input
            type="text"
            value={facilityName}
            onChange={handleFacilityNameChange}
            placeholder="시설명"
          />
          <h4>날짜</h4>
          <input
            type="date"
            value={reservationDate}
            onChange={handleReservationDateChange}
          />
        </div>
        <div className="reservation-slider">
          <Slider
            value={[startHour + startMinute / 60, endHour + endMinute / 60]}
            onChange={handleSliderChange}
            min={9}
            max={21}
            step={0.5}
            renderTrack={renderTrack}
          />

          <div className="time-inputs">
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
                    onChange={(event) =>
                      handleCompanionEmailChange(event, index)
                    }
                  />
                  <input
                    type="text"
                    placeholder={`동반자 ${index + 1} 이름`}
                    value={companion.name}
                    onChange={(event) =>
                      handleCompanionNameChange(event, index)
                    }
                  />
                </div>
              ))}
            </div>
            <button onClick={handleAddCompanion}>추가</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <button className="예약하기" onClick={handleOpenModal}>
        예약하기
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="예약하기"
        style={{
          content: {
            width: "1200px",
            height: "800px",
            margin: "auto",
          },
        }}
      >
        {modalContent}
        <button className="check" onClick={handleCloseModal}>
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
