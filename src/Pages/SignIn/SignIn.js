import React, { Component } from 'react';
import 'whatwg-fetch';
import Profile from '../Profile/Profile';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import {Button, Col, Container, Row} from "react-bootstrap";
import {MDBInput} from "mdbreact";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);


    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }


    if (!token) {
      return (
        <Container style={{color: "white"}}>
          <Row>
            <Col md="12">
              <form>
                <h1 className="text-center mb-4">Sign in</h1>
                <div className="grey-text">
                  <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                            success="right" className="bg-dark text-white" size="lg"/>
                  <MDBInput label="Type your password" icon="lock" group type="password" validate
                            className="bg-dark text-white" size="lg"/>
                </div>
                <div className="text-center mb-3">
                  <Button size="lg"
                          href="/profile"
                          className="w-100 outlinedText"
                          variant="success">
                    Login
                  </Button>

                </div>
              </form>
            </Col>
          </Row>
        </Container>
      );
    }
      if (!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
        </div>
      );
    }

    return (
      <div>
        <Profile/>
      </div>
    );
  }
}

export default SignIn;
