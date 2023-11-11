const fetchReservation = async () => {
  try {
    const response = await fetch('http://13.125.190.19:8080/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: {userId: 8},
        companions: [4, 5],
        roomId: {roomId: 7},
        startTime: "2023-11-20T14:00:00",
        endTime: "2023-11-20T16:00:00",
        reservationDate: "2023-11-20"
      })
    });

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was an error!', error);
  }
};

  export default fetchReservation;