
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
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAuth({ ...auth, [name]: value });
    };

    return (
        <Modal
    show={show}
    onHide={close}
    centered
    keyboard={false}
    backdrop={true}
    backdropClassName="auth-modal-backdrop"
    className="register-modal"
    style={{ zIndex: 1060 }}
>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleRegister}>

                    <Form.Group className="mb-3" controlId="firstname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            className="register-input"
                            type="text"
                            placeholder="First name"
                            name="firstname"
                            value={auth.firstname}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            className="register-input"
                            type="text"
                            placeholder="Last name"
                            name="lastname"
                            value={auth.lastname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="register-email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            className="register-input"
                            type="email"
                            placeholder="name@example.com"
                            name="email"
                            value={auth.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="register-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className="register-input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={auth.password}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button
                            className="register-button"
                            type="submit"
                        >
                            Register
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Register;
