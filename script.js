

function renderApp(){
    const input = document.querySelector("input");
    const dataList = Array.from(document.querySelectorAll(".data"));
    const myKey = "ad83591b0d2a4f83a9d133144240403";
    const btn = document.querySelector("#btn")
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherDetails = document.querySelector(".weather-details");
    const city = document.querySelector(".location");
    const main = document.querySelector(".main");
    
    const backgroundImages = ["./images/weather-background.PNG", "./images/weather-background2.PNG", 
                              "./images/weather-background3.PNG", "./images/weather-background4.PNG",
                              "./images/weather-background5.PNG"
                             ];
    let index = 0;
    main.style.backgroundImage = `url(${backgroundImages[index]})`;
    main.style.transition = "background-image 1s ease-out";
    

    setInterval(() => {
        if(index > backgroundImages.length-1) index = 0;
        
        main.style.backgroundImage = `url(${backgroundImages[index]})`;
        index++;
    }, 5000)
    


    btn.addEventListener("click", () => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${myKey}&q=${input.value}`)
            .then(response => {

                if(response.ok) return response.json();

                else if(response.status >= 400 && response.status < 500){
                    throw new Error(`Oops! Error: ${response.status}. ${input.value} not found. Confirm location: ${input.value}`)
                }

                else if(response.status >= 500 && response.status < 600){
                    throw new Error(`Error: ${response.status}. Server error, try again later`)
                }
            })
            .then(data => {

                const weatherurl= `${data.current.condition.icon}`
                city.innerHTML = `${input.value.toUpperCase()} located in ${data.location.country}`
                weatherDetails.style.display = `block`;
                weatherIcon.style.backgroundImage = `url(https:${weatherurl})`
                weatherIcon.style.backgroundRepeat = `no-repeat`
                let count = 0;
                const result = [data.current.humidity,
                                data.current.temp_c,
                                data.current.condition.text,
                                data.current.wind_kph,
                                data.location.localtime,
                                data.current.last_updated
                               ];

                dataList.forEach(data => {

                    if(count > result.length-1){
                        return;
                    }
                    data.textContent = "";
                    data.textContent += `${result[count]}`;
                    count++;
                    input.value = ``
                })

                
            })
            .catch(err => { 
                weatherDetails.style.display = `block`;
                weatherDetails.textContent = err.name 
            })
    })

    
}

renderApp()