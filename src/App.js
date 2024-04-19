import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const storedMessages = JSON.parse(localStorage.getItem('messages'));
  const [messages, setMessages] = useState(Array.isArray(storedMessages) ? storedMessages : []);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'messages') {
        const newMessages = JSON.parse(e.newValue);
        setMessages(Array.isArray(newMessages) ? newMessages : []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    const newMessage = { text: input, sender: currentUser };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
    setInput('');
  };

  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem('messages');
  };

  const handleUserSelect = (user, pass) => {
    setCurrentUser(user);
    setPassword(pass);
    setShowModal(false);
  };

  return (
    <Container>
      <Modal show={showModal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Select User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={(e) => setCurrentUser(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={() => handleUserSelect(currentUser, password)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row className="justify-content-end">
        <Col xs="auto">
          <h3>{currentUser}</h3>
        </Col>
      </Row>

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            
            <div>{message.sender}:{message.text}</div>
          </div>
        ))}
      </div>
      <Form.Control
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSendMessage}>Send</Button>
      <Button onClick={handleClearMessages}>Clear</Button>
    </Container>
  );
};

export default App;
