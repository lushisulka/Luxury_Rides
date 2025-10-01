import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuthContext } from '../../../context/AuthContext';
import './index.css';

const Register = ({ show, close }) => {
    const { register } = useAuthContext();

    const [auth, setAuth] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const handleRegister = async (event) => {
        event.preventDefault();
        const result = await register(auth);
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
                    <Form onSubmit={handleRegister}>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                name='firstname'
                                value={auth.firstname}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                name='lastname'
                                value={auth.lastname}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>

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
                                Register
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Register;