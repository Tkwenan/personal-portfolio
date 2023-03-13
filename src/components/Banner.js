import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";//icon
import headerImg from "../assets/img/header-img.svg";//header
import 'animate.css-react';
import TrackVisibility from "react-on-screen";


export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0); //loopNum indicates which word from toRotate array is currently displayed. Initially set to zero 
    const [isDeleting, setIsDeleting] = useState(false); //isDeleting state -> either true or false i.e. is the word being typed out on screen or being deleted. set to false bc we start by typing the word
    const toRotate = ["Software Engineer", "Web Developer", "Technical Writer"]; //list of words to display
    const [text, setText] = useState(''); //indicates the portion of the word being displayed
    const [delta, setDelta] = useState(300 - Math.random() * 100); //use delta to how long between one letter being typed and the next
    const period = 2000; //how long we wait to transition from one word to the next
    const [index, setIndex] = useState(1);

    //function that types/deletes
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker)};
    },[text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        //update state to updated text
        setText(updatedText);

        if (isDeleting){
            setDelta(prevDelta => prevDelta / 2);
        }

        if(!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                        {({ isVisible}) => 
                        <div class={isVisible ? "animate__animated animate__fadeIn" : "" }>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{`Hi! I'm Tracy`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer"]'><span className="wrap">{text}</span></span></h1>
                        <p>About me: </p>
                        <button onClick={() => console.log('connect')}>Let's connect <ArrowRightCircle size={25}/></button>
                        </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                    <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}