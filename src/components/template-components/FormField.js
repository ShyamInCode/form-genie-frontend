// @flow
import React from 'react';

export const FormField = ({name, id, type, className, state, setState,setFile,setFileUrl}) => {

    return (
        <div className={type === 'checkbox' ? 'sp-between mr-10' : 'sp-between'}>
            <div className={className}>
                <label htmlFor={id}>{name + ':'}</label>
            </div>
            {type === 'checkbox' ? (
                <input
                    checked={name === 'Email' ? true : state}
                    disabled={name === 'Email'}
                    onClick={() => {
                        setState(!state)
                    }}
                    id={id} type="checkbox"
                />
            ) : (
                <input
                    value={type === 'file' ? undefined : state}
                    onChange={(e) => {
                        if (type === 'file') {
                            setFile(e.target.files[0]);
                            setFileUrl(URL.createObjectURL(e.target.files[0]))
                        } else {
                            setState(e.target.value)
                        }
                    }}
                    accept={type === 'file' ? "image/gif, image/jpeg, image/png" : ''}
                    className="mt-10 text-field"
                    placeholder={"Enter " + name}
                    style={{
                        padding: (type === 'color' || type === 'file') ? 0 : '6px',
                        width: (type === 'color' || type === 'file') ? '16.5em' : '15em'
                    }}
                    id={id} type={type}
                />
            )}
        </div>
    );
};
