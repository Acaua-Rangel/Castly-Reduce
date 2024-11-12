import { useEffect, useState } from 'react';
import { SignOutButton } from '@clerk/clerk-react'
//import { AuthContext } from '../../Context/authContext';
import "./SideBar.css"

function SideBar({page}) {
    const [width, setWidth] = useState(window.innerWidth);
    //const { logout } = useContext(AuthContext);

    // SHOW MENU
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        document.body.id = "body";
        document.body.classList.add('body');

        function showMenu(toggleId, navbarId, bodyId, widthS) {
            let toggle = document.getElementById(toggleId);
            let navbar = document.getElementById(navbarId);
            let bodypadding = document.getElementById(bodyId);
        
            if(toggle && navbar){
                toggle.addEventListener('click', ()=>{
                    // APARECER MENU
                    navbar.classList.toggle('show');
                    // ROTATE TOGGLE
                    toggle.classList.toggle('rotate');
                    // PADDING BODY
                    if (widthS > 500) {
                        bodypadding.classList.toggle('expander');
                    }
                })
            }
        }
        showMenu('nav-toggle','navbar-side','body', width);

        return () => {
            let toggle = document.getElementById('toggleId');
            if (toggle) {
                toggle.removeEventListener('click', () => {});
            }
            document.body.id = "";
            document.body.classList.remove('body');
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="bg-background dark:bg-dark-background l-navbar" id="navbar-side">
            <nav className="nav-side">
                <div>
                    <a href='/' className="nav__logo">
                        <img className="nav__logo-icon w-7 dark:invert" src="/IgaVro.svg" alt="Logo" />
                        <img className="nav__logo-text dark:invert" src="/IgaVro-text.svg" alt="Castly" />
                    </a>

                    <div className="nav__toggle" id="nav-toggle">
                        <i className='bx bx-chevron-right'></i>
                    </div>

                    <ul className="nav__list text-black dark:text-white">
                        <a className={page === "Status" ? "nav__link active text-white" : "nav__link"} href="/dashboard">
                            <i className='bx bx-station nav__icon'></i>
                            <span className="nav__text">Status</span>
                        </a>
                        <a className={page === "Multistream" ? "nav__link active text-white" : "nav__link"} href="/dashboard/multistream">
                            <i className='bx bx-share-alt nav__icon'></i>
                            <span className="nav__text">Multisteam</span>
                        </a>
                        <a className={page === "Settings" ? "nav__link active text-white" : "nav__link"} href="/dashboard/settings">
                            <i className='bx bxs-cog nav__icon'></i>
                            <span className="nav__text">Settings</span>
                        </a>
                        <a className={page === "Plan" ? "nav__link_blocked active text-white" : "nav__link_blocked"}>
                            <i className='bx bxs-credit-card nav__icon'></i>
                            <span className="nav__text">Plan</span>
                        </a>
                    </ul>
                </div>
                <SignOutButton>
                    <button className="nav__link text-black dark:text-white">      
                    <i className='bx bx-log-out nav__icon'></i>
                        <span className="nav__text">Log Out</span> 
                    </button>
                </SignOutButton>    
            </nav>
        </div>
    )
}

export default SideBar