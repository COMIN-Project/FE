const getReservations = async () => {
  try {
    const response = await fetch("http://13.125.190.19:8080/api/reservations"); // 서버의 실제 엔드포인트를 사용해야 합니다.

    if (!response.ok) {
      throw new Error("Failed to fetch reservations");
    }

    const reservations = await response.json();

    console.log("Fetched reservations:", JSON.stringify(reservations, null, 2));

    return reservations.map(reservation => ({
      selectedPlace: reservation.roomId.facilityId.facilityName,
      selectedClass: reservation.roomId.roomName,
      selectedDate: reservation.reservationDate,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      buttonText: reservation.username,
    }));
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

export default getReservations;