import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import CategoryPage from "./pages/Category";
import {data} from "./data";

function App() {
    const [categories, setCategories] = useState(data);

    useEffect(() => {
        const sortedCategories = categories.sort();
        setCategories(sortedCategories);
    }, [categories]);

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
                        <About/>
                    </Route>
                    <Route path="/:categoryName" children={<CategoryPage categories={categories}/>}/>
                    <Route path="/">
                        <Home categories={categories}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
