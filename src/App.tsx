import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import About from './pages/About';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="container">
                <div className="row pb-3">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Learn Anything Cafe</h1>
                    </div>
                    <div className="col-lg-12">
                        <nav className="nav justify-content-center">
                            <Link to="/" className='nav-link'>Home</Link>
                            <Link to="/about" className='nav-link'>About</Link>
                        </nav>
                    </div>
                </div>
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
