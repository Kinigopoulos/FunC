import React from "react";
import {Nav, Navbar, NavDropdown, Button, Col, DropdownButton, DropdownItem} from 'react-bootstrap';

import logo from "./logoTransparent.gif"
import LocalizedStrings from "react-localization";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "reactstrap";
import Row from "react-bootstrap/Row";
import {changeLanguage} from "../actions";

import './Header.css'
import defaultProfileImage from '../Pages/Profile/profileDefault.png'
import {logoutUser} from "../actions/authActions";

const langStrings = new LocalizedStrings({
    en: {
        home: "Home",
        pricing: "Pricing",
        courses: "Courses",
        signIn: "Sign in",
        signUp: "Sign up",
        contactus: "Contact Us",
        logOut: "Log out",
        DashboardLayout: "Dashboard"
    },
    gr: {
        home: "Αρχική",
        pricing: "Τιμοκατάλογος",
        courses: "Μαθήματα",
        signIn: "Σύνδεση",
        signUp: "Εγγραφή",
        contactus: "Επικοινωνία",
        logOut: "Αποσύνδεση",
        DashboardLayout: "Tαμπλό"
    }
});

function Header() {
    const lang = useSelector(state => state.language);
    const dispatch = useDispatch();

    const loggedIn = useSelector(state => state.auth);
    const profileImage = defaultProfileImage;

    const logOutAction = () => {
        dispatch(logoutUser())
    };
    let premiumLogo = "";
    if (loggedIn.isAuthenticated) {
        if (loggedIn.user.isPremium) {
            premiumLogo = " logoInverted";
        }
    }

    langStrings.setLanguage(lang);
    return (
        <Navbar bg="dark" expand="xl" variant="dark" sticky="top" className="Header">
            <DropdownButton title={<i className="fas fa-globe"/>} variant="dark" size="lg" id="dropdown-basic">
                <DropdownItem onClick={() => dispatch(changeLanguage('en'))}>English</DropdownItem>
                <DropdownItem onClick={() => dispatch(changeLanguage('gr'))}>Ελληνικά</DropdownItem>
            </DropdownButton>
            <Navbar.Brand href='/'>
                <img src={logo} className={"logoImage" + premiumLogo} alt="Home Page"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
                <Container fluid={true}>
                    <Row className="m-auto">
                        <Nav text="light" className="navMenu">
                            <Col xs={0}>
                                <Button variant="dark" size="lg" className="text-white menuItem" href='/'>
                                    {langStrings.home}
                                </Button>
                            </Col>
                            <Col xs={0}>
                                <Button variant="dark" size="lg" className="text-white menuItem" href="/pricing">
                                    {langStrings.pricing}
                                </Button>
                            </Col>
                            <Col xs={0}>
                                <DropdownButton
                                    variant="dark" size="lg"
                                    title={langStrings.courses} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/cpp/intro">C++</NavDropdown.Item>
                                    <NavDropdown.Item href="/java/intro">Java</NavDropdown.Item>
                                    <NavDropdown.Item href="/sql/intro">SQL</NavDropdown.Item>
                                </DropdownButton>

                            </Col>
                            <Col xs={0}>
                                <Button variant="dark" size="lg" className="text-white menuItem" href="/contactus">
                                    {langStrings.contactus}
                                </Button>
                            </Col>
                        </Nav>
                    </Row>
                </Container>

                {loggedIn.isAuthenticated &&
                <>
                    <Col>
                        <div className="anchorImage mb-1">
                            <a href={"/profile"}>
                                <img src={profileImage} alt="Profile" className="profileHeaderIcon"/>
                            </a>
                        </div>
                    </Col>
                    <Col>
                        <Button
                            href="/"
                            variant="danger"
                            className="text-white outlinedText menuItem"
                            onClick={logOutAction}
                            size="lg">
                            {langStrings.logOut}
                        </Button>
                    </Col>
                </>
                }

                {!loggedIn.isAuthenticated &&
                <>
                    <Col>
                        <Button
                            href="/signIn"
                            variant="success"
                            className="text-white outlinedText menuItem"
                            size="lg">
                            {langStrings.signIn}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            href="/signUp"
                            variant="danger"
                            className="text-white outlinedText menuItem"
                            size="lg">
                            {langStrings.signUp}
                        </Button>
                    </Col>
                </>
                }

            </Navbar.Collapse>
        </Navbar>
    )

}

export default Header;