import Header from '../../components/Header_Login/Header_login.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { useEffect, useState } from "react";
import { SignUp } from '@clerk/clerk-react';
import './Register.css'; 

function Register() {
    const [bgColor, setBgColor] = useState('bg-dark-sub-background');

    useEffect(() => {
        // Salvando as classes atuais do body antes de alterar
        const originalClasses = document.body.className;
        
        // Salvando as classes atuais do body
        const currentClasses = document.body.className.split(' ').filter(cls => !cls.startsWith('bg-')).join(' ');
        
        // Adicionando a nova cor ao conjunto de classes do body
        document.body.className = `${currentClasses} ${bgColor}`;

        return () => {
            document.body.className = originalClasses;
        };
    }, [bgColor]);

    return (
        <>
            <main>
                <div className="login-container">
                    <Header title={'SIGN UP'}/>
                    <SignUp path="/signup" forceRedirectUrl={"/dashboard"}/>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Register;
