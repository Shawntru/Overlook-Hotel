function fetchData(dataType) {
  return fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/${dataType}/${dataType}`)
    .then(response => response.json())
    .then(data => data[dataType])
    .catch(error => console.log(error))
}

export { fetchData };