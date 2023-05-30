import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const Login = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [id, setID] = useState("");

    const changeName = e => {
        const name = e.target.value;
        setName(name);
    }

    const changeID = (e) => {
        const id = e.target.value;
        setID(id);
    }

    const login = () => {
        props.login({name: name, id: id});
        navigate('/');
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"Enter username"}
                        value={name}
                        onChange={changeName}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        ID
                    </Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"Enter ID"}
                        value={id}
                        onChange={changeID}>
                    </Form.Control>
                </Form.Group>
                <Button variant={"primary"} onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login;