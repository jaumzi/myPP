import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from '../views/Home/Home';
import Login from '../views/Login/Login';
import Room from '../views/Room/Room';
import { AppContext } from './AppConfig';

function PrivateRoute({ children, ...rest }) {
    const { userLogged, firebaseInitialized } = useContext(AppContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (firebaseInitialized & !!userLogged) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

function Routes() {

    return (<>
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/room/:id">
                    <Room />
                </PrivateRoute>
                <PrivateRoute path="/">
                    <Home />
                </PrivateRoute>
                <Route path="*">
                    <h1>Página não encontrada!</h1>
                </Route>
            </Switch>
        </Router>
    </>);
}

export default Routes;