let form = document.getElementById("form")
let form2 = document.getElementById('form2')
let form3 = document.getElementById('form3')
let form4 = document.getElementById('form4')


//Using FETCH()
form.addEventListener('submit', function(e) {
    e.preventDefault()
    let tempValue = document.getElementById('temp').value
    let tempValueNum = parseFloat(tempValue)
    let place = document.getElementById('place').value
    fetch('http://localhost:8080/data', {
        method: 'POST',
        body: JSON.stringify({
            value: tempValueNum,
            type: "temperature",
            unit: "C",
            time: new Date(),
            place: place
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
});
form2.addEventListener('submit', function(e) {
    e.preventDefault()
    let amount = document.getElementById('amount').value
    let amountNum = parseFloat(amount)
    let ptype = document.getElementById('type').value
    let place = document.getElementById('pPlace').value
    fetch('http://localhost:8080/data', {
        method: 'POST',
        body: JSON.stringify({
            value: amountNum,
            precipitation_type: ptype,
            type: "precipitation",
            unit: "mm",
            time: new Date(),
            place: place
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
});
form3.addEventListener('submit', function(e) {
    e.preventDefault()
    let amount = document.getElementById('speed').value
    let amountNum = parseFloat(amount)
    let direction = document.getElementById('direction').value
    let place = document.getElementById('wPlace').value
    fetch('http://localhost:8080/data', {
        method: 'POST',
        body: JSON.stringify({
            value: amountNum,
            direction: direction,
            type: "wind speed",
            unit: "m/s",
            time: new Date(),
            place: place
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
});
form4.addEventListener('submit', function(e) {
    e.preventDefault()
    let amount = document.getElementById('percentage').value
    let amountNum = parseFloat(amount)
    let place = document.getElementById('cPlace').value
    fetch('http://localhost:8080/data', {
        method: 'POST',
        body: JSON.stringify({
            value: amountNum,
            type: "cloud coverage",
            unit: "%",
            time: new Date(),
            place: place
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
});