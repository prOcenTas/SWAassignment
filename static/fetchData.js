const forecastApi = 'http://localhost:8080/forecast'
const dataApi = 'http://localhost:8080/data'
window.addEventListener("load", () => {
    getDataForCity("Horsens");
    getForecastForCity("Horsens");
    openCity('Horsens','Horsens');
})

    function getDataForCity(cityName) {
        fetch(dataApi).then(response => {
            return response.json()
        }).then(data => {
    
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------Latest measurment of each kind------------------------------
            let last1DayTemp = getData(data, "temperature", cityName)
            let latestTemp = Object.values(last1DayTemp)[Object.values(last1DayTemp).length - 1]
            const LatestTemperatureData = new Temperature(latestTemp.time, latestTemp.place, latestTemp.type, latestTemp.unit, latestTemp.value)
    
            let last1DayWind = getData(data, "wind speed", cityName)
            let latestWind = Object.values(last1DayWind)[Object.values(last1DayWind).length - 1]
            const LatestWindData = new Wind(latestWind.time, latestWind.place, latestWind.type, latestWind.unit, latestWind.value, latestWind.direction)
    
            let last1DayPrecipitation = getData(data, "precipitation", cityName)
            let latestPrecip = Object.values(last1DayPrecipitation)[Object.values(last1DayPrecipitation).length - 1]
            const LatestPrecipData = new Precipitation(latestPrecip.time, latestPrecip.place, latestPrecip.type, latestPrecip.unit, latestPrecip.value, latestPrecip.precipitationType)
    
            let last1DayCloud = getData(data, "cloud coverage", cityName)
            let latestCloud = Object.values(last1DayCloud)[Object.values(last1DayCloud).length - 1]
            const LatestCloudData = new CloudCoverage(latestCloud.time, latestCloud.place, latestCloud.type, latestCloud.unit, latestCloud.value)
    
            //------------------------------------------------------------------------------------------------
            //-----------------------------------Minimum/Maximum temperature for the last day------------------------------
            const tempArr = []
            // returns last days temperature objects(24)
            for (let i = 1; i <= 25; i++) {
                const testingobj = Object.values(last1DayTemp)[Object.values(last1DayTemp).length - i]
                const temperatureData = new Temperature(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value)
                tempArr.push(temperatureData.getValue())
            }
    
            const minTemp = Math.min(...tempArr)
            const maxTemp = Math.max(...tempArr)
    
            //------------------------------------------------------------------------------------------------
            //-----------------------------------Total preciption for the last day------------------------------
            const precipArr = []
            for (let i = 1; i <= 25; i++) {
                const testingobj = Object.values(last1DayPrecipitation)[Object.values(last1DayTemp).length - i]
                const precipData = new Precipitation(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value, testingobj.precipitationType)
                precipArr.push(precipData.getValue())
            }
            let totalPrecip = 0
            for (var i in precipArr) {
                totalPrecip += precipArr[i]
            }
    
            //------------------------------------------------------------------------------------------------
            //-----------------------------------Average wind speed for the last day------------------------------
            const windArr = []
            for (let i = 1; i <= 25; i++) {
                const testingobj = Object.values(last1DayWind)[Object.values(last1DayWind).length - i]
                const windData = new Wind(testingobj.time, testingobj.place, testingobj.type, testingobj.unit, testingobj.value, testingobj.direction)
                windArr.push(windData.getValue())
            }
            let averagePrecip = 0
            averagePrecip = windArr.reduce((a, b) => a + b, 0) / windArr.length
    
            //------------------------------------------------------------------------------------------------
            document.querySelector(".latestTemperatureNum").innerHTML = `Temperature: ${LatestTemperatureData.getValue()} &#176${LatestTemperatureData.getUnit()}`
            document.querySelector(".latestWindNum").innerHTML = `Wind speed: ${LatestWindData.getValue()} ${LatestWindData.getUnit()}`
            document.querySelector(".latestPrecipitationNum").innerHTML = `Precipitation: ${LatestPrecipData.getValue()} ${LatestPrecipData.getUnit()}`
            document.querySelector(".latestCloudNum").innerHTML = `Cloud coverage: ${LatestCloudData.getValue()} ${LatestCloudData.getUnit()}`
    
            document.querySelector(".minTempNum").innerHTML = `Minimum temperature: ${minTemp} &#8451`
            document.querySelector(".maxTempNum").innerHTML = `Maximum temperature: ${maxTemp} &#8451`
            document.querySelector(".totalPrecipNum").innerHTML = `Total preciption: ${Math.floor(totalPrecip)} mm`
            document.querySelector(".avgWindNum").innerHTML = `Average wind speed: ${Math.floor(averagePrecip)} m/s`
    
    
        })
    }
    function getForecastForCity(cityName){
        fetch(forecastApi).then(response => {
            return response.json()
        }).then(forecast => {
    
            let forecastData = getData(forecast, "temperature", cityName);
    
            const time = [];
            const temp = []
            for (let i = 0; i < 24; i++) {
                const forecastObj = Object.values(forecastData)[i];
                const tempPrediction = new TemperaturePrediction(forecastObj.time, forecastObj.place, forecastObj.type, forecastObj.unit, forecastObj.from, forecastObj.to);
                //For some reason I can not get From value even though it is the same as To attribute... so using object to get those values we need
                // let to = tempPrediction.getTo();
                // let from = tempPrediction.getFrom();
    
                temp.push(Math.floor((forecastObj.to + forecastObj.from) / 2));
                time.push(forecastObj.time);
    
                // console.log(from)
                // console.log(to)
            }
    
    
            //------------------------------------------------------------------------------------------------
            //-----------------------------------Forecast for the next 24h------------------------------
    
            let list = document.getElementById('forecast')
            list.innerHTML =""
            for (let i = 0; i < time.length; i++) {
    
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
    
    }
    function openCity(evt, cityName) {
        var i, tabcontent, tablinks
        tabcontent = document.getElementsByClassName("tabcontent")
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none"
        }
        tablinks = document.getElementsByClassName("tablinks")
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "")
        }
        document.getElementById(cityName).style.display = "block"
        evt.currentTarget.className += " active"
    }

