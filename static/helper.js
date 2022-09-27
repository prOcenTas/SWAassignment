function dateIsNDaysBeforeToday(date, today, nDays) {
    let monthCurrentDate = today.getMonth()
    let monthDate = date.getMonth()
    let dayCurrentDate = today.getDate()
    let dayDate = date.getDate()
        //if the dates have the same month 
    if (monthCurrentDate === monthDate && dayCurrentDate > dayDate) {
        return dayCurrentDate - dayDate <= nDays
    }
    //if current month is jan = 0 wont work. for time saving i am not comparing years
    if (monthCurrentDate - monthDate === 1) {
        if (monthDate % 2 === 0 && !(monthCurrentDate === 7)) {
            return (31 + dayCurrentDate) - dayDate <= nDays
        } else {
            return (30 + dayCurrentDate) - dayDate <= nDays
        }
    }
}

function getSpecificData(dataSet, type, place, lastNdays) {
    if (dataSet === null || dataSet === undefined)
        return new Error("Data set empty")
    else if (type === null || type === undefined)
        return dataSet.filter((el) => el.place === place && dateIsNDaysBeforeToday(new Date(el.time), new Date(), lastNdays))
    else if (place === null || place === undefined)
        return dataSet.filter((el) => el.type === type && dateIsNDaysBeforeToday(new Date(el.time), new Date(), lastNdays))
    else if (lastNdays === null || lastNdays === undefined)
        return dataSet.filter((el) => el.type === type && el.place === place)
    else
        return dataSet.filter((el) => el.type === type && el.place === place && dateIsNDaysBeforeToday(new Date(el.time), new Date(), lastNdays))
}

function getData(dataSet,type, place){
    if (dataSet === null || dataSet === undefined){ 
        return new Error("Data set empty");
    }
    else if (type === null || type === undefined){
        return dataSet.filter((ds) => ds.type === type)
    }
    else if (place === null || place === undefined){
        return dataSet.filter((ds) => ds.place === place)
    }
    else 
        return dataSet.filter((ds) => ds.type === type && ds.place === place)
}