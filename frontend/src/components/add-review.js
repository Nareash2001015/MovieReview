import React, {useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MovieDataService from "../services/movies";

const AddReview = (props) => {

    const location = useLocation();
    // const searchParams = new URLSearchParams(useLocation().search);

    let movie_id = useParams().id;

    let editing = false;
    let initialReviewState= "";

    const CurrentReview = location.state?.CurrentReview;

    if(CurrentReview){
        editing = true;
        initialReviewState = CurrentReview.review;
    }

    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    }
    const saveReview = () => {

        if(editing){
            console.log("try");

            let updateData = {
                review: review,
                review_id: CurrentReview._id,
                user_id: props.user.id
            };

            console.log({updateData});

            MovieDataService.updateReview(updateData)
                .then(response => setSubmitted(true))
                .catch(error => console.log({errorOnUpdatingReview: error}));
        } else {

            let insertData = {
                review: review,
                name: props.user.name,
                user_id: props.user.id,
                date: new Date(),
                movie_id: movie_id
            };

            MovieDataService.createReview(insertData)
                .then(response => {
                    setSubmitted(true);
                })
                .catch(error =>
                    console.log({errorOnCreatingReview: error}));
        }
    }


    return(
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={"/movies/" + movie_id}>
                        Back to Movie
                    </Link>
                </div>
            ) : (
                <div>
                    <Form.Group>
                        <Form.Label>
                            {editing ? "Edit " : "Create "}Review
                        </Form.Label>
                        <Form.Control
                        type={"text"}
                        value={review}
                        onChange={onChangeReview}
                        required>
                        </Form.Control>
                    </Form.Group>
                    <Button
                    variant={"primary"}
                    onClick={saveReview}>
                        Submit
                    </Button>
                </div>
            )
            }
        </div>
    )
}

export default AddReview;