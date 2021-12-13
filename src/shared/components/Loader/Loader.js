import React from 'react';
import "./Loader.css";
import { ReactComponent as LoaderLogo } from '../../assets/icons/loader.svg';

function Loader() {

    return (
        <div className='spinner'>
            <LoaderLogo className='loader-logo' />
        </div>
    )
}

export default Loader;
