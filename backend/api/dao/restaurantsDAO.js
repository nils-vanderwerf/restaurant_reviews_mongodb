let restaurants

export default class Restaurants {
    //connect to restaurants database, as soon as server starts
    // If restaurants reference is already filled, return it
    // else, try to fill it with a reference tio the database
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                `Unable to establish a connection handle in restaurantsDAO: ${e}`,
            )
        }
    }

    static async getRestaurants({
        filters = null, 
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"]} } //text is not a DB field, set up in
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } } 
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor

        try {
            //find all the restaurants that match the query
            cursor = await restaurants
            .find(query)
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return 
        }
        }
    }
}