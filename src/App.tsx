import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import CategoryPage from "./pages/Category";
import AddResourceModal from "./components/AddResourceModal";
import ReactModal from "react-modal";

export let base_url = '';
if (process.env.NODE_ENV === 'development') {
    base_url = 'http://localhost:8080'
} else if (process.env.NODE_ENV === 'production') {
    base_url = 'https://api.learnanything.cafe'
}

ReactModal.setAppElement('#root');

function App() {
    const [categories, setCategories] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetch(base_url + '/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    useEffect(() => {
        const sortedCategories = categories.sort();
        setCategories(sortedCategories);
    }, [categories]);

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <Router>
            <div className="container">
                <button type="button" className="btn btn-dark add" onClick={() => setModalIsOpen(true)}>Add Resource</button>
                <div className="row pb-3">
                    <div className="col-lg-12 text-center">
                        <Link className='text-reset text-decoration-none' to='/'>
                            <h1 className="mt-5">Learn Anything Cafe</h1>
                        </Link>
                        <p className='text-muted mb-0'>crowd sourced learning resources</p>
                        <p className="font-weight-light">by <a className='text-reset'
                                                               href='https://twitter.com/phillipchaffee'><u>@phillipchaffee</u></a>
                        </p>
                    </div>
                </div>
                <Switch>
                    <Route path="/:categoryName" children={<CategoryPage categories={categories}/>}/>
                    <Route path="/">
                        <Home categories={categories}/>
                    </Route>
                </Switch>
                <AddResourceModal categories={categories} modalIsOpen={modalIsOpen} closeModal={closeModal}/>
            </div>
        </Router>
    );
}

export default App;