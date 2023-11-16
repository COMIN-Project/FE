import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import getReservations from "./getReservations";
import { BUILDINGS } from "./main";
import { apis } from "./utils";
import { useHistory } from "react-router-dom";

const PERSON = ["1", "2", "3", "4", "5", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100~"];
const STATUS = {
  RESERVED: "예약완료",
  IN_USE: "사용중",
  AVAILABLE: "예약가능",
};

const COLORS = {
  RESERVED: "text-red-400",
  IN_USE: "text-yellow-400",
  AVAILABLE: "text-primary",
};

function Inquire() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = React.useState({
    building: "",
    person: "1",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().add(1, "hour").startOf("hour").format("HH:mm"),
  });

  const history = useHistory();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const reservationsData = await getReservations();
  //       console.log("Fetched reservations:", reservationsData);
  //       setData(reservationsData);
  //     } catch (error) {
  //       console.error("Error fetching reservations:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsData = await getReservations();
        console.log("Fetched reservations:", reservationsData);

        // 필요한 정보만 추출하여 setData
        const formattedData = reservationsData.map((item) => ({
          facilityName: item?.selectedPlace, // 수정된 부분
          roomName: item?.selectedClass, // 수정된 부분
          reservationDate: item.selectedDate, // 수정된 부분
          startTime: item.startTime,
          endTime: item.endTime,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchData();
  }, []);

  const searchList = async () => {
    try {
      const res = await apis({
        url: "/reservations",
        method: "GET",
      });
      const filtered = res.filter((item) => {
        if (item.reservationDate !== options.date) return false;
        const date = dayjs(`${item.reservationDate} ${item.startTime}`, "YYYY-MM-DD HH:mm");
        const selectedDate = dayjs(`${options.date} ${options.time}`, "YYYY-MM-DD HH:mm");
        return date.isAfter(selectedDate);
      });
      setData(filtered);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const building = urlParams.get("building");
    if (building) {
      setOptions({
        ...options,
        building: building,
      });
    }
  }, []);

  const onChangeOptions = (e) => {
    const { name, value } = e.currentTarget;
    setOptions({
      ...options,
      [name]: value,
    });
  };

  const onSelectPlaceAndClass = (facilityName, roomName) => {
    if (facilityName && roomName) {
      history.push({
        pathname: "/suggest",
        state: {
          selectedPlace: facilityName,
          selectedClass: roomName,
        },
      });
    } else {
      console.log("장소와 강의실을 선택하세요.");
    }
  };

  const onChangeSelected = (item) => () => {
    const index = selected.findIndex((selectedItem) => selectedItem.reservationId === item.reservationId);
    if (index === -1) {
      setSelected([...selected, item]);
    } else {
      setSelected(selected.filter((_, i) => i !== index));
    }
  };

  const reservationPromise = async (item) => {
    try {
      const body = {
        userId: 1,
        companions: null,
        roomId: item?.roomId?.roomId,
        startTime: item?.startTime,
        endTime: item?.endTime,
        reservationDate: item?.reservationDate,
      };
      const res = await apis({
        url: "/reservations",
        method: "POST",
        body,
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const onReservation = async () => {
    if (selected.length === 0) return alert("예약할 시설을 선택해주세요.");
    try {
      await Promise.all(selected.map((item) => reservationPromise(item)));
      alert("예약이 완료되었습니다.");
      await searchList();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        <div className='mt-8 flow-root'>{/* 첫 번째 내용 */}</div>
        <div className='mt-8 flow-root'>{/* 두 번째 내용 */}</div>{" "}
        <div className='mt-8 flow-root'>{/* 두 번째 내용 */}</div>
      </div>

      <div className='mt-8 flow-root ml-40'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <h3>나의 이용내역</h3>
            <br></br>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    style={{ fontSize: "20px" }}
                  >
                    시설명
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    style={{ fontSize: "20px" }}
                  >
                    강의실명
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    style={{ fontSize: "20px" }}
                  >
                    이용날짜
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    style={{ fontSize: "20px" }}
                  >
                    이용시간
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    style={{ fontSize: "20px" }}
                  >
                    건의
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {item?.facilityName}
                    </td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {item?.roomName}
                    </td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {item?.reservationDate}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{`${item?.startTime} ~ ${item?.endTime}`}</td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      <button
                        className='bg-primary rounded px-1 py-1 text-white font-semibold mt-10'
                        onClick={() => onSelectPlaceAndClass(item.facilityName, item.roomName)}
                      >
                        건의하기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquire;