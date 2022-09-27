function Event(time, place) {
    return {
        getTime() { return time },
        setTime(newTime) { time = newTime },
        getPlace() { return place },
        setPlace(newPlace) { place = newPlace }
    }
}

function DataType(type, unit) {
    return {
        getType() { return type },
        setType(newType) { type = newType },
        getUnit() { return unit },
        setUnit(newUnit) { unit = newUnit }
    }
}

function WeatherData(event, data_type, value) {
    return Object.assign({}, event, data_type, {
        getValue() { return value },
        setValue(newValue) { value = newValue }
    })
}

function Temperature(time, place, type, unit, value) {
    let event = Event(time, place);
    let data_type = DataType(type, unit);
    let weatherData = WeatherData(event, data_type, value);
    
    return Object.assign(weatherData, { });
}

function Wind(time, place, type, unit, value, direction) {
    let event = Event(time, place);
    let data_type = DataType(type, unit);
    let weatherData = WeatherData(event, data_type, value);


    return Object.assign(weatherData, {
        getDirection() { return direction },
        setDirection(newDirection) { direction = newDirection }
    })
}

function Precipitation(time, place, type, unit, value, precipitationType) {
    let event = Event(time, place);
    let data_type = DataType(type, unit);
    let weatherData = WeatherData(event, data_type, value);

    return Object.assign(weatherData, {
        getPrecipitation() { return precipitationType },
        setPrecipitation(newType) { precipitationType = newType }
    })
}

function CloudCoverage(time, place, type, unit, value) {
    let event = Event(time, place)
    let data_type = DataType(type, unit)
    let weatherdata = WeatherData(event, data_type, value)

    return weatherdata
}

function WeatherPrediction(obj, event, dataType, to, from) {
    function matches(weatherData) {
        return event.place === weatherData.place &&
            dataType.type === weatherData.type &&
            dataType.unit === weatherData.unit &&
            to <= weatherData.time &&
            from >= weatherData.time
    }
    return Object.assign(obj, event, dataType, {
        getTo() { return to },
        getFrom() { return from },
        matches
    })
}

function TemperaturePrediction(time, place, type, unit, from, to) {
    let event = Event(time, place);
    let data_type = DataType(type, unit);
    let weatherPrediction = WeatherPrediction(event, data_type, from, to)

    return Object.assign(weatherPrediction, { });
}

function WindPrediction(time, place, type, unit, from, to, direction) {
    let event = Event(time, place);
    let data_type = DataType(type, unit);
    let weatherPrediction = WeatherPrediction(event, data_type, to, from);

    return Object.assign(weatherPrediction, {
        getDirection() { return direction },
        setDirection(newDirection) { direction = newDirection }
    })
}

function PrecipitationPrediction(time, place, type, unit, from, to, precipitationType) {
    let event = Event(time, place);
    let data_type = DataType(type, unit);
    let weatherPrediction = WeatherPrediction(event, data_type, from, to);

    return Object.assign(weatherPrediction, {
        getPrecipitation() { return precipitationType },
        setPrecipitation(newType) { precipitationType = newType }
    })
}