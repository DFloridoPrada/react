import { useState } from 'react';
import './Header.css';

function Header() {

    const [modalDisplay, setModalDisplay] = useState(false);

    const showModalMenu = () => {
        if(modalDisplay) setModalDisplay(false);
        if(!modalDisplay) setModalDisplay(true);
    }


    return (
        <header>
            <div className="header-container">
                <div className="burgerMenu-container">
                    <div className="burgerMenu" onClick={showModalMenu}>
                        <div className="bar bar1"></div>
                        <div className="bar bar2"></div>
                        <div className="bar bar3"></div>
                    </div>
                </div>
                <div className={`modalMenu ${modalDisplay ? 'showed' : 'hidden'}`}>

                </div>
            </div>
        </header>
    );
}

export default Header;