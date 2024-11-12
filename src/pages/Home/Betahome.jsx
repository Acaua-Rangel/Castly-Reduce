import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import Footer from '../../components/Footer/Footer';
import './Betahome.css';
import { Navigate } from 'react-router-dom';
import { RxFile } from "react-icons/rx";

export default function Betahome() {
  function handleAuth() {
        window.location.href = '/login';
  }

  const [bgColor, setBgColor] = useState('bg-dark-sub-background'); // Cor inicial

  useEffect(() => {
    // Salvando as classes atuais do body antes de alterar
    const originalClasses = document.body.className;
        
    // Salvando as classes atuais do body
    const currentClasses = document.body.className.split(' ').filter(cls => !cls.startsWith('bg-')).join(' ');
    
    // Adicionando a nova cor ao conjunto de classes do body
    document.body.className = `${currentClasses} ${bgColor}`;

    const intervalId = setInterval(() => {
      const element = document.querySelector('.cl-internal-1eekank');
      if (element) {
        element.classList.add('text-white');
        clearInterval(intervalId); // Para o intervalo quando o elemento for encontrado
      }
    }, 500); // Verifica a cada 0.5 segundo
    
    return () => {
      clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
      document.body.className = originalClasses;
    }
  }, [bgColor]);
  
  return (
    <>
      <header className="bg-transparent ">
        <div className=" flex items-center justify-end p-10 gap-4">
          <button className="bg-[#6800ff] px-4 py-2 rounded-lg text-purple-100 hover:bg-white hover:text-[#6800ff] flex items-center space-x-2 duration-300" onClick={() => handleAuth()}>Login</button>
          <SignedIn>
            <Navigate to={"/dashboard"}/>
          </SignedIn> 
        </div>
      </header>

      <main className="bg-transparent  p-11 flex flex-col items-center gap-12 mb-52">
        <section className="flex items-center justify-center mb-8">
          <img src={"Logo.svg"} alt="logo_castly" />
        </section>

        <div className="flex flex-col space-y-8 w-full md:w-1/2 text-left">
          <div className="text-lg text-white font-mono">
            <p className='text-justify'>
              Castly is currently in an invite-only beta phase as we fine-tune the ultimate multistreaming experience for streamers like you. We're working hard to deliver a seamless way for you to stream to multiple platforms at once.
            </p>
            <br />
            <p className='text-justify'>
              Interested in joining our exclusive beta? Join our Discord community to get the latest updates and early access invites!
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-4 justify-center">
            <a className="px-4 py-2 flex flex-row gap-4 items-center bg-white rounded-lg hover:opacity-70 duration-300" href="/">
              <i className="fa-brands fa-discord text-blue text-lg"></i>
              <p className="text-black">Join the Discord</p>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
