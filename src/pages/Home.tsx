import React from "react";

const Home: React.FC = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-4 justify-content-center">
                <form className="form-inline justify-content-center">
                    <input className="form-control form-control-sm w-75" type="text" placeholder="Search"
                           aria-label="Search"/>
                </form>
            </div>
        </div>
    )
}

export default Home;

