import React, {PropsWithChildren, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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

    const openLink = (link: string) => {
        window.open(link);
    }

    const vote = (e: React.MouseEvent<HTMLElement, MouseEvent>, resource: Resource, addToScore: number) => {
        e.stopPropagation();

        if (addToScore === 0) {
            return;
        }

        resource.score += addToScore;

        fetch(base_url + '/resources', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resource)
        });
    }

    const resourceListItems = resources
        .sort((a, b) => a.name.localeCompare(b.name, 'en', {ignorePunctuation: true}))
        .map(r => {
            return (
                <div className="card mb-2 resource text-reset" onClick={() => openLink(r.link)} key={r.name}>
                    <div className="card-body text-decoration-none">
                        <div className="row justify-content-between">
                            <div className="col-4">
                                {r.name}
                            </div>
                            <div className="col-6 text-center">
                                {r.link}
                            </div>
                            <div className="col-2 text-right">
                                <i className="fas fa-angle-up mr-1 vote" onClick={e => vote(e, r, 1)}/>
                                {r.score}
                                <i className="fas fa-angle-down ml-1 vote" onClick={e => vote(e, r, -1)}/>
                            </div>
                        </div>
                    </div>
                </div>
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