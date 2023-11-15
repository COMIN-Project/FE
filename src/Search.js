import React from "react";

import dayjs from "dayjs";

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

  const searchList = async () => {
    try {
      const roomsRes = await apis({
        url: "/rooms",
        method: "GET",
      });

      const reservationsRes = await apis({
        url: "/reservations",
        method: "GET",
      });

      console.log(roomsRes);
      console.log(reservationsRes);

      const roomData = roomsRes.map((room) => {
        const matchingReservation = reservationsRes.find(
          (reservation) => reservation.roomId === room.roomId
        );

        return {
          ...room,
          reservationStatus: matchingReservation ? STATUS.RESERVED : STATUS.AVAILABLE,
        };
      });

      const filtered = roomData.filter((item) => {
        const date = dayjs(`${options.date} ${options.time}`, "YYYY-MM-DD HH:mm");
        const startTime = dayjs(`${options.date} ${item.startTime}`, "YYYY-MM-DD HH:mm");
        const endTime = dayjs(`${options.date} ${item.endTime}`, "YYYY-MM-DD HH:mm");
        return date.isBefore(endTime) && date.isAfter(startTime);
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

  const onChangeSelected = (roomId) => () => {
    const index = selected.findIndex((selectedItem) => selectedItem.roomId === roomId);
    if (index === -1) {
      setSelected([...selected, { roomId }]);
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
    <div className='pt-40 px-20'>
      <div className='flex flex-col w-full p-10 shadow rounded-md justify-around items-center mb-20'>
        <div className='flex w-full justify-around items-center'>
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
        <button className='bg-primary rounded px-5 py-2.5 text-white font-semibold mt-10' onClick={searchList}>
          검색
        </button>
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
                    이름
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                    수용인원
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
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
                        onClick={onChangeSelected(item.roomId.roomId)}
                        checked={selected.some((selectedItem) => selectedItem.roomId === item.roomId.roomId)}
                      />
                    </td>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {`${item?.roomId?.facilityId?.facilityName} - ${item?.roomId?.roomName}`}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{item?.roomId?.roomCapacity}</td>
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
