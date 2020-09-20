import React, {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Category} from "../models/category";

interface HomeProps extends PropsWithChildren<any> {
    categories: Category[];
    loading: boolean;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const {categories, loading} = props;

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
                return <Link className='text-reset' to={'/' + encodeURIComponent(c.name)}>
                    <div className="card mb-2">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col-6">
                                    {c.name}
                                </div>
                                <div className="col-6 text-right">
                                    Resources: {c.resourceCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
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

            {loading &&
            <div className="col-lg-12 text-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            }

            {!loading &&
            <div className="row justify-content-center">
                <div className="col-lg-10 justify-content-center">
                    {categoryListItems}
                </div>
            </div>
            }
        </>
    )
}

export default Home;

