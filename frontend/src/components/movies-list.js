import React, {useState, useEffect} from "react";
import MovieDataService from "../services/movies";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'

const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRatings, setSearchRatings] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);


    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);

    const retrieveMovies = () => {
        MovieDataService.getAll()
            .then(response => {
                // console.log(response.data);
                setMovies(response.data.movies);
            })
            .catch(error => {
                console.log({errorOnRetrievingMovies: error})
            })
    }

    const find = (query, by) => {
        MovieDataService.find(query, by)
            .then(response => {
                // console.log(response.data);
                setMovies(response.data.movies)
            })
            .catch(error => {
                console.log({ErrorOnFindingByQuery: error});
            })
    }

    const findByTitle = () => {
        find(searchTitle, 'title');
    }

    const findByRating = () => {
        find(searchRatings, 'rated');
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then(response => {
                // console.log(response.data.ratings);
                setRatings(["All Ratings"].concat(response.data.ratings));
            })
            .catch(error => {
                console.log({errorOnRetrievingRatings: error});
            })
    }
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
    }
    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRatings(searchRating);
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                type={"text"}
                                placeholder={"Search by title"}
                                value={searchTitle}
                                onChange={onChangeSearchTitle}>
                                </Form.Control>
                            </Form.Group>
                            <Button
                            variant={"primary"}
                            type={"button"}
                            onClick={findByTitle}>
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                as={"select"} onChange={onChangeSearchRating}>
                                    {ratings.map(rating =>
                                    {
                                        return(
                                            <option value={rating}>
                                                {rating}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                            variant={"primary"}
                            type={"button"}
                            onClick={findByRating}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {movies.map(movie => {
                        let part;
                        if(movie.poster){
                            part = <Card.Img src={movie.poster + "/100px180"} />
                        }
                        else{
                            part = <div style={{backgroundColor: "#fff"}}></div>;
                        }
                        return (
                            <Col>
                                <Card style={{width: `18rem`}}>
                                    {part}
                                    <Card.Body>
                                        <Card.Title>
                                            {movie.title}
                                        </Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Link to={"/movies/" + movie._id}>
                                            View Reviews
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default MoviesList;