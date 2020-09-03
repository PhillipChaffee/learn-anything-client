import React, {PropsWithChildren} from "react";
import {Category} from "../data";
import {Link, useParams} from "react-router-dom";

interface CategoryProps extends PropsWithChildren<any> {
    categories: Category[];
}

const CategoryPage: React.FC<CategoryProps> = (props: CategoryProps) => {
    let {categoryName} = useParams();
    categoryName = decodeURIComponent(categoryName);
    console.log(categoryName)

    let category = props.categories.find(c => c.name === categoryName);
    if (category === undefined) {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>404</h3>
                </div>
            </div>
        )
    }

    const sortSubcategories = (a: Category, b: Category): number => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    }

    const subcategoryListItems = category.subcategories.sort(sortSubcategories).map(s => {
        return <li>
            <Link to={'/' + encodeURIComponent(s.name)}>
                {s.name}
            </Link>
        </li>
    })

    const resourceListItems = category.resources.sort().map(r => {
        return <li>
            <a href={r.link}>
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
                    <h5>Sub-categories</h5>
                    <ul>
                        {subcategoryListItems}
                    </ul>
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