//const weathermodel = require('../model/weathermodel.js')


window.addEventListener("load", () => {
    let latestTemperatureNum = document.querySelector(".latestTemperatureNum")
    let latestWindNum = document.querySelector(".latestWindNum")
    let latestPrecipitationNum = document.querySelector(".latestPrecipitationNum")
    let latestCloudNum = document.querySelector(".latestCloudNum")


    const forecastApi = 'http://localhost:8080/forecast'
    const dataApi = 'http://localhost:8080/data'

    fetch(dataApi).then(response => {
        return response.json()
    }).then(data => {

        let last1DayTempHorsens = getSpecificData(data, "temperature", "Horsens", 1);
        let tempH = last1DayTempHorsens.map(el => parseFloat(el.value));
        //let tempH = last1DayTempHorsens.map(el => parseFloat(el.value));
        let latestTempHorsens = Object.values(tempH)[Object.values(tempH).length - 1]; //returns the last/latest value

        //const temperatureData = new Temperature("2022-09-25T22:00:00.000Z", "Horsens", "temperature", "C", tempH)
        
        const temperatureData = new Temperature();
        let testing = getData(data, "temperature", "Horsens");
        let testingobj = Object.values(testing)[Object.values(testing).length - 1]
        let testingH = testingobj.map(el => parseFloat(el.value));
        let testigLatest = Object.values(testingH)[Object.values(testingH).length - 1];

        
        console.log(testing)
        console.log(testingobj)

        let last1DayWindHorsens = getSpecificData(data, "wind speed", "Horsens", 1);
        let windH = last1DayWindHorsens.map(el => parseFloat(el.value));
        let latestWindHorsens = Object.values(windH)[Object.values(windH).length - 1];

        let last1DayPrecipitationHorsens = getSpecificData(data, "precipitation", "Horsens", 1);
        let precipH = last1DayPrecipitationHorsens.map(el => parseFloat(el.value));
        let latestPrecipHorsens = Object.values(precipH)[Object.values(precipH).length - 1];

        let last1DayCloudHorsens = getSpecificData(data, "cloud coverage", "Horsens", 1);
        let cloudH = last1DayCloudHorsens.map(el => parseFloat(el.value));
        let latestCloudHorsens = Object.values(cloudH)[Object.values(cloudH).length - 1];


        latestTemperatureNum.textContent = "Latest temperature: " + latestTempHorsens + "°C";
        latestWindNum.textContent = "Latest wind speed: " + latestWindHorsens + "m/s";
        latestPrecipitationNum.textContent = "Latest precipitation: " + latestPrecipHorsens + "mm";
        latestCloudNum.textContent = "Latest cloud coverage: " + latestCloudHorsens + "%";



        console.log("Latest temperature horsens: " + latestTempHorsens);
        console.log("Latest wind horsens: " + latestTempHorsens);
        console.log("Latest precipitation horsens: " + latestPrecipHorsens);
        console.log("Latest cloud coverage in horsens: " + latestCloudHorsens);

    })


})