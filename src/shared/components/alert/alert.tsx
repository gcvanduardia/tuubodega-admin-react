import { IonAlert } from '@ionic/react';
import React from 'react';

interface AlertProps {
  isOpen: boolean;
  header: string;
  subHeader?: string;
  message: string;
  buttons: string[];
  onDismiss: () => void;
}

const Alert: React.FC<AlertProps> = ({ isOpen, header, subHeader, message, buttons, onDismiss }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header={header}
      subHeader={subHeader}
      message={message}
      buttons={buttons}
      mode='ios'
      onKeyDown={e => { if (e.key === 'Enter') onDismiss(); }}
    />
  );
};

export default Alert;