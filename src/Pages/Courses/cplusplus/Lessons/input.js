import React, {useEffect, useState} from "react";import Header from "../../../../Header/Header";import Sidebar from "../../sidebar";import {Button, Container} from "react-bootstrap";import Row from "react-bootstrap/Row";import Col from "react-bootstrap/Col";import {useSelector} from "react-redux";import LocalizedStrings from "react-localization";import axios from "axios";import Footer from "../../../../Footer/Footer";let langStrings = new LocalizedStrings({    en: {        test: "Take a Test!",        previous: "🠈 Previous Lesson",        next: "Next Lesson 🠊",    },    gr: {        test: "Κάνε το Τεστ!",        previous: "🠈 Προηγούμενο Μάθημα",        next: "Επόμενο Μάθημα 🠊"    }});function Try() {    const language = useSelector(state => state.language);    const [posts, setPosts] = useState([]);    const [previousLink, setPreviousLink] = useState('/');    const [nextLink, setNextLink] = useState('/');    console.log(posts);    let myUrl = window.location.pathname.split("/");    let lang = myUrl[1];    let tit = myUrl[2].replace(/-/g, " ");    console.log(myUrl);    function displayBlogPost() {        if (posts.length === 0) {            return {__html: " "};        }        if (language === 'en') {            return {__html: posts.text};        } else {            return {__html: posts.eltext};        }    }    useEffect(() => {        async function getBlogPost() {            axios.get('/lesson/' + lang + '/' + tit)                .then((response) => {                    const data = response.data;                    setPosts(data[0]);                    return displayBlogPost()                })                .catch(() => {                    alert('Error retrieving data!!!');                });        }        getBlogPost().then()    }, []);    const [items, setItems] = useState([]);    useEffect(() => {        async function getTitles() {            if (language === "en") {                axios.get('/lesson/titles')                    .then((response) => {                        const data = response.data["lessons"];                        setItems(data);                        const keyLesson = data.findIndex(lesson => lesson.title === tit);                        if (keyLesson !== 0){                            setPreviousLink("/" + lang + "/" + data[keyLesson - 1].url)                        }                        if (keyLesson !== data.length - 1){                            setNextLink("/" + lang + "/" + data[keyLesson + 1].url)                        }                        console.log('Data has been received!!');                    })                    .catch(() => {                        alert('Error retrieving data!!!');                    });            } else {                axios.get('/lesson/eltitles')                    .then((response) => {                        const data = response.data;                        setItems(data["lessons"]);                    })                    .catch(() => {                        alert('Error retrieving data!!!');                    });            }        }        getTitles().then()    }, []);    return (        <>            <Header/>            <Sidebar Lessons={items}/>            <div className="lessons courses">                <h1 className="title superRainbowText outlineForRainbowTextTHICC mb-5">{(language === 'en' && posts.title) || posts.eltitle}</h1>                <div id="htmldngrs" dangerouslySetInnerHTML={displayBlogPost()}/>                <Container className="mt-3">                    <Button variant="dark" size="lg" className="test" href="/for_text">                        <b className="text"> {langStrings.test}</b>                    </Button>                </Container>                <br/>                <br/>                <Container fluid={true} className="mb-5">                    <Row>                        <Col>                            <Button variant="light" size="lg" hidden={previousLink==='/'}                                    className="previous" href={previousLink}>                                <b className="text"> {langStrings.previous}</b>                            </Button>                        </Col>                        <Col>                            <Button variant="light" size="lg" hidden={nextLink==='/'}                                    className="next" href={nextLink}>                                <b className="text"> {langStrings.next}</b>                            </Button>                        </Col>                    </Row>                </Container>            </div>            <Footer/>        </>    )}export default Try;