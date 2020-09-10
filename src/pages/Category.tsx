import React, {PropsWithChildren, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Category} from "../models/category";
import {Resource} from "../models/resource";

interface CategoryProps extends PropsWithChildren<any> {
    categories: Category[];
}

const CategoryPage: React.FC<CategoryProps> = (props: CategoryProps) => {
    let {categoryName} = useParams();
    categoryName = decodeURIComponent(categoryName);
    let category = props.categories.find(c => c.name === categoryName);
    let [resources, setResources] = useState(new Array<Resource>());

    useEffect(() => {
        if (category) {
            fetch(`http://localhost:3030/resources?categoryId=${category.id}`)
                .then(response => response.json())
                .then(data => setResources(data));
        }
    }, [category]);

    if (category === undefined) {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>404</h3>
                </div>
            </div>
        )
    }

    const resourceListItems = resources.sort().map(r => {
        return <li key={r.name}>
            <a className='text-reset' href={r.link}>
                {r.name}
            </a>
        </li>
    })

    return (
        <>
            <div className="row mt-2 mb-4">
                <div className="col-lg-12 text-center">
                    <h3>{category.name}</h3>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-6 offset-3">
                    <h5>Resources</h5>
                    <ul>
                        {resourceListItems}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CategoryPage;