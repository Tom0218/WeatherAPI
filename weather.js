
const city = document.getElementById("selectCity");
const cityName = document.getElementById("cityName");
const cloud = document.getElementById("cloud");
const tempL = document.getElementById("tempL");
const tempH = document.getElementById("tempH");
const rainy = document.getElementById("rainy");
//天氣圖示
const img = document.getElementById("weatherImg");



let arr = [];

fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-85E35E95-A54A-405F-97DD-42E542A42DC4")
    .then(function(response){    //.then 對fetch資料做處理
        return response.json();
    })
    // .then(response => response.json()) //變數response存放天氣資訊.json()的資料
    .then(function(data){ 
        console.log(data);
        arr = data;
    })
    .catch(error =>{console.log(error)}) //發生200 or 400錯誤時會捕捉速誤訊息並印出來，提示使用fetch時發生甚麼狀況

city.addEventListener('change',()=>{
    cityName.innerText = city.value
        for (let i=0;i<22;i++){
            if(arr.records.location[i].locationName==city.value){

                let  weather = arr.records.location[i].weatherElement[0].time[0].parameter.parameterName;
    
                //天氣
                cloud.innerText = weather;

                if(weather == '晴時多雲'){
                    img.src = '/public/cloud2.png';
                } else if (weather == '陰天') {
                    img.src = '/public/clouds.png';
                } else if (weather == '起霧'){
                    img.src = '/public/mist.png';
                } else if (weather == '雨天'){
                    img.src = '/public/rain.png';
                } else if (weather == '下雪'){
                    img.src = '/public/snow.png';
                } else {
                    img.src = '/public/cloud2.png';
                }
                
                //最低溫
                tempL.innerText =  arr.records.location[i].weatherElement[2].time[0].parameter.parameterName +' ~ '
                
                //最高溫
                tempH.innerText =  arr.records.location[i].weatherElement[4].time[0].parameter.parameterName +' ℃ '
    
                //降雨機率
                rainy.innerHTML = arr.records.location[i].weatherElement[1].time[0].parameter.parameterName + ' % '
    
                tempL.style.display = 'inline'
                tempH.style.display = 'inline'
                img.style.display = 'block'
                break
            
            }
                cloud.innerText = '';
                tempL.innerText = '';
                tempH.innerText = '';
                rainy.innerText = '';
                img.style.display = 'none';
            
        }
    
})





    