import { createContext } from 'react';

export const Context = createContext(localStorage.getItem('local'));