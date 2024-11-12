import HeaderLogin from '../../components/Header_Login/Header_login.jsx';
import { useEffect, useState } from "react";
import Footer from '../../components/Footer/Footer.jsx';
import { SignIn } from '@clerk/clerk-react';
import './Login.css'; 

function Login() {
    const [bgColor, setBgColor] = useState('bg-dark-sub-background');

    useEffect(() => {
        // Salvando as classes atuais do body antes de alterar
        const originalClasses = document.body.className;
        
        // Salvando as classes atuais do body
        const currentClasses = document.body.className.split(' ').filter(cls => !cls.startsWith('bg-')).join(' ');
        
        // Adicionando a nova cor ao conjunto de classes do body
        document.body.className = `${currentClasses} ${bgColor}`;

        // Função de cleanup para restaurar as classes originais
        return () => {
            document.body.className = originalClasses;
        };

    }, [bgColor]);
    return (
        <>
            <main>
                <div className="login-container">
                    <HeaderLogin title={'LOGIN'} />
                    <SignIn path="/login" forceRedirectUrl={"/dashboard"}/>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Login;
