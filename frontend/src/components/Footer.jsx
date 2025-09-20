import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Il mio sito</h5>
            <p>© 2025 Tutti i diritti riservati</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#home" className="text-white me-3">Home</a>
            <a href="#about" className="text-white me-3">Chi siamo</a>
            <a href="#contact" className="text-white">Contatti</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
