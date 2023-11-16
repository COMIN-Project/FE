import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Suggest.css";

function Suggest() {
  const location = useLocation();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (location.state) {
      const { selectedPlace, selectedClass } = location.state;
      setSelectedPlace(selectedPlace || "");
      setSelectedClass(selectedClass || "");
    }
  }, [location.state]);

  const handlePlaceChange = (event) => {
    setSelectedPlace(event.target.value);
    setSelectedClass("");
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleConfirm = () => {
    console.log("선택된 장소:", selectedPlace);
    console.log("선택된 강의실:", selectedClass);
    console.log("선택된 유형:", selectedType);

    window.location.href = "https://open.kakao.com/o/sJTeHuSf";
  };

  const getClassOptions = () => {
    switch (selectedPlace) {
      case "본관":
        return ["중강당", "대강당"];
      case "5호관":
        return ["5동 104A", "5동 104B"];
      case "60주년 기념관":
        return ["101호", "102호", "103호"];
      case "하이테크":
        return ["002호", "232호", "230호"];
      case "나빌레관":
        return ["가무연습실"];
      case "6호관":
        return ["101호", "102호", "103호"];
      default:
        return [];
    }
  };

  return (
    <>
      <div className='pt-40 px-20'>
        <div className='flex flex-col w-full p-10 shadow rounded-md justify-around items-center mb-20'>
          <div className='flex w-full justify-around items-center'>
            <div className='flex flex-col relative justify-center items-center'>
              <p className='font-semibold'>시설명</p>
              <div className='border border-gray-300 py-2 px-5 rounded'>
                <select value={selectedPlace} onChange={handlePlaceChange}>
                  <option value=''>장소를 선택하세요</option>
                  <option value='본관'>본관</option>
                  <option value='5호관'>5호관</option>
                  <option value='60주년 기념관'>60주년 기념관</option>
                  <option value='하이테크'>하이테크</option>
                  <option value='나빌레관'>나빌레관</option>
                  <option value='6호관'>6호관</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col relative justify-center items-center'>
              <p className='font-semibold'>강의실명</p>
              <div className='border border-gray-300 py-2 px-5 rounded'>
                <select value={selectedClass} onChange={handleClassChange}>
                  <option value=''>강의실을 선택하세요</option>
                  {getClassOptions().map((classroom, index) => (
                    <option key={index} value={classroom}>
                      {classroom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-col relative justify-center items-center'>
              <p className='font-semibold'>건의유형</p>
              <div className='border border-gray-300 py-2 px-5 rounded'>
                <select value={selectedType} onChange={handleTypeChange}>
                  <option value=''>건의유형</option>
                  <option value='시설'>시설문제</option>
                  <option value='청결'>청결</option>
                </select>
              </div>
            </div>
          </div>
          <button className='bg-primary rounded px-5 py-2.5 text-white font-semibold mt-10' onClick={handleConfirm}>
          건의하기
        </button>
        </div>
      </div>
    </>
  );
}

export default Suggest;