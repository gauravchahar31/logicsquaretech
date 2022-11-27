const path = require('path')
const cafes = require(__dirname + '/CafeNames.js')
const places = require(__dirname + '/CafePlaces.js')


function searchCafes(searchedWord){
    const desiredCafes = [], result = [];
    cafes.forEach(cafe => {
        if(cafe.name.toLowerCase().includes(searchedWord.toLowerCase()))
        desiredCafes.push(cafe)
    });
    desiredCafes.forEach(cafe => {
        for(let i=0; i<places.length; i++){
            if(cafe.place_id === places[i].id){
                result.push({...cafe, ...places[i]})
                break;
            }
        }
    })
    return result
}

module.exports  = searchCafes