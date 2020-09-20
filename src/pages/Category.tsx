import React, {PropsWithChildren, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Category} from "../models/category";
import {Resource} from "../models/resource";
import {base_url} from "../App"

interface CategoryProps extends PropsWithChildren<any> {
    categories: Category[];
}

const CategoryPage: React.FC<CategoryProps> = (props: CategoryProps) => {
    let {categoryName} = useParams();
    categoryName = decodeURIComponent(categoryName);
    let category = props.categories.find(c => c.name === categoryName);

    const [resources, setResources] = useState(new Array<Resource>());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (category) {
            fetch(`${base_url}/resources?categoryId=${category.id}`)
                .then(response => response.json())
                .then(data => setResources(data))
                .then(() => setTimeout(() => setLoading(false), 200));
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

    const resourceListItems = resources
        .sort((a, b) => a.name.localeCompare(b.name, 'en', {ignorePunctuation: true}))
        .map(r => {
            return (
                <a className='text-reset' href={r.link}>
                    <div className="card mb-2">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col-6">
                                    {r.name}
                                </div>
                                <div className="col-6 text-right">
                                    {r.link}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            )
        })

    return (
        <>
            <div className="row mt-2 mb-4">
                <div className="col-lg-12 text-center">
                    <h3>{category.name} Resources</h3>
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
            <div className="row justify-content-center mt-2">
                <div className="col-lg-10">
                    {resourceListItems}
                </div>
            </div>
            }
        </>
    )
}

export default CategoryPage;