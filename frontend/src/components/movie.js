import React, {useEffect, useState} from "react";
import MovieDataService from "../services/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import {Link, useParams} from "react-router-dom";

function Media() {
    return null;
}

const Movie = (props) => {
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated:"",
        Reviews:[]
    });

    const {id} = useParams();

    const getMovie = (id) => {
        MovieDataService.get(id)
            .then(response =>{
                console.log(response.data.moviesSelected);
                setMovie(response.data.moviesSelected);
                }
            )
            .catch(error =>
            console.log({errorOnGetMovieByID: error}));
        // console.log(movie);
    }

    useEffect(() => {
        getMovie(id);
    }, []);

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
                                    <Link to={"/movies/" + id + "/review"}>
                                        Add review
                                    </Link>
                                </Card.Body>
                                <br/>
                            </Card>
                            <h2>Reviews</h2>
                            <br/>
                            {movie.Reviews.map((review, index) => {
                                return(
                                    <Media key={index}>
                                        <Media.Body>
                                            <h5>
                                                {review.name + " review on " + review.date}
                                            </h5>
                                            <p>
                                                {review.review}
                                            </p>
                                            {props.user && props.user_id === review.user_id &&
                                                <Row>
                                                    <Col>
                                                        <Link to={{pathname: "/movies/" + id + "/review",
                                                                    state: {CurrentReview: review}}}>
                                                            Edit
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Button variant={"link"}>
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            }
                                        </Media.Body>
                                    </Media>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
}

export default Movie;