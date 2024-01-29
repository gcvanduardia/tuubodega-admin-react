import React from 'react';

interface GlobalProps {
  mainHeaderTitle: string;
  setMainHeaderTitle: (title: string) => void;
}

export const Global = React.createContext<GlobalProps>({
  mainHeaderTitle: '',
  setMainHeaderTitle: () => {},
});