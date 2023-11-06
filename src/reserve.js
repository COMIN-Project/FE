import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ko } from "date-fns/locale";
import React, { useState, useRef, useEffect, Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reserve.css";
import Reservation from "./reservation";
import './reservation.css';
import Inquire from "./Inquire";
//import { useHistory, useParams } from 'react-router-dom';
import { render } from 'react-dom';


import Modal from 'react-modal';
Modal.setAppElement('#root');

export const todayFormal=()=>{
  let now =new Date();
  let todayYear =now.getFullYear();
  let todayMonth=(now.getMonth()+1)>9?(now.getMonth()+1):'0'+(now.getMonth+1);
  let todayDate= now.getDate>9?now.getDate():'0'+now.getDate();
  return todayYear+'-'+todayMonth+'-'+todayDate;
}

const BlockItem = ({ selectedClass, capacity, timeColors, selectedPlace, selectedDate }) => {
  return (
    <li className="block">
      <span className="block-typo">{selectedClass}</span>
      <span className="block-typo">{capacity}</span>
      <span className="frame8">
        {timeColors &&
          timeColors.map((color, idx) => (
            <span
              key={idx}
              className="rectangle"
              style={{ background: color }}
            ></span>
          ))}
      </span>
      <Reservation selectedDate={selectedDate} selectedPlace={selectedPlace} selectedClass={selectedClass} />
    </li>
  );
};


function getFacilityData(selectedPlace) {
  if (selectedPlace === "5호관") {
    return [
      {
        selectedClass: "101호",
        capacity: "10 ~ 20",
        timeColors: [
          "#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9",
        ],
      },
      {
        selectedClass: "104호",
        capacity: "10 ~ 20",
        timeColors: [
          "#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9",
        ],
      },
    ];
  } else {
    return [
      {
        selectedClass: "1042호",
        capacity: "1 ~ 20",
        timeColors: [
          "#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9","#D9D9D9",
        ],
      },
    ];
  }
}

const Reserve = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(todayFormal()));
  const [showDatePicker, ShowDatePicker] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("5호관");
  const facilityData = getFacilityData(selectedPlace);

  const selectedStyle = {
    color: "rgba(97, 135, 210, 0.70)",
  };
  
  return (
    
    <>

      <div id="reDate">
        <ul className="Date">
          <li className="Date-name">
            <h1>일자별 대여현황</h1>
          </li>
          <li className="relativePosition">
          <div className="frame3" onClick={() => ShowDatePicker(!showDatePicker)}>
              <p className="Date-date">
                {selectedDate.toISOString().split("T")[0]}
              </p>
            </div>
            <div className="absolutePosition">
              {showDatePicker && (
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    ShowDatePicker(false);
                  }}
                  //onChange={handleDateChange}
                  inline
                  locale={ko}
                />
              )}
            </div>

          </li>
        </ul>
      </div>
 

      <div id="reList">
        <ul className="List">
          <li className="list-up">
            <p className="list-typo">시설예약</p>
          </li>
          <li
            className="list-typo2"
            onClick={() => setSelectedDate("60주년 기념관")}
            style={selectedPlace === "60주년 기념관" ? selectedStyle : {}}
          >
            60주년 기념관
          </li>
          <li
            className="list-typo2"
            onClick={() => setSelectedPlace("5호관")}
            style={selectedPlace === "5호관" ? selectedStyle : {}}
          >
            5호관
          </li>
        </ul>
      </div>

      <div id="reList_right" className="reList_right">
        <div id="upside">
          <div id="Facility">
            <h2 className="facility">{selectedPlace}</h2>
          </div>

          <div id="frame4">
            <span className="square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M0 0H20V20H0V0Z" fill="#D9D9D9" />
              </svg>{" "}
              예약가능
            </span>
            <span className="square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M0 0H20V20H0V0Z" fill="#3155AE" fill-opacity="0.5" />
              </svg>{" "}
              예약중
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M0 0H20V20H0V0Z" fill="#3155AE" />
              </svg>{" "}
              예약완료
            </span>
          </div>
        </div>

        <div id="frame5">
          <ul className="frame5">
            <li className="frame6">
              <span className="frame6-typo">이름</span>
              <span className="frame6-typo">수용인원</span>
              <span className="frame6-typo">이용시간</span>
              <span className="frame6-typo">예약</span>
            </li>
            {facilityData.map((item, index) => (
              <BlockItem
                key={index}
                selectedClass={item.selectedClass}
                capacity={item.capacity}
                timeColors={item.timeColors}
                selectedPlace={selectedPlace} //
                selectedDate={selectedDate}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Reserve;