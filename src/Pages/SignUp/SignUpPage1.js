import React, {useState} from "react";
import {MDBInput} from 'mdbreact';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LocalizedStrings from "react-localization";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../actions/authActions";
import classnames from "classnames";
import Alert from "react-bootstrap/Alert";


const langStrings = new LocalizedStrings({
    en: {
        signUp: "Sign up",
        typeEmail: "Type your email",
        typeUsername: "Type your username",
        typePassword: "Type your password",
        typePasswordAgain: "Confirm your password",
        registerButton: "Register",
        oops: "Oops!",
        failedToLogin: "The email or password is incorrect.",
        success: "Account Created!",
        successMessage: "Please login with the your account."
    },
    gr: {
        signUp: "Εγγραφή",
        typeEmail: "Εισάγετε το email σας",
        typeUsername: "Εισάγετε το username σας",
        typePassword: "Εισάγετε τον κωδικό σας",
        typePasswordAgain: "Επαληθεύστε τον κωδικό σας",
        registerButton: "Εγγραφή",
        oops: "Ουπς!",
        failedToLogin: "Το email ή ο κωδικός είναι λάθος.",
        success: "Δημιουργήθηκε ο λογαριασμός!",
        successMessage: "Παρακαλώ συνδεθείτε με τον λογαριασμό σας."
    }
});


const SignUpPage1 = (props) => {
    const loggedIn = useSelector(state => state.auth);
    if (loggedIn.isAuthenticated){
        window.location.href = "/profile";
    }

    const lang = useSelector(state => state.language);
    langStrings.setLanguage(lang);
    const errors = useSelector(state => state.credentialErrors);
    const successMessage = Object.keys(errors).length === 0;

    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const dispatch = useDispatch();

    function onChangeData(e) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }


    function Register() {
        dispatch(registerUser({
            name: data.username, email: data.email,
            password: data.password, password2: data.confirmPassword
        }, {}))
    }

    return (
        <>
            <Container style={{color: "white"}}>
                <Row>
                    <Col md="12">
                        <form>
                            <h1 className="text-center mb-4">{langStrings.signUp}</h1>
                            <div>

                                <MDBInput id="email" label={langStrings.typeEmail} icon="envelope"
                                          group type="email" validate error="wrong" onChange={onChangeData}
                                          success="right" className="bg-dark text-white" size="lg"
                                          className1={classnames("", {
                                              invalid: errors.email
                                          })}/>

                                <Alert variant="danger">
                                    <i>{errors.email}</i></Alert>
                                <MDBInput id="username" label={langStrings.typeUsername} icon="user"
                                          group type="user" validate error="wrong" onChange={onChangeData}
                                          success="right" className="bg-dark text-white" size="lg"
                                          className1={classnames("", {
                                              invalid: errors.name
                                          })}/>
                                <Alert variant="danger">
                                    <i>{errors.name}</i></Alert>
                                <MDBInput id="password" label={langStrings.typePassword} icon="lock"
                                          group type="password" validate onChange={onChangeData}
                                          className="bg-dark text-white" size="lg" className1={classnames("", {
                                    invalid: errors.password
                                })}/>
                                <Alert variant="danger">
                                    <i>{errors.password}</i></Alert>
                                <MDBInput id="confirmPassword" label={langStrings.typePasswordAgain} icon="lock"
                                          group type="password" validate onChange={onChangeData}
                                          className="bg-dark text-white" size="lg" className1={classnames("", {
                                    invalid: errors.password2
                                })}/>
                                <Alert variant="danger">
                                    <i>{errors.password2}</i></Alert>
                            </div>

                            <div className="text-center mb-3">
                                <Button size="lg" className="w-100 outlinedText" variant="danger" onClick={Register}>
                                    {langStrings.registerButton}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignUpPage1;