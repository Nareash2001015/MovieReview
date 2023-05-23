import mongodb from "mongodb";

const ObjectID = mongodb.ObjectId;

let movies;

export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {
            return;
        }
        try {
            movies = await conn.db(process.env.dbName).collection('movies');
        } catch (error) {
            console.log(error);
        }
    }

    static async getMovies({ filters = null, page = 0, moviesPerPage = 20 } = {}) {
        let query;
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } };
            } else if ("rated" in filters) {
                query = { "rated" : filters['rated'] };
            }
        }

        let cursor;

        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return { moviesList, totalNumMovies };
        } catch (error) {
            console.log(error);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }

    static async getMoviesByID(id) {
            try {
                return await movies.aggregate([
                    {
                        $match:
                            {
                                _id: new ObjectID(id)
                            }
                    },
                    {
                        $lookup:
                            {
                                from: "review",
                                localField: "_id",
                                foreignField: "movie_id",
                                as: "Reviews"
                            }
                    }
                ]).next();
            } catch (error) {
                console.log({errorOnGetMovieByID: error});
                throw error;
            }
    }

    static async getRatings(id){
        let ratings = [];
        try{
            ratings = await movies.distinct("rated");
            return ratings;
        } catch (error) {
            console.log({errorOnGetRating: error});
            return ratings;
        }
    }

}