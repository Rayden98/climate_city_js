const container =  document.querySelector('.container');
const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario')

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather);
})

function searchWeather(e){
    e.preventDefault();

    // Validate
    const city = document.querySelector('#ciudad').value;
    const country = document.querySelector('#pais').value;

    if (city === "" || country ==='' ){
        // was en error
        showError('Both fields are mandatory');

        return;
    }
    // Consult the API
    consultAPI(city, country)
}

function showError(message){
    const alert = document.querySelector('.bg-red-100')

    if(!alert){
        // Create an alert 
        const alert = document.createElement('div');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 
        'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alert.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${message}</span>`;

        container.appendChild(alert);

        // Delete the alert after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000)

    }
    
}
function consultAPI(city, country){

    const appId = 'b0b1d774e2da26d8abfcb37ddc99a575';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`

    Spinner(); // Show a spinner of load

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            cleanHTML(); // clean the previous HTML
            console.log(data)
            if (data.cod === "404"){
                showError("City didn't found")
                return;
            }

            // print the response in the html
            showWeather(data);
        })
}

function showWeather(data){
    const {name, main: { temp, temp_max, temp_min }} = data;
    const centigrade = kevilToCentigrade(temp);
    const max = kevilToCentigrade(temp_max);
    const min = kevilToCentigrade(temp_min);

    const nameCity = document.createElement('p');
    nameCity.textContent = `Climate in ${name}`;
    nameCity.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrade} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`
    tempMin.classList.add('text-xl');

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('text-center', 'text-white');
    resultDiv.appendChild(nameCity);
    resultDiv.appendChild(actual);
    resultDiv.appendChild(tempMax);
    resultDiv.appendChild(tempMin);



    result.appendChild(resultDiv);
}
const kevilToCentigrade = grades => parseInt(grades - 273.15);

function cleanHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

function Spinner(){

    cleanHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    result.appendChild(divSpinner);
}