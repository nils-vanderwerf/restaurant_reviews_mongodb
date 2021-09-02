import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js" 

const app = express()

app.use(cors())

app.use(express.json()) // Old versions of express use a body parser, here casn accept json in the body of the request

app.use("/api/v1/restaurants", restaurants) //Routes here, in a different file

//Wildcard if someone goes to a route tha's not in our routes files
app.use("*", (req, res) => res.status(404).json({ error: "Not Found"}))

export default app //import in the file that accesses the database