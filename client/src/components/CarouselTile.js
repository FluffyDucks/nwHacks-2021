import React from 'react'
import {Carousel, Image} from 'react-bootstrap'
import backgroundImage from '../test-image.jpg'

export default function CarouselTile() {
    return (
        <div className="d-flex flex-column overflow-auto" style={{height: '100vh'}}>
        <Carousel indicators="false" wrap="false" interval={null} >
            <Carousel.Item interval={500} className="text-center"  style={{width: "100vw", height: "100vh", background: "grey"}}>
                <img src={backgroundImage} alt="test" className="img-thumbnail" width="250" style={{marginTop: "100px"}}/>
                <Carousel.Caption  style={{bottom: "100px"}}>
                    <h3>A Look Back At Covid</h3>
                    <p>The first human cases of COVID-19, were first reported by officials in Wuhan City, China, in December 2019</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center"  style={{width: "100vw", height: "100vh", background: "grey"}} >
                <img src={backgroundImage} alt="test" className="img-thumbnail" width="250" style={{marginTop: "100px"}}/>
                <Carousel.Caption  style={{bottom: "100px"}}>
                    <h3>Silent Spreader</h3>
                    <p>People who don't have symptoms can spread the virus. A study claimed that symptom-free infected people cause at least half of COVID-19 spread </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    )
}
