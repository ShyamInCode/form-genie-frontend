// @flow
import React from 'react';

export const ContainerField = ({id, type, placeholder}) => {
    return (
        <div className="input-control">
            <label htmlFor={id} className="input-label" hidden>{placeholder}</label>
            <input type={type} name={id} id={id} className="input-field"
                   placeholder={placeholder} required/>
        </div>
    );
};
