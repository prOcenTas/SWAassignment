let form = document.getElementById('form')
let form2 = document.getElementById('form2')
let form3 = document.getElementById('form3')
let form4 = document.getElementById('form4')
    //Using httpRequest
const request = new XMLHttpRequest();
request.open('POST', 'http://localhost:8080/data');
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let tempValue = document.getElementById('temp').value
    let tempValueNum = parseFloat(tempValue)
    let place = document.getElementById('place').value
    request.send(JSON.stringify({
        value: tempValueNum,
        type: "temperature",
        unit: "C",
        time: new Date(),
        place: place
    }))
});
form2.addEventListener('submit', function(e) {
    e.preventDefault()
    let amount = document.getElementById('amount').value
    let amountNum = parseFloat(amount)
    let ptype = document.getElementById('type').value
    let place = document.getElementById('pPlace').value
    request.send(JSON.stringify({
        value: amountNum,
        precipitation_type: ptype,
        type: "precipitation",
        unit: "mm",
        time: new Date(),
        place: place
    }))
});
form3.addEventListener('submit', function(e) {
    e.preventDefault()
    let amount = document.getElementById('speed').value
    let amountNum = parseFloat(amount)
    let direction = document.getElementById('direction').value
    let place = document.getElementById('wPlace').value
    request.send(JSON.stringify({
        value: amountNum,
        direction: direction,
        type: "wind speed",
        unit: "m/s",
        time: new Date(),
        place: place
    }))
});
form4.addEventListener('submit', function(e) {
    e.preventDefault()
    let amount = document.getElementById('percentage').value
    let amountNum = parseFloat(amount)
    let place = document.getElementById('cPlace').value
    request.send(JSON.stringify({
        value: amountNum,
        type: "cloud coverage",
        unit: "%",
        time: new Date(),
        place: place
    }))
});