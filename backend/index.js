import app from './server.js'
import mongodb from  "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxpoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser:true //MongoDb rewrote the tool to pass URL connection strings
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await RestaurantsDAO.injectDB(client)
    //start web server
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})