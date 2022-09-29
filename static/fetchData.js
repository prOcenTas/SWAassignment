window.addEventListener("load", () => {
    let latestTemperatureNum = document.querySelector(".latestTemperatureNum")
    let latestWindNum = document.querySelector(".latestWindNum")
    let latestPrecipitationNum = document.querySelector(".latestPrecipitationNum")
    let latestCloudNum = document.querySelector(".latestCloudNum")

    let MinTempNum = document.querySelector(".MinTempNum")
    let MaxTempNum = document.querySelector(".MaxTempNum")
    let TotalPrecipNum = document.querySelector(".TotalPrecipNum")
    let AvgWindNum = document.querySelector(".AvgWindNum")

    let forecastTime = document.querySelector(".forecastTime")
    let forecastTemp = document.querySelector(".forecastTemp")
    let forecastTable = document.querySelector(".forecastTable")

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
        for (let i = 1; i <= 25; i++) {
            const testingobj = Object.values(last1DayTempHorsens)[Object.values(last1DayTempHorsens).length - i];
            const temperatureData = new Temperature(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value)
            tempArr.push(temperatureData.getValue());
        }

        const minTemp = Math.min(...tempArr);
        const maxTemp = Math.max(...tempArr);

        //------------------------------------------------------------------------------------------------
        //-----------------------------------Total preciption for the last day------------------------------
        const precipArr = [];
        for (let i = 1; i <= 25; i++) {
            const testingobj = Object.values(last1DayPrecipitationHorsens)[Object.values(last1DayTempHorsens).length - i];
            const precipData = new Precipitation(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value, testingobj.precipitationType);
            precipArr.push(precipData.getValue());
        }
        let totalPrecip = 0;
        for (var i in precipArr) {
            totalPrecip += precipArr[i];
        }

        //------------------------------------------------------------------------------------------------
        //-----------------------------------Average wind speed for the last day------------------------------
        const windArr = [];
        for (let i = 1; i <= 25; i++) {
            const testingobj = Object.values(last1DayWindHorsens)[Object.values(last1DayWindHorsens).length - i];
            const windData = new Wind(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value, testingobj.direction);
            windArr.push(windData.getValue());
        }
        let averagePrecip = 0;
        averagePrecip = windArr.reduce((a, b) => a + b, 0) / windArr.length;

        //------------------------------------------------------------------------------------------------

        latestTemperatureNum.textContent = "Latest temperature: " + LatestTemperatureData.getValue() + " " + LatestTemperatureData.getUnit();
        latestWindNum.textContent = "Latest wind speed: " + LatestWindData.getValue() + " " + LatestWindData.getUnit();
        latestPrecipitationNum.textContent = "Latest precipitation: " + LatestPrecipData.getValue() + " " + LatestPrecipData.getUnit();
        latestCloudNum.textContent = "Latest cloud coverage: " + LatestCloudData.getValue() + " " + LatestCloudData.getUnit();

        MinTempNum.textContent = "Minimum temperature: " + minTemp + " C";
        MaxTempNum.textContent = "Maximum temperature: " + maxTemp + " C";
        TotalPrecipNum.textContent = "Total preciption: " + Math.floor(totalPrecip) + " mm";
        AvgWindNum.textContent = "Average wind speed: " + Math.floor(averagePrecip) + " m/s";


        console.log("Latest temperature horsens: " + LatestTemperatureData.getValue());
        console.log("Latest wind horsens: " + LatestWindData.getValue());
        console.log("Latest precipitation horsens: " + LatestPrecipData.getValue());
        console.log("Latest cloud coverage in horsens: " + LatestCloudData.getValue());
        console.log("Total preciption for the last day in horsens: " + Math.floor(totalPrecip));
        console.log("Average wind speed for the last day in horsens: " + Math.floor(averagePrecip));

    })
    fetch(forecastApi).then(response => {
        return response.json()
    }).then(forecast => {

        let forecastData = getData(forecast, "temperature", "Horsens");
        const time = [];
        const temp = []
        for (let i = 0; i < 24; i++) {
            const forecastObj = Object.values(forecastData)[i];
            const tempPrediction = new TemperaturePrediction(forecastObj.time, forecastObj.place, forecastObj.type, forecastObj.unit, forecastObj.from, forecastObj.to);
            //For some reason I can not get From value even though it is the same as To attribute... so using object to get those values we need
            let to = tempPrediction.getTo();
            let from = tempPrediction.getFrom();

            temp.push(Math.floor((forecastObj.to + forecastObj.from) / 2));
            time.push(forecastObj.time);
        }


        console.log(time)
        console.log(temp)


        let list = document.getElementById('forecast')
        for (let i = 0; i < time.length; i++) {
            forecastTime.textContent = "Time: " + time[i];
            forecastTemp.textContent = "Temp: " + temp[i];
            let li = document.createElement('div')
            li.classList.add('forecast-list')
            let temps = document.createElement('div')
            temps.classList.add('temp')
            let times = document.createElement('div')
            times.classList.add('time')

            temps.innerHTML = `${temp[i]} &#8451`
            times.innerHTML = `${new Date(time[i]).getHours()}:00`
            li.appendChild(times)
            li.appendChild(temps)

            list.appendChild(li)
        }
    })
})