import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Search.css';

function Search() {
  const [selectedPeople, setSelectedPeople] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinutes, setSelectedMinutes] = useState('00');
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const handlePeopleChange = (event) => {
    setSelectedPeople(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setSelectedMinutes(event.target.value);
  };

  const handleCalendarMonthChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSearchClick = () => {
    setIsCalendarVisible(false);
    setIsResultVisible(true);
  };

  return (
    <>
      <div className="Name">
        <div className="people">
          <p>예상인원</p>
        </div>

        <div className="date">
          <p>날짜</p>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="time">
          <p>시작시간</p>

          <div className="time-box">
            <div className='hour'>
                <select 
                className="hour-box"
                value={selectedHour} 
                onChange={handleHourChange}
                >
                    {Array.from({ length: 13 }, (_, index) => {
                    const hour = index + 9;
                    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
                    return <option key={formattedHour} value={formattedHour}>{formattedHour}</option>;
                    })}
                </select>
                <div className="unit">시</div>
            </div>

            <div className='minute'>
                <select
                className="minute-box"
                value={selectedMinutes} 
                onChange={handleMinutesChange}
                >
                    <option value="00">00</option>
                    <option value="30">30</option>
                </select>
                <div className="unit">분</div>
            </div>

          </div>
        </div>
      </div>

      <div className="people-box">
        <select
          className="unit"
          value={selectedPeople}
          onChange={handlePeopleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100~</option>
        </select>
        <p className="unit">명</p>
      </div>

       {/* 거대 달력 */}
       {isCalendarVisible && (
        <div className="calendar-container">
          <Calendar
            className="calendar"
            onChange={setSelectedDate}
            value={selectedDate}
            onActiveStartDateChange={({ activeStartDate, view }) => {
              handleCalendarMonthChange(activeStartDate);
            }}
          />
        </div>
      )}

    {isResultVisible && (
        <div className='result-box'>
           
            <div id="mark">
                <span className='square'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M0 0H20V20H0V0Z" fill="#D9D9D9"/>
                    </svg> 예약가능
                </span>
                <span className='square'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M0 0H20V20H0V0Z" fill="#3155AE" fill-opacity="0.5"/> 
                    </svg> 예약중
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M0 0H20V20H0V0Z" fill="#3155AE"/>
                    </svg> 예약완료
                </span>
            </div>


            <div className='blue-bar'></div>
            <div className='name-bar'>
                <p className='Name'>이름</p>
                <p className='possible-number'>수용인원</p>
                <p className='usingtime'>이용시간</p>
                <p className='reserve'>예약</p>
            </div>
        
        </div>
    )}


      <button className='search' onClick={handleSearchClick}>검색하기</button>

    </>
  );
}

export default Search;