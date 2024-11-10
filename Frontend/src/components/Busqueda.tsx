import React, { useState } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import "./Busqueda.css";


function Busqueda() {
  const data = [
    'Valparaiso',
    'Santiago',
    'Lupita Rodriguez',
    'Bella Kodpher',
    'Sugerencias a tiempo real!',
  ];

  // Estados para los resultados y la consulta de búsqueda
  const [results, setResults] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');  // Estado para la consulta

  // Manejar la entrada del usuario
  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLIonSearchbarElement;
    const queryValue = target?.value?.toLowerCase() || '';

    setQuery(queryValue);  // Actualizar la consulta
    if (queryValue) {
      // Filtrar los datos solo si hay algo escrito
      setResults(data.filter((d) => d.toLowerCase().indexOf(queryValue) > -1));
    } else {
      // Si la consulta está vacía, no mostrar resultados
      setResults([]);
    }
  };

  return (
    <>
      <IonSearchbar
        className='barraSearch'
        placeholder="Psicólogos o Regiones!"
        showClearButton="focus"
        debounce={1000}
        onIonInput={(ev: Event) => handleInput(ev)}
      ></IonSearchbar>

      {/* Mostrar los resultados solo si hay una consulta */}
      {query && (
        <IonList>
          {results.map((result, index) => (
            <IonItem key={index}>{result}</IonItem>
          ))}
        </IonList>
      )}
    </>
  );
}

export default Busqueda;
