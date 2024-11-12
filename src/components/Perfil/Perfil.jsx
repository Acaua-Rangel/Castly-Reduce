import ThemeToggle from '../ThemeToggle.jsx';
import { useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react'
import './Perfil.css';

function Perfil() {
    useEffect(() => {
        const intervalId = setInterval(() => {
          const element = document.querySelector('.cl-internal-1eekank');
          if (element) {
            element.classList.add('text-black', 'dark:text-white');
            clearInterval(intervalId); // Para o intervalo quando o elemento for encontrado
          }
        }, 500); // Verifica a cada 0.5 segundo
    
        return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
      }, []);
    return (
        <div className='addons flex gap-3'>
            <ThemeToggle></ThemeToggle>
            <UserButton showName={true}/>
        </div>
    )
}

export default Perfil