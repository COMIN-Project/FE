import React, { useEffect, useState } from "react";
<<<<<<< HEAD

import dayjs from "dayjs";

=======
import dayjs from "dayjs";
>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
import getReservations from "./getReservations";
import { BUILDINGS } from "./main";
import { apis } from "./utils";

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

function Search() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = React.useState({
    building: "",
    person: "1",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().add(1, "hour").startOf("hour").format("HH:mm"),
  });

  const generateTimeSlots = (roomData, selectedDate) => {
    const timeSlots = [];
    const currentDate = dayjs(selectedDate);

    for (let i = 0; i < 2; i++) {
      const currentStart = currentDate.clone().hour(14).add(i, "hour");
      const currentEnd = currentStart.clone().add(1, "hour");

      const currentReservation = roomData.find((item) => {
        const reservationDate = item.reservationDate || selectedDate;
        const reservationStart = dayjs(`${reservationDate} ${item.startTime}`, "YYYY-MM-DD HH:mm");
        const reservationEnd = dayjs(`${reservationDate} ${item.endTime}`, "YYYY-MM-DD HH:mm");

        return reservationStart.isBefore(currentEnd) && reservationEnd.isAfter(currentStart);
      });

      if (currentStart.hour() < 16 && !timeSlots.some((slot) => slot.startTime === currentStart.format("HH:mm"))) {
        timeSlots.push({
          startTime: currentStart.format("HH:mm"),
          endTime: currentEnd.format("HH:mm"),
          reservationStatus: currentReservation ? currentReservation.reservationStatus : "AVAILABLE",
          reservationDate: currentReservation ? currentReservation.reservationDate : selectedDate,
        });
      }
    }

    return timeSlots;
  };

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData([]);

        const roomsData = await getRooms();
        console.log("Fetched rooms:", roomsData);

        const formattedData = roomsData.flatMap((roomInfo) => {
          const roomData = data.filter((item) => item.roomId.roomId === roomInfo.roomId);
          return generateTimeSlots(roomData, options.date).map((timeSlot) => ({
            ...timeSlot,
            facilityName: roomInfo?.facilityId?.facilityName,
            roomName: roomInfo?.roomName,
            roomCapacity: roomInfo?.roomCapacity || "10",
          }));
        });

        console.log("Formatted Data:", formattedData);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, []);

=======
    useEffect(() => {
      const fetchData = async () => {
      try {
      setData([]); // data 상태 초기화
      
          const roomsData = await getRooms();
          console.log("Fetched rooms:", roomsData);
      
          // /rooms의 모든 방 정보 가져오기
          const formattedData = roomsData.flatMap((roomInfo) => {
            const roomData = data.filter((item) => item.roomId.roomId === roomInfo.roomId);
            return generateTimeSlots(roomData, options.date).map((timeSlot) => ({
              ...timeSlot,
              facilityName: roomInfo?.facilityId?.facilityName,
              roomName: roomInfo?.roomName,
              roomCapacity: roomInfo?.roomCapacity || "10",
              // 나머지 필드는 예약 정보에서 가져오는 것으로 유지
            }));
          });
      
          console.log("Formatted Data:", formattedData);
          setData(formattedData);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };
      
      fetchData();
      }, []);

  // /rooms의 모든 방 정보 가져오기
>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
  const getRooms = async () => {
    try {
      const roomsData = await apis({
        url: "/rooms",
        method: "GET",
      });
      return roomsData;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  };
<<<<<<< HEAD

  const searchList = async () => {
    try {
      const res = await apis({
        url: "/reservations",
        method: "GET",
      });

      console.log("API 응답:", res);
      console.log("옵션:", options);

      const filtered = res.filter((item) => {
        const reservationDateTime = dayjs(`${item.reservationDate} ${item.startTime}`, "YYYY-MM-DD HH:mm");

        const isFacilityMatched = item.roomId.facilityId.facilityName === options.building;
        const isCapacityMatched = parseInt(item.roomId.roomCapacity) >= parseInt(options.person);
        const isDateMatched = item.reservationDate === options.date;
        const isTimeMatched = reservationDateTime.isAfter(dayjs(`${options.date} ${options.time}`, "YYYY-MM-DD HH:mm"));

        return isFacilityMatched && isCapacityMatched && isDateMatched && isTimeMatched;
      });

      console.log("필터링된 데이터:", filtered);

      setData(filtered);
    } catch (e) {
      console.error(e);
    }
  };

=======
  
 // facilityName과 building 값의 매핑
const buildingMap = {
  main: "본관",
  5: "5호관",
  60: "60주년 기념관",
  hiTech: "하이테크",
  naville: "나빌레관",
  6: "6호관",
};

// building 값을 facilityName으로 변환하는 함수
const convertBuildingToFacilityName = (building) => {
  return buildingMap[building] || building;
};

// searchList 함수 내에서 building 값을 facilityName으로 변환하여 사용
const searchList = async (selectedOptions) => {
  try {
    const reservations = await apis({
      url: "/reservations",
      method: "GET",
    });

    const roomsData = await getRooms(); // rooms 정보 가져오기

    console.log("Reservations API Response:", reservations);
    console.log("Rooms API Response:", roomsData);
    
    const facilityName = convertBuildingToFacilityName(selectedOptions.building);

    // Filter rooms based on selected facilityName and other conditions
    const filteredRooms = roomsData.filter((room) => {
      const isFacilityMatched = room.facilityId.facilityName === facilityName;
      const isCapacityMatched = parseInt(room.roomCapacity) >= parseInt(selectedOptions.person);
      // Add other filters here, like date and time
      
      return isFacilityMatched && isCapacityMatched; // Add other conditions here
    });

    // Combine reservation data with room data
    const dataWithDetails = filteredRooms.map((room) => {
      const reservationDetails = reservations.find((reservation) => reservation.roomId.roomId === room.roomId);
      return {
        ...reservationDetails,
        facilityName: room.facilityId.facilityName,
        roomName: room.roomName,
        roomCapacity: room.roomCapacity || "10",
      };
    });

    console.log("Filtered Rooms:", dataWithDetails);

    setData(dataWithDetails);
  } catch (e) {
    console.error(e);
  }
};



  
>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
  useEffect(() => {
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

    const newDate = name === "date" && !value ? dayjs().format("YYYY-MM-DD") : value;

    setOptions({
      ...options,
      [name]: newDate,
    });
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

      console.log("Request Body:", body);

      const res = await apis({
        url: "/reservations",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log("Response:", res);

      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const onReservation = async () => {
    if (selected.length === 0) return alert("예약할 시설을 선택해주세요.");
  
    try {
      await Promise.all(
        selected.map(async (item) => {
          const body = {
            userId: 1,
            companions: null,
            roomId: item?.roomId?.roomId,
            startTime: item?.startTime,
            endTime: item?.endTime,
            reservationDate: item?.reservationDate,
          };
  
          console.log("Request Body:", body);
  
          const res = await apis({
            url: "/reservations",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
  
          console.log("Response:", res);
        })
      );
  
      alert("예약이 완료되었습니다.");
      await searchList();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='pt-40 px-20'>
      <div className='flex flex-col w-full p-10 shadow rounded-md justify-around items-center mb-20'>
        <div className='flex w-full justify-around items-center'>
<<<<<<< HEAD
          <div className='flex flex-col relative justify-center items-center'>
            <p className='font-semibold'>시설명</p>
            <div className='border border-gray-300 py-2 px-5 rounded'>
              <select name={"building"} value={options.building} onChange={onChangeOptions}>
                {BUILDINGS.map((building) => (
                  <option value={building.value}>{building.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex flex-col relative justify-center items-center'>
            <p className='font-semibold'>예상인원</p>
            <div className='border border-gray-300 py-2 px-5 rounded'>
              <select name='person' value={options.person} onChange={onChangeOptions}>
                {PERSON.map((person) => (
                  <option value={person}>{person}</option>
                ))}
              </select>
            </div>
          </div>
=======
        <div className='flex flex-col relative justify-center items-center'>
  <label htmlFor="building" className='font-semibold'>시설명</label>
  <div className='border border-gray-300 py-2 px-5 rounded'>
    <select id="building" name="building" value={options.building} onChange={onChangeOptions}>
      {BUILDINGS.map((building) => (
        <option key={building.value} value={building.value}>{building.title}</option>
      ))}
    </select>
  </div>
</div>

<div className='flex flex-col relative justify-center items-center'>
  <label htmlFor="person" className='font-semibold'>예상인원</label>
  <div className='border border-gray-300 py-2 px-5 rounded'>
    <select id="person" name="person" value={options.person} onChange={onChangeOptions}>
      {PERSON.map((person) => (
        <option key={person} value={person}>{person}</option>
      ))}
    </select>
  </div>
</div>

>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
          <div className='flex flex-col relative justify-center items-center'>
            <p className='font-semibold'>예약일</p>
            <input
              type='date'
              className='border border-gray-300 py-2 px-5 rounded'
              onChange={onChangeOptions}
              value={options.date}
              name='date'
            />
          </div>
          <div className='flex flex-col relative justify-center items-center'>
            <p className='font-semibold'>예약 시작시간</p>
            <div className='border border-gray-300 py-2 px-5 rounded flex items-center'>
              <input type='time' onChange={onChangeOptions} name='time' value={options.time} />
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <button className='bg-primary rounded px-5 py-2.5 text-white font-semibold mt-10' onClick={searchList}>
          검색
        </button>
=======
        <button className='bg-primary rounded px-5 py-2.5 text-white font-semibold mt-10' onClick={() => searchList(options)}>
          검색
        </button>

>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
      </div>

      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  ></th>
                  <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                    시설명
                  </th>
                  <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                    강의실명
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    수용인원
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
<<<<<<< HEAD
                    예약일
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
=======
>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
                    이용시간
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    예약
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {data?.map((item) => (
                  <tr key={item.reservationId}>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      <input
                        type='checkbox'
                        disabled={item.reservationStatus !== "AVAILABLE"}
                        onClick={onChangeSelected(item)}
                        checked={selected.includes(item)}
                      />
                    </td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {item?.facilityName}
                    </td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {item?.roomName}
                    </td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
<<<<<<< HEAD
                      {/* Room Capacity 표시 */}
                      {item?.roomCapacity}
                    </td>
                    {
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                        {item?.reservationDate}
                      </td>
                    }{" "}
=======
                      {item?.roomCapacity}
                    </td>
>>>>>>> 9ac89590aea5ec5198d1b48f5edcd80f2c507275
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{`${item?.startTime} ~ ${item?.endTime}`}</td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm font-bold ${COLORS[item?.reservationStatus]}`}>
                      {STATUS[item?.reservationStatus]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {data?.length > 0 && (
          <div className='w-full flex justify-center items-center'>
            <button className='bg-primary rounded px-5 py-2.5 text-white font-semibold mt-10' onClick={onReservation}>
              예약하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;