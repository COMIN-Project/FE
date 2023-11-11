const getReservations = async () => {
  try {
    const response = await fetch("https://koreanjson.com/users"); // 서버의 실제 엔드포인트를 사용해야 합니다.

    if (!response.ok) {
      throw new Error("Failed to fetch reservations");
    }

    const reservations = await response.json();

    // 여기서 가져온 데이터를 출력하여 확인할 수 있습니다.
    console.log("Fetched reservations:", JSON.stringify(reservations, null, 2));

    return reservations.map(reservation => ({
      selectedPlace: reservation.name,
      selectedClass: reservation.email,
      selectedDate: reservation.phone,
      startTime: reservation.website,
      endTime: reservation.city,
      buttonText: reservation.username,
    }));
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

export default getReservations;