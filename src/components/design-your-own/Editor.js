import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

export default function Editor(props) {
    const {language, displayName, value, onChange} = props;

    function handleChange(editor, data, value) {
        onChange(value);
    }

    return (
        <div className={'editor-container'}>
            {/* <div className="editor-title">
                {displayName}
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    theme: 'xq-light',
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    keymap: 'sublime',
                }}
            /> */}
        </div>
    );
}
