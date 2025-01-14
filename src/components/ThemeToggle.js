import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeToggle = ({ isDark, toggleTheme }) => (
  <button 
    className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
    onClick={toggleTheme}
    aria-label="Toggle theme"
  >
    {isDark ? <FaSun /> : <FaMoon />}
  </button>
); 