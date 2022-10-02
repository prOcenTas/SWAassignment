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

function getData(dataSet, type, place) {
    if (dataSet === null || dataSet === undefined) {
        return new Error("Data set empty");
    } else if (type === null || type === undefined) {
        return dataSet.filter((ds) => ds.type === type)
    } else if (place === null || place === undefined) {
        return dataSet.filter((ds) => ds.place === place)
    } else
        return dataSet.filter((ds) => ds.type === type && ds.place === place)
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName("tabcontent")
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
    }
    tablinks = document.getElementsByClassName("tablinks")
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "")
    }

    document.getElementById(cityName).style.display = "block"
    evt.currentTarget.classList.toggle("active")

}