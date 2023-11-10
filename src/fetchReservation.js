const fetchReservation = async (reservationData) => {
    try {
      const response = await fetch("http://13.125.190.19:8080/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save reservation");
      }
  
      const newReservation = await response.json();
      console.log("New reservation:", newReservation);
      // 예약 성공 후의 추가 동작을 원한다면 여기에 추가
  
      return newReservation; // 필요에 따라 예약 정보를 반환할 수도 있습니다.
    } catch (error) {
      console.error("Error saving reservation:", error);
      throw error; // 예약 실패 시에는 에러를 다시 throw하여 상위에서 처리할 수 있도록 합니다.
    }
  };
  
  export default fetchReservation;