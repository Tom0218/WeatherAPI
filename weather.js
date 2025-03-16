
const city = document.getElementById("selectCity");
const cityName = document.getElementById("cityName");
const cloud = document.getElementById("cloud");
const tempL = document.getElementById("tempL");
const tempH = document.getElementById("tempH");
const rainy = document.getElementById("rainy");
//天氣圖示
const img = document.getElementById("weatherImg");



let arr = null; //避免未賦值

//天氣對應的圖片
const weatherIcons = {
    "晴時多雲": "/public/cloud2.png",
    "多雲": "/public/cloud2.png",
    "陰天": "/public/clouds.png",
    "陰時多雲": "/public/clouds.png",
    "多雲時陰": "/public/clouds.png",
    "陰短暫雨": "/public/rain.png",
    "起霧": "/public/mist.png",
    "雨天": "/public/rain.png",
    "下雪": "/public/snow.png",
    "晴天": "/public/sun.png"
};

//取得天氣資料
fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-85E35E95-A54A-405F-97DD-42E542A42DC4")
    .then(function(response){    //.then 對fetch資料做處理
        return response.json();
    })
    // .then(response => response.json()) //變數response存放天氣資訊.json()的資料
    .then(function(data){ 
        console.log('API回傳資料：',data);
        arr = data;
    })
    .catch(error =>{console.log("天氣 API 請求失敗:",error)}) //發生200 or 400錯誤時會捕捉速誤訊息並印出來，提示使用fetch時發生甚麼狀況

//監聽城市選車變更    
city.addEventListener('change',()=>{
    if(!arr){
        console.warn("天氣資料尚未載入，請稍候");
        return;
    }

    cityName.innerText = city.value
    cloud.innerText = "";
    tempL.innerText = "";
    tempH.innerText = "";
    rainy.innerText = "";
    img.style.display = "none";

    // 查找選擇的城市
    const selectedCity = city.value;
    const locationData = arr.records.location.find(loc => loc.locationName === selectedCity);
    if (!locationData) {
        console.warn("找不到該城市的天氣資料");
        return;
    }

     // 取得天氣資訊
    const weather = locationData.weatherElement[0].time[0].parameter.parameterName;
    const lowTemp = locationData.weatherElement[2].time[0].parameter.parameterName;
    const highTemp = locationData.weatherElement[4].time[0].parameter.parameterName;
    const rainChance = locationData.weatherElement[1].time[0].parameter.parameterName;

    console.log(lowTemp)
    // 更新畫面
    cloud.innerText = weather;
    tempL.innerText = `${lowTemp} ~ `;
    tempH.innerText = `${highTemp} ℃`;
    rainy.innerText = `${rainChance} %`;

      // 設定天氣圖示
    if (weatherIcons[weather]) {
        img.src = weatherIcons[weather];
        img.style.display = "block";
    }




        // for (let i=0;i<22;i++){
        //     if(arr.records.location[i].locationName==city.value){

        //         let  weather = arr.records.location[i].weatherElement[0].time[0].parameter.parameterName;
    
        //         //天氣
        //         cloud.innerText = weather;

        //         if(weather == '晴時多雲'){
        //             img.src = '/public/cloud2.png';
        //         } else if (weather == '陰天') {
        //             img.src = '/public/clouds.png';
        //         } else if (weather == '起霧'){
        //             img.src = '/public/mist.png';
        //         } else if (weather == '雨天'){
        //             img.src = '/public/rain.png';
        //         } else if (weather == '下雪'){
        //             img.src = '/public/snow.png';
        //         } else if(weather =='多雲'){
        //             img.src='/public/cloud2.png';
        //         }  else{

        //         }
                
        //         //最低溫
        //         tempL.innerText =  arr.records.location[i].weatherElement[2].time[0].parameter.parameterName +' ~ '
                
        //         //最高溫
        //         tempH.innerText =  arr.records.location[i].weatherElement[4].time[0].parameter.parameterName +' ℃ '
    
        //         //降雨機率
        //         rainy.innerHTML = arr.records.location[i].weatherElement[1].time[0].parameter.parameterName + ' % '
    
        //         tempL.style.display = 'inline'
        //         tempH.style.display = 'inline'
        //         img.style.display = 'block'
        //         break
            
        //     }
        //         cloud.innerText = '';
        //         tempL.innerText = '';
        //         tempH.innerText = '';
        //         rainy.innerText = '';
        //         img.style.display = 'none';
            
        // }
    
})





    