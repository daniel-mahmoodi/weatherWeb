const getLocation = async() => {
    var url1 = `http://ip-api.com/json/?fields=country,city,lat,lon,timezone`;
    const response = await fetch(url1)
    const data = await response.json()
    return data;
}
const getWeather = async(lat, lon) => {
    var url2 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9ee2aba5b77980f74328066d79a5f802`
    const response = await fetch(url2)
    const data = await response.json()
    return data;
}

function getDeyOrNight() {
    let DayOrNight
    let d = new Date()
    if (d.getHours() >= 6 && d.getHours() <= 19) {
        return DayOrNight = 'Day'
    } else {
        return DayOrNight = 'Night'
    }
}

const getIcon = (weMain) => {
    let icon
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`
            break;
        case 'Rain':
            icon = `${weMain}.svg`
            break;
        case 'Snow':
            icon = `${weMain}.svg`
            break;
        case 'Clear':
            const DayOrNigh = getDeyOrNight()
            icon = `${weMain}-${DayOrNigh}.svg`
            break;
        case 'Clouds':
            icon = `${weMain}.svg`
            break;
        case 'Atmosphare':
            icon = `${weMain}.png`
            break;
    }
    return icon
}

function getTemp(weTemp) {
    var K = weTemp
    var F = (K - 273.15) * 9 / 5 + 32
    var C = K - 273.15
    return temp = { kel: Math.floor(K), far: Math.floor(F), can: Math.floor(C) }
}

const loti = document.querySelector('.timezone')
const icon = document.querySelector('.icon')
const dese = document.querySelector('.degree-section')
const deg = document.querySelector('.degree-section h2')
const unit = document.querySelector('.degree-section span')
const tede = document.querySelector('.temperature-description')


getLocation()
    .then(locData => {
        const timeZone = locData.timezone
        loti.textContent = timeZone
        return getWeather(locData.lat, locData.lon)
    }).then(weData => {
        const weTemp = weData.main.temp
        const weMain = weData.weather[0].main
        const weDes = weData.weather[0].description

        const iconName = getIcon(weMain)
        icon.innerHTML = `<img src='icons/${iconName}'></img>`
        deg.textContent = Math.floor(weTemp)
        unit.textContent = 'K'
        dese.addEventListener('click', () => {
            if (unit.textContent == 'K') {
                deg.textContent = getTemp(weTemp).far
                unit.textContent = 'F'
            } else if (unit.textContent == 'F') {
                deg.textContent = getTemp(weTemp).can
                unit.textContent = 'C'
            } else {
                deg.textContent = getTemp(weTemp).kel
                unit.textContent = 'K'
            }
        })
        tede.textContent = weDes

    })