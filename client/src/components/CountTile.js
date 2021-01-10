import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function CountTile({ propCountry }) {

    const [count, setCount] = useState(null);


    useEffect(() => {
        if (propCountry !== undefined && propCountry.length !== 0) {
            fetch(`/api/cases/${propCountry}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setCount(result);
                    },
                    (error) => {
                    }
                );
        }
    }, [propCountry])

    if (count === undefined || count === null) {

    return (
        <Container className="border mx-auto pt-2 pb-2" style={{ width: "95vw" }}>
            <Row>
                <Col className="text-center"> Total </Col>
                <Col className="text-center"> Recovered</Col>
                <Col className="text-center"> Deaths </Col>
            </Row>
            <Row>
                <Col className="text-center">0</Col>
                <Col className="text-center">0</Col>
                <Col className="text-center">0</Col>
            </Row>
        </Container>
    )
    } else {
        return (
        <Container className="border mx-auto pt-2 pb-2" style={{ width: "95vw" }}>
            <Row>
                <Col className="text-center"> Total </Col>
                <Col className="text-center"> Recovered</Col>
                <Col className="text-center"> Deaths </Col>
            </Row>
            <Row>
                <Col className="text-center">{count.TotalConfirmed}</Col>
                <Col className="text-center">{count.TotalRecovered}</Col>
                <Col className="text-center">{count.TotalDeaths}</Col>
            </Row>
        </Container>)  
    }
}
