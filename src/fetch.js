let api = {

  fetchData(dataType) {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/${dataType}/${dataType}`)
      .then(response => response.json())
      .then(data => data[dataType])
      .catch(error => console.log(error))
  },

  createReservation(userId, inputDate, roomNum) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": userId,
        "date": inputDate,
        "roomNumber": roomNum
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  },

  deleteReservation(reservationId) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": reservationId
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }
}

export default api;