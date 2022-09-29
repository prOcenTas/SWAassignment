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
        
        // let last1DayTempHorsens = getData(data, "temperature", "Horsens");
        // let tempH = last1DayTempHorsens.map(n => parseFloat(n.value));
        // let latestTempHorsens = Object.values(tempH)[Object.values(tempH).length - 1];

        // let last1DayWindHorsens = getData(data, "wind speed", "Horsens");
        // let windH = last1DayWindHorsens.map(n => parseFloat(n.value));
        // let latestWindHorsens = Object.values(windH)[Object.values(windH).length - 1];

        // let last1DayPrecipitationHorsens = getData(data, "precipitation", "Horsens");
        // let precipH = last1DayPrecipitationHorsens.map(n => parseFloat(n.value));
        // let latestPrecipHorsens = Object.values(precipH)[Object.values(precipH).length - 1];

        // let last1DayCloudHorsens = getData(data, "cloud coverage", "Horsens");
        // let cloudH = last1DayCloudHorsens.map(n => parseFloat(n.value));
        // let latestCloudHorsens = Object.values(cloudH)[Object.values(cloudH).length - 1];


        //------------------------------------------------------------------------------------------------

        // console.log("returns last days temperature objects(24): ")
        // for(let i=1;i<=25;i++){
        //     console.log("obj")
        //     const testingobj = Object.values(last1DayTempHorsens)[Object.values(last1DayTempHorsens).length - i];
        //     console.log(testingobj)
        //     const temperatureData = new Temperature(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value)
        
        //     console.log("value: "+temperatureData.getValue())
        // }


        latestTemperatureNum.textContent = "Latest temperature: " + LatestTemperatureData.getValue() + " " + LatestTemperatureData.getUnit();
        latestWindNum.textContent = "Latest wind speed: " + LatestWindData.getValue() + " " + LatestWindData.getUnit();
        latestPrecipitationNum.textContent = "Latest precipitation: " + LatestPrecipData.getValue() + " " + LatestPrecipData.getUnit();
        latestCloudNum.textContent = "Latest cloud coverage: " + LatestCloudData.getValue() + " " + LatestCloudData.getUnit();



        console.log("Latest temperature horsens: " + latestTempHorsens);
        console.log("Latest wind horsens: " + latestTempHorsens);
        console.log("Latest precipitation horsens: " + latestPrecipHorsens);
        console.log("Latest cloud coverage in horsens: " + latestCloudHorsens);

    })


})