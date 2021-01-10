import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function PredictTile({ propCountry }) {

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
            <Container className="border mx-auto pt-2 pb-2" style={{ width: "95vw"}}>
                <Row>
                    <Col className="text-center"><h4>Total</h4>  </Col>
                    <Col className="text-center"> <h4>Recovered</h4></Col>
                    <Col className="text-center"> <h4>Deaths</h4> </Col>
                </Row>
                <Row>
                    <Col className="text-center"><p>0</p></Col>
                    <Col className="text-center"><p>0</p></Col>
                    <Col className="text-center"><p>0</p></Col>
                </Row>
                <Row className="pt-0" style={{marginTop: "-20px"}}>
                    <Col className="text-center"><small>+0</small></Col>
                    <Col className="text-center"><small>+0</small></Col>
                    <Col className="text-center"><small>+0</small></Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container className="border mx-auto pt-2 pb-2" style={{ width: "95vw" }}>
                <Row>
                    <Col className="text-center"><h4>Total</h4>  </Col>
                    <Col className="text-center"> <h4>Recovered</h4></Col>
                    <Col className="text-center"> <h4>Deaths</h4> </Col>
                </Row>
                <Row className="pb-0">
                    <Col className="text-center"><p>{count.NewConfirmed + count.TotalConfirmed}</p></Col>
                    <Col className="text-center"><p>{count.NewRecovered + count.TotalRecovered}</p></Col>
                    <Col className="text-center"><p>{count.NewDeaths + count.TotalDeaths}</p></Col>
                </Row>
                <Row className="pt-0" style={{marginTop: "-20px"}}>
                    <Col className="text-center"><small>+{count.NewConfirmed}</small></Col>
                    <Col className="text-center"><small>+{count.NewRecovered}</small></Col>
                    <Col className="text-center"><small>+{count.NewDeaths}</small></Col>
                </Row>
            </Container>)
    }
}
