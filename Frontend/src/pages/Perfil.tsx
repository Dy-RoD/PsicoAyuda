import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton, IonIcon, IonButtons, IonImg, IonMenuButton, IonCheckbox, IonInput, IonModal, IonAlert } from '@ionic/react';
import { star, heartOutline, addCircleOutline, openOutline, logoWhatsapp, trash, starOutline } from 'ionicons/icons';
import './Perfil.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
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

interface Decoded {
  id: number;
  nombre: string;
  apellido: string;
  tipoUsuario: string;
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
    }

    if (localStorage.getItem('profesionalSeleccionado')) {
      userId = localStorage.getItem('profesionalSeleccionado');
    }
    else {
      userId = localStorage.getItem('userData');
    }
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<any[]>([]);
  const [showAddComentModal, setshowAddComentModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  
  const handleNextModal = () => {
    if (!newComment.trim()) {
      setError('El comentario no puede estar vacío.');
      return;
    }
    setError('');
    setshowAddComentModal(false);
    setShowRatingModal(true);
  };

  const handleRate = (stars: number) => {
    setRating(stars);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let verificador = 0;
    if (rating === 0) {
      alert('Por favor selecciona una calificación.');
      return;
    }
    const newRating = (parseInt(calificacion) + rating)/ 2;
    try {
      const response = await axios.post('http://localhost:3000/api/users/addComentario', {
        comentario: newComment, 
        idProfesional: localStorage.getItem('profesionalSeleccionado'), 
        idCliente: localStorage.getItem('userData'),
      });
      if (response.data.success) 
        verificador= 1
      else{
        alert('Error al añadir comentario');
      }
    } catch (err) {
      alert('Error del servidor al añadir comentario');
    }
    if (verificador === 1) {
      try {
        const res = await axios.post('http://localhost:3000/api/users/updateCalificacion', {
          id: localStorage.getItem('profesionalSeleccionado'),
          calificacion: newRating,
        });
        if (res.data.success) {
        alert('¡Comentario y calificación agregados exitosamente!');
        verificador= 0;
        setShowRatingModal(false);
        setshowAddComentModal(false);
        setNewComment('');
        setRating(0);
        window.location.href = '/Perfil';
        }
        else{
          alert('Error al actualizar la calificación');
        }
      } catch (err) {
        alert('Error del servidor al actualizar la calificación');
      }
    }
  };
  const handleDelete = () => {
    // Aquí debes agregar la lógica para eliminar los elementos seleccionados desde la base de datos
    // Cerrar modal después de eliminación
    setShowDeleteModal(false);
  };

  const handleAddTitle = () => {
    // Aquí puedes agregar la lógica para agregar un título a la base de datos
    setShowAddModal(false);
  };

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
      alert("Error al obtener los datos del usuario.");
    });
  }, []);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      try {
        if (localStorage.getItem('token.id') === userId) {
          if  (localStorage.getItem('token.tipoUsuario') === 'profesional') {
          const response = await axios.get<Cliente[]>(`http://localhost:3000/api/users/recomendacionesPro/${userId}`);
          setRecomendaciones(response.data)
          } else {
            const response = await axios.get<Cliente[]>(`http://localhost:3000/api/users/recomendacionesCli/${userId}`);
            setRecomendaciones(response.data)
          }
        }
        else{
          const response = await axios.get<Cliente[]>(`http://localhost:3000/api/users/recomendacionesPro/${userId}`);
          setRecomendaciones(response.data)
        }
      } catch (error) {
        alert('Error al obtener recomendaciones');
      }
    };
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
        alert("Error al obtener los comentarios");
      }
    };

    fetchComentarios();
  }, []);

  const  handleCalendario = async () => {
    if (localStorage.getItem('nombreUsuario')) localStorage.removeItem('nombreUsuario');
    localStorage.setItem('nombreUsuario', nombre +' '+ apellido);
    window.location.href = `./Calendario`;
  }
  
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonTitle className='logoBtn'><IonButton><IonImg className='logo' src='../assets/images/logo.png'/></IonButton></IonTitle>
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
              <IonButton className="reservaBt" onClick={handleCalendario} routerLink={`./Calendario`}>¡Reserva!</IonButton>
            </div>
          </section>

          {/* Sección Títulos */}
          <section className="seccionTitulos">
            <div className="container-Titulos">
              {!localStorage.getItem('profesionalSeleccionado') ? (
                <h2>Títulos
                <IonButton onClick={() => setShowAddModal(true)} className="add-button">
                <IonIcon icon={addCircleOutline} />
                </IonButton>
                <IonButton onClick={() => setShowDeleteModal(true)} className="delete-button">
                <IonIcon icon={trash} />
                </IonButton>
                </h2>
              ): <h2>Títulos</h2>}
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
              {!localStorage.getItem('profesionalSeleccionado') ? (
                <h2>Especialidades
                <IonButton onClick={() => setShowAddModal(true)} className="add-button">
                <IonIcon icon={addCircleOutline} />
                </IonButton>
                <IonButton onClick={() => setShowDeleteModal(true)} className="delete-button">
                <IonIcon icon={trash} />
                </IonButton>
                </h2>
              ): <h2>Especialidades</h2>}
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
              {!localStorage.getItem('profesionalSeleccionado') ? (
                <h2>Experiencias
                <IonButton onClick={() => setShowAddModal(true)} className="add-button">
                <IonIcon icon={addCircleOutline} />
                </IonButton>
                <IonButton onClick={() => setShowDeleteModal(true)} className="delete-button">
                <IonIcon icon={trash} />
                </IonButton>
                </h2>
              ): <h2>Experiencias</h2>}
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
              {!localStorage.getItem('profesionalSeleccionado') ? (
                <h2>Recomendaciones
                <IonButton onClick={() => setShowAddModal(true)} className="add-button">
                <IonIcon icon={addCircleOutline} />
                </IonButton>
                <IonButton onClick={() => setShowDeleteModal(true)} className="delete-button">
                <IonIcon icon={trash} />
                </IonButton>
                </h2>
              ): <h2>Recomendaciones</h2>}
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
               {localStorage.getItem('profesionalSeleccionado') ? (
                <h2>Comentarios
                  <IonButton onClick={() => setshowAddComentModal(true)} className="add-button">
                  <IonIcon icon={addCircleOutline} />
                  </IonButton>
                </h2>
              ): <h2>Comentarios 
                  <IonButton onClick={() => setShowDeleteModal(true)} className="delete-button">
                  <IonIcon icon={trash} />
                  </IonButton>
                </h2>}
              <ul>
                {comentarios.length === 0 || comentarios.every(comentario => !comentario.nombre || !comentario.apellido || !comentario.comentario) ? (
                  <li className='noData'>No hay comentarios disponibles</li>
                ) : (
                  comentarios.map((comentario, index) => (
                    <li key={index} className="UserComment">
                      <strong>{comentario.nombre} {comentario.apellido}:</strong>
                      <p className='pComment'>{comentario.comentario}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <hr />
          </section>
        </div>

        {/* Modal para escribir comentario */}
        <IonModal isOpen={showAddComentModal} className="ion-modal" onDidDismiss={() => setshowAddComentModal(false)}>
          <div className="modal-container">
            <h3 className="modal-header">Escribe tu comentario</h3>
            <div className='modal-input'>
              <IonInput
              value={newComment}
              onIonChange={(e: CustomEvent) => setNewComment(e.detail.value as string)}
              />
              <IonButton color={'secondary'} onClick={() => setshowAddComentModal(false)}>Cerrar</IonButton>
              <IonButton color={'success'} onClick={handleNextModal}>Comentar</IonButton>
            </div>
          </div>
        </IonModal>

        {/* Modal para calificar */}
        <IonModal isOpen={showRatingModal} className="ion-modal" onDidDismiss={() => setShowRatingModal(false)}>
          <div className="modal-container">
            <h3 className="modal-header">Califica tu experiencia</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <IonIcon
                  key={starValue}
                  icon={starValue <= rating ? star : starOutline}
                  className="star-icon"
                  onClick={() => handleRate(starValue)}
                />
              ))}
            </div>
            <IonButton color={'secondary'} onClick={() => setShowRatingModal(false)}>Cancelar</IonButton>
            <IonButton color={'success'} onClick={handleSubmit}>Calificar</IonButton>
          </div>
        </IonModal>

        {/* Modal para Agregar */}
        <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
          <div className="modal-content">
            <h3>Agregar Título</h3>
            <IonInput placeholder="Ingrese el título" />
            <IonButton onClick={handleAddTitle}>Agregar</IonButton>
            <IonButton onClick={() => setShowAddModal(false)}>Cerrar</IonButton>
          </div>
        </IonModal>

        {/* Modal para Eliminar */}
        <IonModal isOpen={showDeleteModal} onDidDismiss={() => setShowDeleteModal(false)}>
          <div className="modal-content">
            <h3>Eliminar Elementos</h3>
            <ul>
              {titulos.map((titulo, index) => (
                <li key={index}>
                  <IonCheckbox
                    onIonChange={() => {
                      const newSelection = [...itemsToDelete];
                      if (newSelection.includes(titulo)) {
                        newSelection.splice(newSelection.indexOf(titulo), 1);
                      } else {
                        newSelection.push(titulo);
                      }
                      setItemsToDelete(newSelection);
                    }}
                  />
                  {titulo}
                </li>
              ))}
            </ul>
            <IonButton onClick={handleDelete}>Confirmar Eliminación</IonButton>
            <IonButton onClick={() => setShowDeleteModal(false)}>Cerrar</IonButton>
          </div>
        </IonModal>
        <IonFooter className='fut'>
            <p>@2024 hecho por Dylan Rodriguez</p>    
        </IonFooter>  
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
