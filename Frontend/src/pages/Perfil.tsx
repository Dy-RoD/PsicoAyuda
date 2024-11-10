import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton, IonIcon, IonButtons, IonImg, IonMenuButton } from '@ionic/react';
import { star, lockClosed } from 'ionicons/icons';
import './Perfil.css';

const Perfil: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonTitle className='logoBtn'><IonButton routerLink="/"><IonImg className='logo' src='../assets/images/logo.png'/></IonButton></IonTitle>
          <IonButtons slot='end'><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Información del Usuario */}
        <div className="informacion">
          {/* Sección Usuario */}
          <section className="seccionUsuario">
            <div className="container-Usuario">
              <img className="perfilIMG" src="../assets/images/imagePerfil.svg" alt="perfil" />
              <h1 className="nombre">Lupita Rodriguez</h1>
              <h2 className="calificaciones">4.5/5 <IonIcon icon={star} /></h2>
            </div>
            <div className="contBt">
              <IonButton className="reservaBt" routerLink="./Calendario">¡Reserva!</IonButton>
            </div>
          </section>

          {/* Sección Títulos */}
          <section className="seccionTitulos">
            <div className="container-Titulos">
              <h2 className="titulo">Títulos</h2>
              <ul>
                <li><img className="star" src="../assets/images/starSelect.png" alt="estrella" /> Psicología - Pontificia Universidad Católica de Valparaíso.</li>
              </ul>
            </div>
            <hr />
          </section>

          {/* Sección Especialidades */}
          <section className="seccionEspecialidades">
            <div className="container-Especialidades">
              <h2>Especialidades</h2>
              <ul>
                <li><img className="star" src="../assets/images/starSelect.png" alt="estrella" /> Psicología de Pareja y Familiar.</li>
              </ul>
            </div>
            <hr />
          </section>

          {/* Sección Experiencias */}
          <section className="seccionExperiencias">
            <div className="container-Experiencias">
              <h2>Experiencias</h2>
              <ul>
                <li><img className="star" src="../assets/images/starSelect.png" alt="estrella" /> 5 años en activo funcionamiento dentro del área.</li>
              </ul>
            </div>
            <hr />
          </section>

          {/* Sección Recomendaciones */}
          <section className="seccionRecomendaciones">
            <div className="container-Recomendaciones">
              <h2><IonIcon icon={lockClosed} /> Recomendaciones</h2>
              <ul>
                <li><img className="star" src="../assets/images/starSelect.png" alt="estrella" /> 
                  Consejos para una buena convivencia: 
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></a>
                </li>
                <li><img className="star" src="../assets/images/starSelect.png" alt="estrella" /> 
                  Artículo sobre relaciones sanas: 
                  <a href="https://es.wikipedia.org/wiki/No-Utilizar-Wikipedia-Como-Fuente"></a>
                </li>
              </ul>
            </div>
            <hr />
          </section>

          {/* Sección Comentarios */}
          <section className="seccionComentarios">
            <div className="container-Comentarios">
              <h2>Comentarios</h2>
              <ul>
                <li className='UserComment'>Bella Kodpher.</li>
                <li>¡Recomendadísima! Mi pareja y yo pudimos salir adelante después de su ayuda a través de las sesiones.</li>
              </ul>
            </div>
            <hr />
          </section>
        </div>
        <IonFooter className='fut'>
            <p>@2024 hecho por Dylan Rodriguez</p>    
        </IonFooter>  
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
