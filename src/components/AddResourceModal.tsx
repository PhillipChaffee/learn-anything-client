import React, {PropsWithChildren, useState} from "react";
import ReactModal from 'react-modal';
import CreatableSelect from "react-select/creatable";
import {Category} from "../models/category";
import {OptionsType} from "react-select";
import {base_url} from "../App";

interface AddResourceModalProps extends PropsWithChildren<any> {
    modalIsOpen: boolean;
    closeModal: (event: React.MouseEvent | React.KeyboardEvent) => void;
    categories: Category[];
    loadingCategories: boolean;
}

type CategoryOption = { label: string, value: string };

const AddResourceModal: React.FC<AddResourceModalProps> = (props) => {
    const {modalIsOpen, closeModal, categories, loadingCategories} = props;

    const [resourceCategories, setResourceCategories] = useState([] as OptionsType<CategoryOption>);
    const [resourceCategoriesValidationMessage, setResourceCategoriesValidationMessage] = useState('');

    const [resourceName, setResourceName] = useState('');
    const [resourceNameValidationMessage, setResourceNameValidationMessage] = useState('');

    const [resourceLink, setResourceLink] = useState('');
    const [resourceLinkValidationMessage, setResourceLinkValidationMessage] = useState('');

    const [submittingResource, setSubmittingResource] = useState(false);

    let options: CategoryOption[] = categories.map(c => {
        return {label: c.name, value: c.name}
    });

    let resourceValid = (submit: boolean = false) => {
        let valid = true;

        if (submit && (!resourceCategories || resourceCategories.length === 0)) {
            console.log(resourceCategories)
            setResourceCategoriesValidationMessage('Please add at least one category.');
            valid = false;
        } else {
            setResourceCategoriesValidationMessage('');
        }
        if (submit && !resourceName) {
            setResourceNameValidationMessage('Please add a resource name.');
            valid = false;
        } else {
            setResourceNameValidationMessage('');
        }
        if (submit && !resourceLink) {
            setResourceLinkValidationMessage('Please add a link to the resource.')
            valid = false;
        } else {
            setResourceLinkValidationMessage('')
        }

        return valid;
    }

    let saveResource = async () => {
        if (submittingResource || !resourceValid(true)) {
            return;
        }

        setSubmittingResource(true);

        let categoriesForResource: Category[] = [];
        for (const resourceCategory of resourceCategories) {
            let category = categories.find(c => c.name === resourceCategory.label);

            if (category === undefined) {
                let response = await fetch(base_url + '/categories', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: resourceCategory.label})
                });

                category = await response.json() as Category;
            }

            categoriesForResource.push(category);
        }

        await fetch(base_url + '/resources', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: resourceName,
                link: resourceLink,
                categoryIds: categoriesForResource.map(c => c.id)
            })
        })
            .then(() => {
                closeModal({} as React.MouseEvent);
                setSubmittingResource(false);
            })
    }

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            overlayClassName='Overlay'
            className='Modal'
        >
            <h2>Add Resource</h2>
            <button className='closeModal' onClick={closeModal}>
                <span className='closeModal'>x</span>
            </button>
            <form className="needs-validation" noValidate>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" aria-describedby="nameInput"
                           className={"form-control" + (resourceNameValidationMessage ? " invalid" : "")}
                           placeholder="Enter resource name"
                           onChange={event => {
                               setResourceName(event.target.value);
                               resourceValid();
                           }}
                           required/>
                    {resourceNameValidationMessage &&
                    <div className="invalid-feedback d-block">
                        {resourceNameValidationMessage}
                    </div>}
                </div>
                <div className="form-group">
                    <label htmlFor="link">Link</label>
                    <input type="text" id="link" placeholder="Link to resource"
                           className={"form-control" + (resourceLinkValidationMessage ? " invalid" : "")}
                           onChange={event => {
                               setResourceLink(event.target.value);
                               resourceValid();
                           }}
                           required
                    />
                    {resourceLinkValidationMessage &&
                    <div className="invalid-feedback d-block">
                        {resourceLinkValidationMessage}
                    </div>}
                </div>
                <div className="form-group">
                    <label htmlFor="categorySelect">Categories</label>
                    <CreatableSelect
                        id='categorySelect'
                        isMulti
                        isLoading={loadingCategories}
                        options={options}
                        onChange={value => {
                            setResourceCategories(value as OptionsType<CategoryOption>);
                            resourceValid();
                        }}
                        styles={resourceCategoriesValidationMessage ? {
                            control: (base, props) => ({
                                ...base,
                                borderColor: '#dc3545'
                            })
                        } : {}}
                    />
                    <small id="categorySelectHelp" className="form-text text-muted">Type to search or create a new
                        category.</small>
                    {resourceCategoriesValidationMessage &&
                    <div className="invalid-feedback d-block">
                        {resourceCategoriesValidationMessage}
                    </div>}
                </div>
                <button type="button" className="btn btn-primary" onClick={saveResource}>
                    {!submittingResource && 'Submit'}
                    {submittingResource &&
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        <span className="sr-only">Loading...</span>
                    </>
                    }
                </button>
            </form>
        </ReactModal>
    )
}

export default AddResourceModal;