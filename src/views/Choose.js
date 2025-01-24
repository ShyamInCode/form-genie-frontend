// @flow
import React from 'react';

import {useNavigate} from 'react-router-dom';

export const Choose = () => {
    const navigate = useNavigate()
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{marginInline: '1.5em'}}>
                    <button onClick={() => navigate('/design')} className='chooseBtn'>
                        <div style={{display: 'flex', height: '80%', alignItems: 'center'}}>
                            {/* <Lottie style={{width: '15em'}} animationData={coding} loop={true}/> */}
                        </div>
                        <div>
                            Design your own form
                        </div>
                    </button>
                </div>
                <div style={{marginInline: '1.5em'}}>
                    <button onClick={() => navigate('/template')} className='chooseBtn'>
                        <div style={{display: 'flex', height: '80%', alignItems: 'center'}}>
                            {/* <Lottie style={{width: '15em'}} animationData={editor} loop={true}/> */}
                        </div>
                        <div>
                            Use our template
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
