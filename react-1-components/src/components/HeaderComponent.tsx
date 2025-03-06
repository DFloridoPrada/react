import './HeaderComponent.css';

function HeaderComponent() {
    return (
        <header className='header'>
            <h1 className='title'>Bienvenidos!</h1>
            <nav>
                <ul className='header-list'>
                    <li>
                        <a className='list-a' href="#">Home</a>
                    </li>
                    <li>
                        <a className='list-a' href="#">Blog</a>
                    </li>
                    <li>
                        <a className='list-a' href="#">News</a>
                    </li>
                    <li>
                        <a className='list-a' href="#">Contacts</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderComponent;