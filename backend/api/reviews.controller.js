import ReviewsDAO from "../dao/reviewsDAO.js"

export default class  ReviewsController{

    static async apiPostReview(req, res, next) {
        try {
            const movieID = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date();
            const ReviewResponse = await ReviewsDAO.addReview(
                movieID,
                userInfo,
                review,
                date
            )
            res.json({
                status: "Success"
            })
        } catch (error) {
            res.status(500).json({errorPostReview: error});
        }
    }

    static async apiUpdateReview(req, res, next){
        try {
            const reviewID = req.body.review_id;
            const review = req.body.review;

            const date = new Date();

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewID,
                req.body.user_id,
                review,
                date
            )

            var {error} = ReviewResponse
            if(error){
                res.status.json({
                    error
                })
            }

            if(ReviewResponse.modifiedCount === 0){
                throw new error("unable to update review. User may not be original poster");
            }

            res.status(200).json({Success: "Success"});

        }catch (error){
            res.status(500).send({errorPutRequest : error})
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewID = req.body.review_id;
            const userID = req.body.user_id;

            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewID,
                userID
            )

            res.json({status: "Success"})
        } catch (error){
            res.status(200).json({error: error});
        }

    }
}
