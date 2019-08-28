import axios from 'axios'

/**
 * Search current user location
 * @return {Promise}
 */
const getUserLocation = () => {

    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function (position) {

                try {

                    resolve({
                        lat: position.coords.latitude.toFixed(3),
                        lng: position.coords.longitude.toFixed(3)
                    })
                } catch (e) {
                    reject(e)
                }

            }, function () {
                reject('Error: The Geolocation service failed.')
            });
        } else {
            // Browser doesn't support Geolocation
            reject('Error: Your browser doesn\'t support geolocation.')
        }
    })
}

/**
 * Search location and weather data
 * @param {Object} coords
 * @return {Promise}
 */
const getLocationInfoAndWeatherData = coords => {

    return new Promise(async (resolve, reject) => {

        try {
            const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyAg6rz9WIBVRKGEo-Zqx9tjDxSTF4Yk6rs`);

            if (!location.data.results.length) {
                reject('Location not found!')
            }

            const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c`);
            console.log(weather)
            if (weather.data.cod * 1 !== 200) {
                reject('Weather data not returned!')
            }

            resolve({
                location: location.data.results[0],
                weather: weather.data
            })

        } catch (e) {
            reject(e)
        }

    })

}


export { getUserLocation, getLocationInfoAndWeatherData }




