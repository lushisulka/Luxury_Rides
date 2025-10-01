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
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                name='email'
                                value={auth.email}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                name='password'
                                value={auth.password}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                Login
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Login;