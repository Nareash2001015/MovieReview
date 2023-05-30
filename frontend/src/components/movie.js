import React, {useEffect, useState} from "react";
import MovieDataService from "../services/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Moment from "moment";

const Movie = (props) => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated:"",
        Reviews:[]
    });


    const getMovie = (id) => {
        MovieDataService.get(id)
            .then(response =>{
                setMovie(response.data.moviesSelected);
                }
            )
            .catch(error =>
            console.log({errorOnGetMovieByID: error}));
        // console.log(movie);
    }

    const deleteReview = (review_id, index) => {
        let user_id = props.user.id;
        MovieDataService.deleteReview(review_id, user_id)
            .then(response => {
                setMovie((prevState) =>{
                    prevState.Reviews.splice(index, 1)
                    return({
                        ...prevState
                    })
                })
            })
            .catch(error =>
            console.log({errorOnDeletingReview: error}));
    }

    useEffect(() => {
        getMovie(id);
    }, [useParams().id]);

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Image src={movie.poster + "/100px250"} fluid></Image>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header as={"h5"}>
                                    {movie.title}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {movie.plot}
                                    </Card.Text>
                                    {
                                        props.user && (
                                            <Link to={"/movies/" + id + "/review"}>
                                                Add review
                                            </Link>
                                        )
                                    }
                                </Card.Body>
                                <br/>
                            </Card>
                            <h2>Reviews</h2>
                            <br/>
                            {movie.Reviews.map((review, index) => {
                                return(
                                    <Card key={index}>
                                        <Card.Body>
                                            <h5>
                                                {review.name + " review on " + Moment(review.date).format("Do MMMM YYYY")}
                                            </h5>
                                            <p>
                                                {review.review}
                                            </p>
                                            {props.user && props.user.id === review.user_id &&
                                                <Row>
                                                    <Col>
                                                        <Link to={"/movies/" + id + "/review"} state={{CurrentReview: review}}>
                                                            <Button variant={"link"}>
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Button variant={"link"}
                                                                onClick={() => {
                                                                    deleteReview(review._id, index)
                                                                }}>
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            }
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
}

export default Movie;