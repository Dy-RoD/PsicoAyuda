import React, { useState } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Para redireccionar
import "./Busqueda.css";

function Busqueda() {
  const regionMap: Record<string, string> = {
    'Arica y Parinacota': 'arica_y_parinacota',
    'Tarapacá': 'tarapaca',
    'Antofagasta': 'antofagasta',
    'Atacama': 'atacama',
    'Coquimbo': 'coquimbo',
    'Valparaíso': 'valparaiso',
    'Metropolitana de Santiago': 'metropolitana',
    "O'Higgins": 'ohiggins',
    'Maule': 'maule',
    'Ñuble': 'nuble',
    'Biobío': 'biobio',
    'La Araucanía': 'la_arauncania',
    'Los Ríos': 'los_rios',
    'Los Lagos': 'los_lagos',
    'Aysén': 'aysen',
    'Magallanes': 'magallanes',
  };

  const [results, setResults] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const history = useHistory();

  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLIonSearchbarElement;
    const queryValue = target?.value?.toLowerCase() || '';

    setQuery(queryValue);
    if (queryValue) {
      setResults(Object.keys(regionMap).filter((region) => region.toLowerCase().includes(queryValue)));
    } else {
      setResults([]);
    }
  };

  const handleRegionClick = (region: string) => {
    const regionValue = regionMap[region as keyof typeof regionMap]; // Hacemos que TypeScript entienda que region es una clave válida
    history.push(`/profesionales/${regionValue}`);
  };

  return (
    <>
      <IonSearchbar
        className="barraSearch"
        placeholder="Busca por Regiones!"
        showClearButton="focus"
        debounce={1000}
        onIonInput={(ev: Event) => handleInput(ev)}
      ></IonSearchbar>

      {query && (
        <IonList>
          {results.map((result, index) => (
            <IonItem key={index} button onClick={() => handleRegionClick(result)}>
              {result}
            </IonItem>
          ))}
        </IonList>
      )}
    </>
  );
}

export default Busqueda;
