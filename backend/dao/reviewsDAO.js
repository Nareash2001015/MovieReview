import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews)
            return
        try{
            reviews = await conn.db(process.env.dbName).collection('review');
        } catch (error){
            console.log({reviewsInject: error});
        }

    }

    static async addReview(movieID, user, review, date){
        try{
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: new ObjectId(movieID)
            }
            return await reviews.insertOne(reviewDoc)
        }catch{error}{
            console.log({errorInsertReview: error})
        }
    }

    static async updateReview(reviewID, userID, review, date){
        try{
            const updateResponse = await reviews.updateOne(
                {
                    user_id: userID,
                    _id: new ObjectId(reviewID)
                },
                {
                    $set:
                    {
                        review: review,
                        date: date
                    }
                }
            );
            return updateResponse;
        } catch(error){
            console.log({errorUpdateReview: error});
        }
    }

    static async deleteReview(reviewID, userID){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewID),
                user_id: userID
            })
            return deleteResponse
        } catch (error){
            console.log({errorDeleteReview: error})
        }

    }
}