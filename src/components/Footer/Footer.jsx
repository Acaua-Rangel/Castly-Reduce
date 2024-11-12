import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Footer.css";

function Footer({ themed = false }) {
    const sectionsRefs = useRef([]);
    const [theme, setTheme] = useState('light');

    const addToRefs = (el) => {
        if (el && !sectionsRefs.current.includes(el)) {
            sectionsRefs.current.push(el);
        }
    };

    useEffect(() => {
        const root = document.documentElement;

        // Verifica se a classe 'dark' está presente no elemento <html>
        const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme);

        // Listener para quando o tema mudar
        const obr = new MutationObserver(() => {
            const newTheme = root.classList.contains('dark') ? 'dark' : 'light';
            setTheme(newTheme);
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observa mudanças nas classes do <html>
        obr.observe(root, { attributes: true, attributeFilter: ['class'] });

        sectionsRefs.current.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            obr.disconnect(); // Remove o observador quando o componente for desmontado
            sectionsRefs.current.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <footer className={`flex flex-col px-8 pt-8 ${themed ? 'bg-sub-background dark:bg-dark-sub-background' : 'bg-dark-sub-background'}`}>
            <div className="flex sm:flex-row flex-col pb-6 w-full justify-between sm:items-center items-start fade-in-section" ref={addToRefs}>
                <div className="flex flex-col gap-2 items-start">
                    <img src="/Logo.svg" className={`${themed ? 'invert dark:invert-0' : ''} h-9`} alt="Logo" />
                    <iframe src={`https://status.castly.gg/badge?theme=${themed ? theme : 'dark'}`} width="250" height="30"></iframe>
                </div>
                <div className="flex flex-row gap-4">
                    <a href=""><i className="fa-brands opacity-100 hover:opacity-70 fa-x-twitter text-purple text-lg"></i></a>
                    <a href=""><i className="fa-brands opacity-100 hover:opacity-70 fa-instagram text-purple text-lg"></i></a>
                    <a href=""><i className="fa-brands opacity-100 hover:opacity-70 fa-discord text-purple text-lg"></i></a>
                </div>
            </div>
            <div className={`${themed ? 'border-black/40 dark:border-white/40' : 'border-white/40'} flex border-t-2 py-6 gap-y-4 sm:flex-row flex-col items-start w-full text-sm justify-between`}>
                <p className={`${themed ? 'text-black dark:text-white' : ''} opacity-70 fade-in-section`} ref={addToRefs}>Copyright © 2024 Castly LLC. All rights reserved.</p>
                <div className="flex flex-row flex-wrap gap-x-4 justify-end fade-in-section" ref={addToRefs}>
                    <a className={`${themed ? 'text-black dark:text-white' : ''} text-nowrap opacity-70 hover:opacity-100 duration-300`} href="/terms/services">Terms of Service</a>
                    <a className={`${themed ? 'text-black dark:text-white' : ''} text-nowrap opacity-70 hover:opacity-100 duration-300`} href="/terms/privacy">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
