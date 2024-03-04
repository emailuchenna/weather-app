function renderApp(){
    const input = document.querySelector("input");
    const dataList = Array.from(document.querySelectorAll(".data"));
    const myKey = "ad83591b0d2a4f83a9d133144240403";
    const btn = document.querySelector("#btn")
    const weatherIcon = document.querySelector(".weather-icon");
    


    btn.addEventListener("click", () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${myKey}&q=${input.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const weatherurl= `${data.current.condition.icon}`
                weatherIcon.style.backgroundImage = `url(http:${weatherurl})`
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
                    data.textContent += ` ${result[count]}`;
                    count++;
                })

                
            })
    })

    
}

renderApp()