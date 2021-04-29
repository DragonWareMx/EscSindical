import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import "../../css/app.css";
import Ejemplo from '../views/Ejemplo';
import Layout from './Layout';

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/inicio">
                        <h1>Este es el inicio</h1>
                    </Route>
                    <Route exact path="/ejemplo">
                        <Ejemplo />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
