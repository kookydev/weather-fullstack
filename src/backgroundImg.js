const request = require('request')

const backgroundImg = (orientation, width, height, search, callback) => {
    let random = Math.floor(Math.random() * 9)
    const url = `https://api.unsplash.com/search/photos?query=${search}&orientation=${orientation}&page=${random+1}&client_id=10f83ace24ada0ef5d3450694a099e0abb4e992aa646878517bb06775cfa6df5`

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to usplash image API', undefined)
        } else if (response.body.error) {
            callback(`unsplash API query error`, undefined)
        } else {

            callback(undefined, {
                imgURL: `${response.body.results[random].urls.raw}&fit=crop&crop=edges&w=${width}&h=${height}`,
                authorName: response.body.results[random].user.name,
                authorURL: response.body.results[random].user.links.html
            })
        }
    })

}

module.exports = backgroundImg