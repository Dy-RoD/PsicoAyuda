import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton, IonIcon, IonButtons, IonImg, IonMenuButton } from '@ionic/react';
import { star, heartOutline, addCircleOutline, openOutline, logoWhatsapp } from 'ionicons/icons';
import './Perfil.css';
import axios from 'axios';

interface Recomendacion {
  descripcion: string;
  url: string;
}

interface Cliente {
  nombre: string;
  apellido: string;
  recomendaciones: Recomendacion[];
}

interface Comentario {
  nombre: string;
  apellido: string;
  comentario: string;
}

const Perfil: React.FC = () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/home';
  }
  const [profesional, setProfesional] = useState<number | null>(null);
  let userId: string | null;
  useEffect(() => {
    const storedProfesional = localStorage.getItem('profesionalSeleccionado');
    if (storedProfesional) {
      setProfesional(JSON.parse(storedProfesional));
    } else {
      console.error('No se encontraron datos del profesional.');
    }

    if (localStorage.getItem('profesionalSeleccionado')) {
      userId = localStorage.getItem('profesionalSeleccionado');
    }
    else {
      userId = localStorage.getItem('userData');
    }
    console.log("id",userId);
  }, []);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [titulos, setTitulos] = useState([]);
  const [foto, setFoto] = useState('');
  const [fono, setFono] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState<Cliente[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [visibleClientes, setVisibleClientes] = useState(2);
  
  useEffect(() => {
    
    axios.get(`http://localhost:3000/api/users/perfil/${userId}`, { 
    })
    .then(response => {
      setNombre(response.data.nombre);
      setApellido(response.data.apellido);
      setFono(response.data.fono);
      setCalificacion(response.data.calificacion);
      setTitulos(response.data.titulos);
      setEspecialidades(response.data.especialidades);
      setExperiencias(response.data.experiencias);
    })
    .catch(error => {
      console.error(error);
      alert("Error al obtener los datos del usuario.");
    });
  }, []);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      try {
        if (localStorage.getItem('token.id') === userId) {
          if  (localStorage.getItem('token.tipoUsuario') === 'profesional') {
          const response = await axios.get<Cliente[]>(`http://localhost:3000/api/users/recomendacionesPro/${userId}`);
          console.log("Datos recibidos del backend token:", response.data);
          setRecomendaciones(response.data)
          } else {
            const response = await axios.get<Cliente[]>(`http://localhost:3000/api/users/recomendacionesCli/${userId}`);
            console.log("Datos recibidos del backend token:", response.data);
            setRecomendaciones(response.data)
          }
        }
        else{
          const response = await axios.get<Cliente[]>(`http://localhost:3000/api/users/recomendacionesPro/${userId}`);
          console.log("Datos recibidos del backend sin token:", response.data);
          setRecomendaciones(response.data)
        }
      } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
      }
    };
    console.log("recomendaciones", recomendaciones);
    fetchRecomendaciones();
  }, []);

  const loadMoreClients = () => {
    setVisibleClientes(visibleClientes + 2); // Cargar 2 clientes más por cada clic
  };

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get<Comentario[]>(`http://localhost:3000/api/users/comentarios/${userId}`);
        setComentarios(response.data);
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    };

    fetchComentarios();
  }, []);
  
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
              <h1 className="nombre" autoCapitalize='true'>{nombre} {apellido}</h1>
              <h2 className="calificaciones">{calificacion}/5 <IonIcon icon={star} /></h2>
            </div>
            <div className="contBt">
              <a title="whatsapp" href={`https://wa.me/${fono}?text=Hola!%2C%20preg%C3%BAntame%20lo%20que%20necesites%20%3AD`} target="_blank" rel="noopener noreferrer">
                <IonButton id="chatbt" className="chateaBt">
                  <IonIcon icon={logoWhatsapp}></IonIcon>
                </IonButton>
              </a>
              {/* `./Calendario${id}` */}
              <IonButton className="reservaBt" routerLink={`./Calendario`}>¡Reserva!</IonButton>
            </div>
          </section>

          {/* Sección Títulos */}
          <section className="seccionTitulos">
            <div className="container-Titulos">
              <h2 className="titulo">Títulos</h2>
              <ul>
                {titulos.length > 0 ? (
                  titulos.map((titulo, index) => (
                    <li key={index}>
                      <img className="star" src="../assets/images/starSelect.png" alt="estrella" /> {titulo}
                    </li>
                  ))
                ) : (
                  <li className="noData">No hay títulos disponibles</li>
                )}
              </ul>
            </div>
            <hr />
          </section>

          {/* Sección Especialidades */}
          <section className="seccionEspecialidades">
            <div className="container-Especialidades">
              <h2>Especialidades</h2>
              <ul>
                {especialidades.length > 0 ? (
                  especialidades.map((especialidad, index) => (
                    <li key={index}>
                      <img className="star" src="../assets/images/starSelect.png" alt="estrella" /> {especialidad}
                    </li>
                  ))
                ) : (
                  <li className="noData">No hay especialidades disponibles</li>
                )}
              </ul>
            </div>
            <hr />
          </section>

          {/* Sección Experiencias */}
          <section className="seccionExperiencias">
            <div className="container-Experiencias">
              <h2>Experiencias</h2>
              <ul>
                {experiencias.length > 0 ? (
                  experiencias.map((experiencia, index) => (
                    <li key={index}>
                      <img className="star" src="../assets/images/starSelect.png" alt="estrella" /> {experiencia}
                    </li>
                  ))
                ) : (
                  <li className="noData">No hay experiencias disponibles</li>
                )}
              </ul>
            </div>
            <hr />
          </section>

          {/* Sección Recomendaciones */}
          <section className="seccionRecomendaciones">
            <div className="container-Recomendaciones">
              <h2>
                <IonIcon icon={heartOutline} /> Recomendaciones
              </h2>
              <ul>
                {recomendaciones.length === 0 || recomendaciones.every(recomendacion => !recomendacion.nombre || !recomendacion.apellido ) ? (
                    <li className='noData'>No hay recomendaciones disponibles</li>
                  ) : (
                    recomendaciones.slice(0, visibleClientes).map((cliente, index) => (
                      <li className="recomendList" key={index}>
                        <strong>{cliente.nombre} {cliente.apellido}:</strong>
                        <ul>
                          {cliente.recomendaciones.map((rec, i) => (
                            <li key={i}>
                              <img className="star" src="../assets/images/starSelect.png" alt="estrella"/>
                              {rec.descripcion}: <a className="urls" href={rec.url} target="_blank" rel="noopener noreferrer">{rec.url} <IonIcon icon={openOutline} /></a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))
                  )}
              </ul>
            </div>
            <hr />
            {/* Mostrar el botón solo si hay más clientes por cargar */}
            {recomendaciones && recomendaciones.length > visibleClientes && (
              <IonButton className="masClientes" onClick={loadMoreClients}>
                <IonIcon icon={addCircleOutline} /> Ver más recomendaciones
              </IonButton>
            )}
          </section>


          {/* Sección Comentarios */}
          <section className="seccionComentarios">
            <div className="container-Comentarios">
              <h2>Comentarios</h2>
              <ul>
                {comentarios.length === 0 || comentarios.every(comentario => !comentario.nombre || !comentario.apellido || !comentario.comentario) ? (
                  <li className='noData'>No hay comentarios disponibles</li>
                ) : (
                  comentarios.map((comentario, index) => (
                    <li key={index} className="UserComment">
                      <strong>{comentario.nombre} {comentario.apellido}:</strong>
                      <p>{comentario.comentario}</p>
                    </li>
                  ))
                )}
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
