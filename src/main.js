import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
<<<<<<< HEAD
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    width: 75%;
    margin: auto;
  }
`;
=======
>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275

export const BUILDINGS = [
  {
    title: "본관",
    description: "대강당, 중강당",
    value: "main",
  },
  {
    title: "5호관",
    description: "소강당(공연용), 1층 강의실",
    value: "5",
  },
  {
    title: "60주년 기념관",
    description: "강당, 창업지원단 강의실, 컴퓨터 있는 곳",
    value: "60",
  },
  {
    title: "하이테크",
    description: "중강당, 대강당, 강의실",
    value: "hiTech",
  },
  {
    title: "나빌레관",
    description: "가무연습실",
    value: "naville",
  },
  {
    title: "6호관",
    description: "강의실",
    value: "6",
  },
];

function MainApp() {
  const onClickBuilding = (value) => () => {
    window.location.href = `/Search?building=${value}`;
  };
  return (
    <div className='relative flex items-center justify-center pt-20'>
      <img src='/img/bg.jpg' className='absolute top-0 left-0 w-screen h-screen -z-10' />
      <section className='p-20 w-full'>
        <div className='w-full flex flex-col justify-center mt-40 text-5xl whitespace-pre-wrap mb-20'>
          <p className='w-full font-semibold'>인하대학교</p>
          <p className='font-bold'>시설예약시스템</p>
        </div>

        <div className='grid grid-cols-3 gap-5'>
          {BUILDINGS.map(({ title, description, value }) => (
            <div
              onClick={onClickBuilding(value)}
              className='px-20 py-10 rounded-lg shadow bg-[#ffffff95] flex flex-col items-center justify-center hover:bg-white cursor-pointer'
            >
              <p className='font-bold text-3xl'>{title}</p>
              <p className='text-gray-600 font-semibold text-lg'>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainApp;
ReactDOM.render(
  <Router>
<<<<<<< HEAD
     <GlobalStyle />
    <MainApp />
  </Router>,
  document.getElementById("root"),
);
=======
    <MainApp />
  </Router>,
  document.getElementById("root"),
);
>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
