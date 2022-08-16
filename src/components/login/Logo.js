import React from 'react';
import LogoPng from '../../assets/Login/LogoPng.png';
import '../../assets/Login/Login.css'

function Logo() {
    return (
        <div>
            <img className="logo-img" alt="pohab_logo" src={LogoPng} />
        </div>
    )
}

export default Logo;