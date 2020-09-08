import React, {PropsWithChildren, ReactNode} from "react";
import {Category} from "../data";
import {Link} from "react-router-dom";

interface HomeProps extends PropsWithChildren<any> {
    categories: Category[];
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const {categories} = props;

    const categoryListItems: ReactNode[] =
        categories.map(c => {
            return <li>
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
                               aria-label="Search"/>
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

