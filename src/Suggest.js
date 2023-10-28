import React, { useState } from 'react';
import './Suggest.css';

function Suggest() {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePlaceChange = (event) => {
    setSelectedPlace(event.target.value);
    setSelectedClass('');
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const getClassOptions = () => {
    switch(selectedPlace) {
      case '본관':
        return ['중강당', '대강당'];
      case '5호관':
        return ['5동 104A', '5동 104B'];
      case '60주년 기념관':
        return ['101호', '102호', '103호'];
      case '하이테크':
        return ['002호', '232호', '230호'];
      case '나빌레관':
        return ['가무연습실'];
      case '6호관':
        return ['101호', '102호', '103호'];
      default:
        return [];
    }
  };

  return (
    <>
      <div className='box1'>
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
      
      <div className='box2'>
        <select value={selectedClass} onChange={handleClassChange}>
          <option value=''>강의실을 선택하세요</option>
          {getClassOptions().map((classroom, index) => (
            <option key={index} value={classroom}>{classroom}</option>
          ))}
        </select>
      </div>

      <div className='box3'>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value=''>건의유형</option>
          <option value='시설'>시설문제</option>
          <option value='청결'>청결</option>
        </select>
      </div>

      <div className='input-box'>
        <div className='input-bar'></div>
        <div className='input-title'>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요"/>
        </div>

        <div className='input-content'>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요"/>
        </div>
      </div>

      <button className='check'>확인</button>
    </>
  );
}

export default Suggest;