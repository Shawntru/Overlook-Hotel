async function fetchData(dataType) {
  try {
    const response = await fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/${dataType}/${dataType}`)
    const data = await response.json()
    return await data[dataType];
  } catch (error) {
    return console.log(error)
  }
}

export { fetchData };