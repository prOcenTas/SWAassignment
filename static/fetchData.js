//const weathermodel = require('../model/weathermodel.js')


window.addEventListener("load", () => {
    let latestTemperatureNum = document.querySelector(".latestTemperatureNum")
    let latestWindNum = document.querySelector(".latestWindNum")
    let latestPrecipitationNum = document.querySelector(".latestPrecipitationNum")
    let latestCloudNum = document.querySelector(".latestCloudNum")

    let MinTempNum = document.querySelector(".MinTempNum")
    let MaxTempNum = document.querySelector(".MaxTempNum")
    let TotalPrecipNum = document.querySelector(".TotalPrecipNum")
    let AvgWindNum = document.querySelector(".AvgWindNum")


    const forecastApi = 'http://localhost:8080/forecast'
    const dataApi = 'http://localhost:8080/data'

    fetch(dataApi).then(response => {
        return response.json()
    }).then(data => {

        //-----------------------------------------------------------------------------------------------
        //-----------------------------------Latest measurment of each kind------------------------------
        let last1DayTempHorsens = getData(data, "temperature", "Horsens");
        let latestTempHorsens = Object.values(last1DayTempHorsens)[Object.values(last1DayTempHorsens).length - 1];
        const LatestTemperatureData = new Temperature(latestTempHorsens.time, latestTempHorsens.place, latestTempHorsens.type, latestTempHorsens.unit, latestTempHorsens.value);

        let last1DayWindHorsens = getData(data, "wind speed", "Horsens");
        let latestWindHorsens = Object.values(last1DayWindHorsens)[Object.values(last1DayWindHorsens).length - 1];
        const LatestWindData = new Wind(latestWindHorsens.time, latestWindHorsens.place, latestWindHorsens.type, latestWindHorsens.unit, latestWindHorsens.value, latestWindHorsens.direction);

        let last1DayPrecipitationHorsens = getData(data, "precipitation", "Horsens");
        let latestPrecipHorsens = Object.values(last1DayPrecipitationHorsens)[Object.values(last1DayPrecipitationHorsens).length - 1];
        const LatestPrecipData = new Precipitation(latestPrecipHorsens.time, latestPrecipHorsens.place, latestPrecipHorsens.type, latestPrecipHorsens.unit, latestPrecipHorsens.value, latestPrecipHorsens.precipitationType);

        let last1DayCloudHorsens = getData(data, "cloud coverage", "Horsens");
        let latestCloudHorsens = Object.values(last1DayCloudHorsens)[Object.values(last1DayCloudHorsens).length - 1];
        const LatestCloudData = new CloudCoverage(latestCloudHorsens.time, latestCloudHorsens.place, latestCloudHorsens.type, latestCloudHorsens.unit, latestCloudHorsens.value);

        //------------------------------------------------------------------------------------------------
        //-----------------------------------Minimum/Maximum temperature for the last day------------------------------
        const tempArr = [];
        // returns last days temperature objects(24)
        for(let i=1;i<=25;i++){
            const testingobj = Object.values(last1DayTempHorsens)[Object.values(last1DayTempHorsens).length - i];
            const temperatureData = new Temperature(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value)
            tempArr.push(temperatureData.getValue());
        }

        const minTemp = Math.min(...tempArr);
        const maxTemp = Math.max(...tempArr);   
        
        //------------------------------------------------------------------------------------------------
        //-----------------------------------Total preciption for the last day------------------------------
        const precipArr = [];
        for(let i=1;i<=25;i++){
            const testingobj = Object.values(last1DayPrecipitationHorsens)[Object.values(last1DayTempHorsens).length - i];
            const precipData = new Precipitation(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value, testingobj.precipitationType);
            precipArr.push(precipData.getValue());
        }
        let total = 0;
        for (var i in precipArr) {
            total += precipArr[i];
          }

        //------------------------------------------------------------------------------------------------
        //-----------------------------------Average wind speed for the last day------------------------------


        latestTemperatureNum.textContent = "Latest temperature: " + LatestTemperatureData.getValue() + " " + LatestTemperatureData.getUnit();
        latestWindNum.textContent = "Latest wind speed: " + LatestWindData.getValue() + " " + LatestWindData.getUnit();
        latestPrecipitationNum.textContent = "Latest precipitation: " + LatestPrecipData.getValue() + " " + LatestPrecipData.getUnit();
        latestCloudNum.textContent = "Latest cloud coverage: " + LatestCloudData.getValue() + " " + LatestCloudData.getUnit();

        MinTempNum.textContent = "Minimum temperature: " + minTemp + " C";
        MaxTempNum.textContent = "Maximum temperature: " + maxTemp + " C";



        console.log("Latest temperature horsens: " + LatestTemperatureData.getValue());
        console.log("Latest wind horsens: " + LatestWindData.getValue());
        console.log("Latest precipitation horsens: " + LatestPrecipData.getValue());
        console.log("Latest cloud coverage in horsens: " + LatestCloudData.getValue());
        console.log("Total preciption for the last day in horsens: " + Math.floor(total));


    })


})