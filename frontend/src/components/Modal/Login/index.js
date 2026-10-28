import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuthContext } from '../../../context/AuthContext';
import './index.css';

const Login = ({ show, close }) => {
    const { login } = useAuthContext();

    const [auth, setAuth] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        const result = await login(auth);
        if (result.status === 201) {
            close();
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAuth({ ...auth, [name]: value });
    }

    return (
        <>
            <Modal
                show={show}
                onHide={close}
                centered
                keyboard={false}
                className="login-modal">

                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                value={auth.email}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={auth.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button className="login-button" type="submit">
                                Log In
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Login;