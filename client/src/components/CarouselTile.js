import React from 'react'
import {Carousel, Button} from 'react-bootstrap'
import backgroundImage from '../test-image.jpg'
import secondImage from '../second-image.jpg'
import thirdImage from '../third-image.jpg'
import fourthImage from '../fourth-image.jpg'
import lastImage from '../not-today.jpg'

export default function CarouselTile({onButtonClick}) {

    function handleClick() {
        onButtonClick(true);
    }

    return (
        <div className="d-flex flex-column overflow-auto" style={{height: '100vh'}}>
        <Carousel indicators={false} wrap={false} interval={null}>
            <Carousel.Item interval={500} className="text-center"  style={{width: "100vw", height: "100vh", background: "grey"}}>
                <img src={backgroundImage} alt="test" className="img-thumbnail" style={{marginTop: "10%", width: "60vw", maxWidth: "400px"}}/>
                <Carousel.Caption>
                    <h3>A Look Back At Covid</h3>
                    <p>The first human cases of COVID-19, were first reported by officials in Wuhan City, China, in December 2019</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center"  style={{width: "100vw", height: "100vh", background: "grey"}} >
                <img src={secondImage} alt="test" className="img-thumbnail" width="250" style={{marginTop: "10%", width: "60vw", maxWidth: "400px"}}/>
                <Carousel.Caption>
                    <h3>Silent Spreader</h3>
                    <p>People who don't have symptoms can spread the virus. A study claimed that symptom-free infected people cause at least half of COVID-19 spread </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center"  style={{width: "100vw", height: "100vh", background: "grey"}} >
                <img src={thirdImage} alt="test" className="img-thumbnail" width="250" style={{marginTop: "10%", width: "60vw", maxWidth: "400px"}}/>
                <Carousel.Caption>
                    <h3>It Took the World by Storm</h3>
                    <p>There was a peak of 886,721 cases in one day worldwide in 2020. There was a peak of 14,031 deaths in one day worldwide in 2020</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center"  style={{width: "100vw", height: "100vh", background: "grey"}} >
                <img src={fourthImage} alt="test" className="img-thumbnail" width="250" style={{marginTop: "10%", width: "60vw", maxWidth: "400px"}}/>
                <Carousel.Caption>
                    <h3>Yet the World Moved Forward</h3>
                    <p>Multiple COVID-19 vaccines were developed. As of January 8th, 2021, 17.7 million doses of COVID-19 vaccine had been administered</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center"  style={{width: "100vw", height: "100vh", background: "grey"}} >
                <img src={lastImage} alt="test" className="img-thumbnail" width="250" style={{marginTop: "10%", width: "60vw", maxWidth: "400px"}}/>
                <Carousel.Caption>
                    <h3>Click to Take a Peek Into the Future</h3><br/>
                    <Button variant="dark" onClick={handleClick}>Learn More</Button>{' '}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    )
}
