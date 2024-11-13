import { Link } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import { IoWarningOutline } from "react-icons/io5";
import Platforms from "../../components/Platforms/Platforms";
import Progress from "../../components/Progress/Progress"
import SideBar from "../../components/SideBar/SideBar";
import BitrateChart from '../../components/BitrateChart';
import Footer from "../../components/Footer/Footer";
import Perfil from "../../components/Perfil/Perfil";
import { useClerk } from '@clerk/clerk-react';
import { api } from "../../services/api.jsx";
import "./Dashboard.css";

const converURLs = {
    "rtmp://a.rtmp.youtube.com/live2": "YouTube",
    "rtmp://mia05.contribute.live-video.net/app": "Twitch",
    "rtmps://fa723fc1b171.global-contribute.live-video.net/app": "Kick",
    "rtmps://live-api-s.facebook.com:443/rtmp": "Facebook"
};

function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
        // Checa a preferência do usuário ou se o tema está salvo no localStorage
        const storedTheme = localStorage.getItem('theme');
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
        if (storedTheme === 'dark' || (!storedTheme && userPrefersDark)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }

    }, []);
  
    const toggleTheme = () => {
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDarkMode(true);
      }
    };
  
    return [isDarkMode, toggleTheme];
}

function Dashboard() {
    const [liveOn, setLiveOn] = useState("");
    const [pending, setPending] = useState("");
    const [lowBitrate, setLowBitrate] = useState(false);
    const clerk = useClerk();

    const platforms = [
        {
            name: "Twitch",
            amount: "8920"
        },
        {
            name: "YouTube",
            amount: "7529"
        }
    ]

    const elementRef = useRef(null);
    const [elementWidth, setElementWidth] = useState(0);

    const [theme, setTheme] = useState('light');

    const [bgColor, setBgColor] = useState('bg-sub-background dark:bg-dark-sub-background');

    useEffect(() => {
        // Salvando as classes atuais do body antes de alterar
        const originalClasses = document.body.className;
        
        // Salvando as classes atuais do body
        const currentClasses = document.body.className.split(' ').filter(cls => !cls.startsWith('bg-')).join(' ');
        
        // Adicionando a nova cor ao conjunto de classes do body
        document.body.className = `${currentClasses} ${bgColor}`;

        const root = document.documentElement;

        const updateWidth = () => {
          if (elementRef.current) {
            setElementWidth(elementRef.current.clientWidth);
          }
        };

        // Verifica se a classe 'dark' está presente no elemento <html>
        const currentTheme = root.classList.contains('dark') ? 'dark' : 'white';
        setTheme(currentTheme);

        // Listener para quando o tema mudar
        const observer = new MutationObserver(() => {
            const newTheme = root.classList.contains('dark') ? 'dark' : 'white';
            setTheme(newTheme);
        });
    
        // Observa mudanças nas classes do <html>
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });
        
        // Atualiza a largura inicialmente
        updateWidth();
    
        // Adiciona o event listener para redimensionamento
        window.addEventListener('resize', updateWidth);

        if (clerk.session) {
            clerk.session
                .getToken()
                .then((token) => {
                    api
                        .post("/nginx/get-streams", {}, {
                            headers: {
                              Authorization: `Bearer ${token}`
                            },
                        })
                        .then((response) => {
                            if (response.data.streams.length === 0) {
                                setPending("No configured platforms yet");
                            } else {
                                for (var i = 0; i < response.data.streams.length; i++) {
                                    ((index) => { // IIFE para capturar o valor de i
                                        let platName = "Custom";
                                        if (converURLs.hasOwnProperty(response.data.streams[index].url)) {
                                            platName = converURLs[response.data.streams[index].url];
                                        }
                                        if (response.data.streams[index].state == 1) {
                                            setLiveOn(`${liveOn}, ${platName}`.replace(/^, /, ''))
                                        } else {
                                            setPending(`${pending}, ${platName}`.replace(/^, /, ''))
                                        }
                                    })(i); // Passando o valor atual de i
                                }                        
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
                .catch((error) => console.log('An error occurred:', error.errors))
        }
    
        // Remove o event listener quando o componente é desmontado
        return () => {
            observer.disconnect(); // Limpa o observer quando o componente desmontar
            window.removeEventListener('resize', updateWidth);
            document.body.className = originalClasses;
        };
    }, [clerk.session, bgColor]);

    let pamount = 20;

    if (elementWidth < 547) {
        pamount = 10;
    } else if (elementWidth < 570) {
        pamount = 15;
    }
    
    return (
        <>
            <main className="dash-content bg-sub-background dark:bg-dark-sub-background">
                <SideBar page="Status"/>
                <section ref={elementRef}>
                    <Perfil className='perfil'/>
                    <div className="main">
                        {lowBitrate && (
                            <div className='border-2 border-red border-solid rounded-lg px-4 py-2.5 w-11/12 bg-background dark:bg-dark-background' id='warning'>
                                <div className='flex items-center gap-2 text-red text-lg font-medium'><IoWarningOutline /><h5>Stream Health Issue</h5></div>
                                <p className='text-red text-sm font-normal text-wrap'>Low bitrate detected. Your stream quality may be affected.</p>
                            </div>
                        )}
                        <div className="title">
                            <h2 className="text-3xl text-black dark:text-white font-bold">Transmission Status</h2>
                            <p className="text-black dark:text-white">View the details of your multistream</p>
                        </div>
                        <div className='flex flex-col gap-4 rounded-lg platforms px-6 py-5 bg-background dark:bg-dark-background drop-shadow-sm w-11/12'>
                            <BitrateChart defaultRate={5742}/>
                            <div className='flex flex-row flex-wrap gap-2 items-center'>
                                <p className="text-black font-semibold dark:text-white">Service Status:</p>
                                <iframe src={`https://status.castly.gg/badge?theme=${theme}`} width="250" height="30" frameBorder="0" scrolling="no"></iframe>
                            </div>
                        </div>
                        <div className='flex flex-row flex-wrap gap-10'>
                            <div className="flex flex-col gap-4 px-6 py-5 rounded-lg platforms bg-background dark:bg-dark-background drop-shadow-sm">
                                <h3 className="text-2xl font-semibold text-black dark:text-white">Platforms</h3>
                                <Platforms plats={platforms} amount={pamount}/>
                            </div>
                            <div className="inpu flex flex-col gap-4 px-6 py-5 rounded-lg platforms bg-background dark:bg-dark-background drop-shadow-sm">
                                <h3 className="text-2xl font-semibold text-black dark:text-white">Input</h3>
                                <div className="bitrate">
                                    <h4 className="font-medium text-black dark:text-white">Bit Rate</h4>
                                    <Progress amount={pamount} kbps={5742} color={"#FFF000"}/>
                                </div>
                                <div className="duration">
                                    <h4 className="font-medium text-black dark:text-white">Duration</h4>
                                    <p className="text-black dark:text-white">35m 3s</p>
                                </div>
                            </div>
                        </div>
                        <div className="actions-section">
                            {liveOn && (
                                <div className="live-on bg-background dark:bg-dark-background drop-shadow-sm">
                                    <h4 className="font-semibold text-black dark:text-white opacity-75">Live on</h4>
                                    <h3 className="text-black dark:text-white">{liveOn}</h3>
                                    <Link to="/dashboard/multistream" className="mnge-button px-3 flex-none font-medium bg-black text-white dark:bg-purple dark:border-purple hover:opacity-50 duration-300">
                                        <p className='font-medium'>Manage</p>
                                        <i className='bx bx-link-external font-medium'></i>
                                    </Link>
                                </div>
                            )}

                            {pending && (
                                <div className="live-pending bg-background dark:bg-dark-background drop-shadow-sm">
                                    <h4 className="font-semibold text-black dark:text-white opacity-75">Pending</h4>
                                    <h3 className="text-black dark:text-white">{pending}</h3>
                                    <Link to="/dashboard/multistream" className="mnge-button px-3 flex-none font-medium bg-black text-white dark:bg-purple dark:border-purple hover:opacity-50 duration-300">
                                        <p className='font-medium'>Manage</p>
                                        <i className='bx bx-link-external font-medium'></i>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer themed={true}/>
        </>
    )
}

export default Dashboard
