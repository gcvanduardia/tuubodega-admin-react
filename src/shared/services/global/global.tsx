import React from 'react';

interface GlobalProps {
  idUser: number; setIdUser: (user: number) => void;
}

export const GlobalContext = React.createContext<GlobalProps>({
  idUser: 0, setIdUser: () => {}
});