import logo from './logo.svg';
import React, {useState} from "react";
import './App.css';
import {Route, Link, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactTags from 'react-tag-autocomplete';
import addReview from "./components/add-review";
import moviesList from "./components/movies-list";
import movie from "./components/movie";
import login from "./components/login";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Movie from "./components/movie";


function App() {
    const [user, setUser] = useState(null);
    async function login(user = null){
        setUser(user);
    }

    async function logout(){
        setUser(null);
    }

  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Movie reviews</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to={'/movies'}>
                                Movies
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            {
                                user ?
                                (
                                    <a onClick={logout}>Logout user</a>
                                ) :
                                    (
                                        <Link to={'/login'}>Login</Link>
                                    )
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path={"/movies"} element={moviesList()}></Route>
            <Route path={"/movies/:id/review"} element={(props) =>
                <addReview {...props} user={user}/>
            }>
            </Route>
            <Route path={"/movies/:id"} element={(props) =>
                <movie {...props} user={user}/>
            }>
            </Route>
            <Route path={"/login"} element={(props) =>
                <login {...props} login={login}/>
            }>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
