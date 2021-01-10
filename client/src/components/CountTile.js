import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function CountTile() {
    return (
        <Container className="border mx-auto pt-2 pb-2" style={{width: "95vw"}}>
            <Row>
                <Col className="text-center"> Active </Col>
                <Col className="text-center"> Recovered</Col>
                <Col className="text-center"> Deaths </Col>
            </Row>
            <Row>
                <Col className="text-center">185</Col>
                <Col className="text-center">765</Col>
                <Col className="text-center">256</Col>
            </Row>
            <Row>
                <Col className="text-center"> Total: 1206</Col>
            </Row>
        </Container>
    )
}
