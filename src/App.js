import React from 'react';
import './styles.css';
import {Provider} from 'react-redux';
import {createStore} from "redux";
import reducers from "./reducers";
import {saveState, loadState} from "./localStorage";
import {BrowserRouter, Switch} from 'react-router-dom';
import Route from "react-router-dom/Route";

//Page Imports
import Home from './Pages/Home/Home';
import Pricing from "./Pages/Pricing/Pricing";
import Profile from "./Pages/Profile/Profile";
import SignIn from "./Pages/SignIn/SignIn"
import SignUp from "./Pages/SignUp/SignUp";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AccountSettings from "./Pages/AccountSettings/AccountSettings";
import Dash from "./Pages/AdminDashboard/Dash";
import cpp from "./Pages/Courses/cplusplus/cpp";
import java from "./Pages/Courses/java/java";
import helloWord from "./Pages/Courses/cplusplus/Lessons/helloWord";
import TestLayout from "./Pages/Courses/TestLayout";
import input from "./Pages/Courses/cplusplus/Lessons/input"

const persistedState = loadState();
const store = createStore(reducers, persistedState);
store.subscribe(() => {
    saveState(store.getState());
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            costumers: []
        }
    }

    componentDidMount() {
        fetch('/api/costumers')
            .then(res => res.json())
            .then(customers => this.setState({customers}, () => console.log('This is a back-end test, ignore it...', customers)));
    }

    render() {
        return (
            <div className="AppContainer">{/*This className forces footer to stay at the bottom of the page*/}
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/pricing" component={Pricing}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/accountSettings" component={AccountSettings}/>
                            <Route exact path="/signIn" component={SignIn}/>
                            <Route exact path="/signUp" component={SignUp}/>
                            <Route exact path="/contactUs" component={ContactUs}/>
                            <Route exact path="/cplusplus" component={cpp}/>
                            <Route exact path="/dashboard/home" component={Dash}/>
                            <Route exact path="/java" component={java}/>
                            <Route exact path ="/helloWord" component={helloWord}/>
                            <Route exact path="/testExample" component={TestLayout}/>
                            <Route exact path ="/input" component={input}/>


                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        )
    }
}

export default App;
