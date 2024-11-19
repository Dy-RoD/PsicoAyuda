import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonIcon, IonButtons, IonImg, IonMenuButton } from '@ionic/react';
import { star } from 'ionicons/icons';
import "./Profesionales.css";

interface Profesional {
  id: string;
  foto: string; // Cambiado a string para soportar URL de imágenes.
  nombre: string;
  apellido: string;
  calificacion: number;
}

const Profesionales: React.FC = () => {
  const { region } = useParams<{ region: string }>();
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const history = useHistory();

  // Función para capitalizar el texto
  const capitalize = (text: string) => {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/profesionales/${region}`);
        setProfesionales(response.data);
      } catch (error) {
        console.error('Error al cargar los profesionales:', error);
      }
    };

    fetchProfesionales();
  }, [region]);

  // Función para navegar al perfil del profesional
  const goToPerfil = (profesional: Profesional) => {
    if (localStorage.getItem('profesionalSeleccionado')) localStorage.removeItem('profesionalSeleccionado')
    localStorage.setItem('profesionalSeleccionado', profesional.id);
    history.push('/perfil');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='logoBtn'><IonButton routerLink="/"><IonImg className='logo' src='../assets/images/logo.png'/></IonButton></IonTitle>
          <IonButtons slot='end'><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {profesionales.length > 0 ? (
            profesionales.map((profesional) => (
              <IonItem key={profesional.id} className="container-Usuario">
                <img className="perfilIMG" src={profesional.foto || "../assets/images/imagePerfil.svg"} alt={profesional.nombre} />
                <div>
                  <p className="nombreProfesional">
                    <strong>Nombre:</strong> {capitalize(profesional.nombre)} {capitalize(profesional.apellido)}
                  </p>
                  <h2 className="calProfesional">
                    {profesional.calificacion}/5 <IonIcon icon={star} />
                  </h2>
                </div>
                <IonButton
                  slot="end"
                  color="primary"
                  onClick={() => goToPerfil(profesional)}
                >
                  Ver Perfil
                </IonButton>
              </IonItem>
            ))
          ) : (
            <IonItem className="noData">No se encontraron profesionales en esta región.</IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profesionales;
