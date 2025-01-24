// @flow
import React, {useState, useEffect} from 'react';
import useLocalStorage from "../hooks/useLocalStorage";
import Editor from "../components/design-your-own/Editor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompressAlt, faExpandAlt} from "@fortawesome/free-solid-svg-icons";

export const DesignYourOwnView = () => {
    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [javascript, setJavascript] = useLocalStorage('javascript', '');
    const [srcDoc, setSrcDoc] = useState('');
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html lang='en'>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${javascript}</script>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, javascript]);

    return (
        <>
            <div className="pane top-pane" style={{display: !open ? 'none' : 'flex'}}>
                <Editor
                    language="xml"
                    displayName="HTML"
                    value={html}
                    onChange={setHtml}
                />
                <Editor
                    language="css"
                    displayName="CSS"
                    value={css}
                    onChange={setCss}
                />
                <Editor
                    language="javascript"
                    displayName="JavaScript"
                    value={javascript}
                    onChange={setJavascript}
                />
            </div>
            <div className="top-pane" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button style={{margin: '10px 0 20px 0'}} type="submit" className="submit-btn">Create Form</button>
            </div>
            <div className="pane">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
                <button
                    type="button"
                    className="expand-collapse-button"
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    <FontAwesomeIcon
                        icon={open ? faExpandAlt : faCompressAlt}
                        color='white'
                    />
                </button>
            </div>
        </>
    );
};
