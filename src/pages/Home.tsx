import React, {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Category} from "../models/category";

interface HomeProps extends PropsWithChildren<any> {
    categories: Category[];
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const {categories} = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [displayCategories, setDisplayCategories] = useState(categories);

    useEffect(() => {
        setDisplayCategories(
            categories.filter(c => c.name.toLowerCase().includes(searchTerm))
        )
    }, [categories, searchTerm])

    const categoryListItems: ReactNode[] =
        displayCategories
            .sort((a, b) => a.name.localeCompare(b.name, 'en', {ignorePunctuation: true}))
            .map(c => {
                return <li key={c.name}>
                    <Link className='text-reset' to={'/' + encodeURIComponent(c.name)}>
                        {c.name}
                    </Link>
                </li>
            });

    return (
        <>
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10 justify-content-center">
                    <form className="form-inline justify-content-center">
                        <input className="form-control form-control-sm w-75 p-4" type="text"
                               placeholder="What would you like to learn today?"
                               aria-label="Search"
                               onChange={e => setSearchTerm(e.target.value.toLowerCase())}/>
                    </form>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 justify-content-center">
                    <ul>
                        {categoryListItems}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;

