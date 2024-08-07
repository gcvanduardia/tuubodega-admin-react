import React from 'react';
import { IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonInput, IonButtons, IonIcon, IonButton } from '@ionic/react';
import { search } from 'ionicons/icons';

interface HeaderSearchProps {
    onSearch: (searchStr: string) => void;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ onSearch }) => {

    const [searchStr, setSearchStr] = React.useState('');

    return (
        <IonHeader mode='ios'>
            <IonToolbar>
                <IonGrid fixed className='ion-no-padding'>
                    <IonRow>
                        <IonCol size="12">
                            <IonToolbar className='no-border'>
                                <IonButtons slot='start'>
                                    <div className='search-content'>
                                        <IonInput
                                            type="text"
                                            placeholder='Buscar...'
                                            className='ion-no-padding search'
                                            value={searchStr}
                                            onIonInput={e => setSearchStr(e.detail.value!)}
                                            onKeyDown={e => { if (e.key === 'Enter') onSearch(searchStr); }}
                                        />
                                        <IonButton fill='clear' slot='end' onClick={() => onSearch(searchStr)}>
                                            <IonIcon slot="icon-only" icon={search}></IonIcon>
                                        </IonButton>
                                    </div>
                                </IonButtons>
                            </IonToolbar>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar>
        </IonHeader>
    )
}

export default HeaderSearch;