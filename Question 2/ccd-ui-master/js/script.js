const cafesAPI = "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json";
const placesAPI = "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json";

let cafeData = [];

async function getData(url){
    let response = await fetch(url);
    return await response.json();
}

async function combineData (cafes, places){
   try{
        cafes = cafes.cafes;
        places = places.places;
        cafes.forEach(cafe => {
            for(let i=0; i<places.length; i++){
                if(cafe.location_id === places[i].id){
                    cafeData.push({...cafe, ...places[i]})
                    break;
                }
            }
        });
   }
   catch{
    console.log("Error: API Error")
   }
}

function showData(showCafes, keyPressed){
    const table = document.getElementById('cafeTable').getElementsByTagName("tbody")[0];
    if(keyPressed === true){
        table.innerHTML = "";
    }
    let counter = 1;
    showCafes.forEach(cafe => {
        table.insertRow().innerHTML = 
        "<tr id='tableRow'>" + 
            "<td class='column1'>"+ counter +"</td>" +
            "<td class='column2'>"+ cafe.name +"</td>" +
            "<td class='column3'>"+ cafe.locality +"</td>" +
            "<td class='column4'>"+ cafe.postal_code +"</td>" +
            "<td class='column5'>"+ cafe.lat +"</td>" +
            "<td class='column6'>"+ cafe.long +"</td>" + 
        "</tr>";
        counter++;
    });
}

async function showAllCafes(){
    try{
        const cafes = await getData(cafesAPI);
        const places = await getData(placesAPI);
        if(cafes.error === true || places.error === true){
            console.log("API Error");
        }
        combineData(cafes, places)
        showData(cafeData, false)
    }
    catch{
        console.log("Data Gathering Error")
    }
}

function getSearchedCafes(){
    const keyValue = document.getElementById('searchBox').value;
    const desiredCafes = [];
    cafeData.forEach(cafe => {
        if(cafe.name.toLowerCase().includes(keyValue.toLowerCase()))
        desiredCafes.push(cafe)
    });
    showData(desiredCafes, true);
}