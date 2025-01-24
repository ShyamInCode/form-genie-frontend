// @flow
import React from 'react';
import { FIELD_TYPES } from '../../views/constants';

export const AddCustomField = ({setCustomField, customField}) => {
    return (
        <div onClick={() => setCustomField({
            show: true,
            name: '',
            id: `field-${customField.length + 1}`,
            type: 'text',
            fieldType:FIELD_TYPES.CUSTOM
         } )} className="CustomField">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <p style={{color: '#ff3951', fontSize: '2em'}}>+</p>
                <p style={{color: '#ff3951', fontSize: '1em', fontWeight: 'bold', marginTop: '-10px'}}>Custom Field</p>
            </div>
        </div>
    );
};
