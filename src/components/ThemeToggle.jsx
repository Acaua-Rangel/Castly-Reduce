// src/components/ThemeToggle.jsx

import React, { useEffect, useState } from 'react';

// Função para verificar o tema do sistema
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Função para obter o tema inicial (cache ou sistema)
const getInitialTheme = () => {
  const cachedTheme = localStorage.getItem('theme');
  if (cachedTheme) {
    return cachedTheme;
  }
  return 'system';
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Aplica o tema conforme a escolha ou sistema
    const applyTheme = (themeToApply) => {
      const root = document.documentElement;
      if (themeToApply === 'system') {
        themeToApply = getSystemTheme();
      }
      root.classList.remove('light', 'dark');
      root.classList.add(themeToApply);
    };

    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setMenuOpen(false); // Fecha o menu ao selecionar um tema
  };

  // Determina o ícone com base no tema selecionado
  const themeIcon = () => {
    switch (theme) {
      case 'light':
        return <i className="bx bx-sun text-2xl"></i>;
      case 'dark':
        return <i className="bx bx-moon text-2xl"></i>;
      case 'system':
        return <i className="bx bx-desktop text-2xl"></i>;
      default:
        return <i className="bx bx-desktop text-2xl"></i>;
    }
  };

  return (
    <div className="relative">
      {/* Botão do menu hambúrguer com ícone do tema */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded flex items-center gap-2 bg-background w-12 justify-center dark:bg-dark-background rounded-lg text-black dark:text-white"
      >
        {themeIcon()}
      </button>

      {/* Menu com as opções de tema, mostrado apenas se menuOpen for true */}
      {menuOpen && (
        <div className="absolute top-20 right-0 bg-background dark:bg-dark-background shadow-lg rounded-lg p-4 flex flex-col space-y-2">
          <button
            onClick={() => handleThemeChange('light')}
            className={`p-2 rounded flex gap-2 items-center ${
              theme === 'light' ? 'bg-purple text-white' : 'bg-transparent text-black dark:text-white'
            }`}
          >
            <i className="bx bx-sun"></i> Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-2 rounded flex gap-2 items-center ${
              theme === 'dark' ? 'bg-purple text-white' : 'bg-transparent text-black dark:text-white'
            }`}
          >
            <i className="bx bx-moon"></i> Dark
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className={`p-2 rounded flex gap-2 items-center ${
              theme === 'system' ? 'bg-purple text-white' : 'bg-transparent text-black dark:text-white'
            }`}
          >
            <i className="bx bx-desktop"></i> System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
