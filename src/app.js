const express = require("express")
const path = require("path")
const geocode = require("./geocode")
const forecast = require("./forecast")
const backgroundImg = require("./backgroundImg")
const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory))





app.get("/weather", (req, res) => {
    if (!req.query.address) {
        console.log('Please provide an address')
    } else {
        geocode(req.query.address, (error, response) => {
            if (error) {
                return console.log(error)
            }
            forecast(response.latitude, response.longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }

                backgroundImg(req.query.orientation, req.query.w, req.query.h, forecastData.icon, (error, imgData) => {
                    if (error) {
                        return console.log(error)
                    }
                    res.send({
                        location: response.location,
                        forecast: forecastData,
                        img: imgData
                    })
                })



            })
        })
    }
})





app.listen(port, () => {
    console.log(`listening on port ${port}`)
})