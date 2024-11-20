import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonIcon,
  IonFooter,
  IonModal,
} from '@ionic/react';
import './Calendario.css';
import { balloonOutline, calendarOutline, arrowBackOutline, arrowForwardOutline, closeOutline, key } from 'ionicons/icons';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"

interface Decoded {
  id: number;
  nombre: string;
  apellido: string;
  tipoUsuario: string;
}
const Calendario = () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/home';
  }
  const ArrMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth());
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [diasCalendario, setDiasCalendario] = useState<string[]>([]);
  const [diaHoy, setDiaHoy] = useState(hoy.getDate());
  const [seleccionado, setSeleccionado] = useState(false);
  const [fechaInput, setFechaInput] = useState('');
  let [arrEventos, setArrEventos] = useState<any[]>([]);
  const [nombreEvento, setNombreEvento] = useState('');
  const [inicioEvento, setInicioEvento] = useState('');
  const [terminoEvento, setTerminoEvento] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [diaEvento, setDiaEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');let inicio = 1;
  const [eventosDelDia, setEventosDelDia] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [showDelModal, setShowDelModal] = useState(false);
  let nombre
  let userId;
  let tipoUsuario
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Decodificar el token
      const decoded: Decoded = jwtDecode(token);
      nombre = decoded.nombre + ' ' + decoded.apellido
      tipoUsuario = decoded.tipoUsuario
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  } else {
    console.log('No hay un token disponible');
  }
  useEffect(() => {
    const cargarEventos = async () => {
      if (localStorage.getItem('profesionalSeleccionado')) {
        userId = localStorage.getItem('profesionalSeleccionado');
      }
      else {
        userId = localStorage.getItem('userData');
      }

      try {
        if (localStorage.getItem('profesionalSeleccionado')) {
        const response = await axios.get(`http://localhost:3000/api/users/reservas/${userId}`);
        setArrEventos(response.data);
        }
        else {
          if(localStorage.getItem('token.tipoUsuario') === 'profesional') {
            const response = await axios.get(`http://localhost:3000/api/users/reservas/${userId}`);
            setArrEventos(response.data);
          } else {
            const response = await axios.get(`http://localhost:3000/api/users/reservasCli/${userId}`);
            setArrEventos(response.data);
          }
        }
      } catch (error) {
        console.error("Error al cargar los datos del servidor", error);
      }
    };

    cargarEventos();
  }, []);
  // Función para actualizar la fecha del día seleccionado
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);
  
  // Actualiza los días del calendario cada vez que se cambia el mes o año
  useEffect(() => {
    updateCalendario();
  }, [mes, anio, arrEventos]);

  const updateCalendario = () => {
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    const ultimoDiaPrevio = new Date(anio, mes, 0);
    const diasPrevio = ultimoDiaPrevio.getDate();
    const ultimaFecha = ultimoDia.getDate();
    const primerDiaSemana = primerDia.getDay();
    const siguientesDias = 7 - ultimoDia.getDay() - 1;

    let nuevosDias: string[] = [];

    // Agregar los días del mes anterior
    for (let i = primerDiaSemana; i > 0; i--) {
      nuevosDias.push(`<div class="dia previo">${diasPrevio - i + 1}</div>`);
    }

    // Agregar los días del mes actual
    for (let j = 1; j <= ultimaFecha; j++) {
      let evento = arrEventos.some(e => e.dia === j && e.mes === mes + 1 && e.anio === anio);
      if (j === diaHoy && anio === hoy.getFullYear() && mes === hoy.getMonth()) {
        // Día de hoy
        nuevosDias.push(evento ? `<div class="dia hoy evento ">${j}</div>` : `<div class="dia hoy ">${j}</div>`);
        fechaDiaSelec(j);
        updateEventos(j);
      } else {
        // Otros días
        nuevosDias.push(evento ? `<div class="dia evento">${j}</div>` : `<div class="dia">${j}</div>`);
      }
    }

    // Agregar los días del mes siguiente
    for (let k = 1; k <= siguientesDias; k++) {
      nuevosDias.push(`<div class="dia siguiente">${k}</div>`);
    }

    setDiasCalendario(nuevosDias);
  };

  const cambiarMes = (direccion: string) => {
    if (direccion === "prev") {
      if (mes === 0) {
        setMes(11);
        setAnio(anio - 1);
      } else {
        setMes(mes - 1);
      }
    } else {
      if (mes === 11) {
        setMes(0);
        setAnio(anio + 1);
      } else {
        setMes(mes + 1);
      }
    }
    updateCalendario();
  };

  const handleFechaInputChange = (e: any) => {
    let value = e.target.value.replace(/[^0-9/]/g, ''); // Solo permitir números y '/'
    
    // Insertar el slash al escribir después de 2 caracteres
    if (value.length === 2 && !value.includes('/')) {
      value += '/';
    }

    // Limitar a 7 caracteres
    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    // Si se elimina el slash, ajustar el valor
    if (e.inputType === 'deleteContentBackward' && value.length === 3) {
      value = value.slice(0, 2);
    }

    setFechaInput(value); // Actualizar el estado con la entrada formateada
  };

  // Función para ir a la fecha escrita
  const irFecha = () => {
    const arrFecha = fechaInput.split('/');
    if (arrFecha.length === 2) {
      const mesInput = parseInt(arrFecha[0], 10);
      const anioInput = parseInt(arrFecha[1], 10);
  
      // Validar el mes y año
      if (mesInput > 0 && mesInput < 13 && arrFecha[1].length === 4) {
        setMes(mesInput - 1); // El mes es 0-indexado
        setAnio(anioInput);
        updateCalendario(); // Actualizamos el calendario
        setFechaInput(''); // Vaciar el input después de usarlo
        return;
      }
    }
    alert('Fecha inválida');
  };

  // ABAJO

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleNombreInput = (e: any) => {
    const value = e.target.value.slice(0, 50);
    setNombreEvento(value);
  };

  const handleHoraInput = (e: any, setHora: React.Dispatch<React.SetStateAction<string>>) => {
    let value = e.target.value.replace(/[^0-9:]/g, '');
    if (value.length === 2) {
      value += ':';
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    setHora(value);
  };

  const agregarEvento = () => {
    const nuevoEvento = {
      titulo: nombreEvento,
      hora: `${inicioEvento} - ${terminoEvento}`,
    };
    setArrEventos(prev => {
      const eventosDelDia = prev.find(evento => evento.dia === diaHoy && evento.mes === mes + 1 && evento.anio === anio);
      if (eventosDelDia) {
        eventosDelDia.eventos.push(nuevoEvento);
      } else {
        return [...prev, { dia: diaHoy, mes: mes + 1, anio, eventos: [nuevoEvento] }];
      }
      return prev;
    });
    toggleForm();
  };

  // Función para manejar el clic en un día
  const handleClickDia = (dia: any, index: number, diaTexto:string) => {
    if (dia.includes("previo") || dia.includes("siguiente")) {
        return;
    } else {
        setDiaSeleccionado(diaTexto);
        fechaDiaSelec(index);
        setSeleccionado(!seleccionado);
    }
    updateEventos(index);
  };
  // Funcion para actualizar los eventos del día seleccionado
  const fechaDiaSelec = (fecha: number) => {
    const dia = new Date(anio, mes, fecha);
    const nombreDia = new Intl.DateTimeFormat('es-ES', { weekday: 'short'}).format(dia);

    // Actualizamos los estados para reflejar el día y la fecha en la UI
    setDiaEvento(nombreDia);
    setFechaEvento(`${fecha} ${ArrMeses[mes]} ${anio}`);
  };

  const updateEventos = (fecha: number) => {
    let eventos: JSX.Element[] = [];

    arrEventos.forEach((evento) => {
        // Verificamos que el evento tenga valores válidos
        if (
            evento.dia !== undefined &&
            evento.mes !== undefined &&
            evento.anio !== undefined &&
            fecha === evento.dia &&
            mes + 1 === evento.mes &&
            anio === evento.anio
        ) {
            // Si hay eventos, se preparan para mostrar en pantalla
            eventos.push(
                <div className="evento" key={evento.id} onClick={() =>{ setSelectedEventId(evento.id); setShowDelModal(true);}} >
                    <div className="titulo" >
                        <i className="bi bi-balloon-heart"></i>
                        <h3 className="titulo-evento">{evento.nombre}</h3>
                    </div>
                    <div className="hora-evento">
                      <span className="hora-evento">{`${evento.inicio} - ${evento.termino}`}</span>
                    </div>
                </div>
            );
        }
    });

    // Si no hay eventos para mostrar
    if (eventos.length === 0) {
        eventos = [
            <div className="no-eventos" key="no-eventos">
                <h3>No hay reservas</h3>
            </div>,
        ];
    }

    // Actualiza el estado de eventos del día
    setEventosDelDia(eventos);
  };

  const  handleDelEvento = async () => {
    if (selectedEventId !== null) {
      try {
        const response = await axios.put(`http://localhost:3000/api/users/delReserva/${selectedEventId}`, {
        });
        if (response.data.success) {
          alert('Reserva Eliminada exitosamente.');
          setShowDelModal(false);
          // eliminamos el evento de la lista y actualizamos el calendario y los eventos del día seleccionado
          window.location.href = '/Calendario';
        } else {
          alert('Error al Eliminar la reserva.');
        }
      } catch (err) {
        console.error(err);
        alert('Error al Eliminar la reserva.');
      }
    }
  };

  const handleAddEvento = async () => {
    if (!nombreEvento || !inicioEvento || !terminoEvento) {
      alert('Todos los campos son obligatorios.');
    }
    try {
      const cliente = localStorage.getItem('profesionalSeleccionado')
      let response
      if (!cliente) {
        alert('Debes seleccionar un profesional para reservar.');
        return;
      }
      if (localStorage.getItem('token.tipoUsuario') === 'profesional') {
        response = await axios.put(`http://localhost:3000/api/users/addReserva`, {dia: diaSeleccionado, mes: mes + 1, anio: anio, inicio: inicioEvento, termino: terminoEvento, nombre: nombreEvento, idUsuario: localStorage.getItem('userData'), idCliente: localStorage.getItem('profesionalSeleccionado')  });
      }
      else {
        response = await axios.put(`http://localhost:3000/api/users/addReserva`, {dia: diaSeleccionado, mes: mes + 1, anio: anio, inicio: inicioEvento, termino: terminoEvento, nombre: nombreEvento, idUsuario: localStorage.getItem('profesionalSeleccionado'), idCliente: localStorage.getItem('userData')  });
      }
      
      if (response.data.success) {
        alert('Reserva agregada exitosamente.');
      } else {
        alert('Error al agregar la reserva.');
      }
    } catch (err) {
      console.error(err);
      alert('Error del servidor al agregar la reserva.');
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='logoBtn'>
            <IonButton><IonImg className='logo' src='../assets/images/logo.png' /></IonButton>
          </IonTitle>
          <IonButtons slot='end'><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='datosUsuario'>
          <h1 className="Usuario" autoCapitalize='true' >{nombre}</h1>
          <IonButton className='volverPerfil' routerLink='/Perfil'>Ir al perfil</IonButton>
        </div>
        
        {/* Calendario */}
        <div className="body-calendario">
          <div className="container-calendario">
            {/* Lado Izquierdo */}
            <div className="izquierda">
              <div className="calendario">
                <div className="mes">
                  <IonButton onClick={() => cambiarMes("prev")}>
                    <IonIcon icon={arrowBackOutline}></IonIcon>
                  </IonButton>
                  <div className="fecha">{ArrMeses[mes]} {anio}</div>
                  <IonButton onClick={() => cambiarMes("next")}>
                    <IonIcon icon={arrowForwardOutline}></IonIcon>
                  </IonButton>
                </div>
                <div className="semana">
                  <div>dom</div>
                  <div>lun</div>
                  <div>mar</div>
                  <div>mie</div>
                  <div>jue</div>
                  <div>vie</div>
                  <div>sab</div>
                </div>
                <div className="dias">
                  {/* Renderizamos los días dinámicamente */}
                  {diasCalendario.map((diaHtml, index) => {
                    // Convertimos la cadena de HTML en un objeto DOM temporal para extraer las clases y el contenido
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = diaHtml.trim();
                    const diaElement = tempDiv.firstChild as HTMLElement;

                    // Si el contenido del día no es válido, omitimos este paso
                    if (!diaElement) return null;

                    // Extraemos la clase y el texto del día
                    const diaClase = diaElement.className;
                    const diaTexto = diaElement.innerHTML;
                    // Renderizamos el día con la clase adecuada y el contenido correcto
                  return (
                      <div
                        key={index}
                        className={`${diaClase} ${diaSeleccionado === diaTexto ? 'seleccionado' : ''}`}
                        onClick={() => handleClickDia(diaClase, parseInt(diaTexto), diaTexto)}
                      >
                        {diaTexto}
                      </div>
                    );
                  })}
                </div>
                {/* Búsqueda de una fecha */}
                <div className="buscar-fecha">
                  <div className="cont-fecha">
                    <IonInput
                      placeholder="MM/AAAA"
                      value={fechaInput}
                      onIonInput={handleFechaInputChange}
                      className="fecha-input"
                    ></IonInput>
                    <IonButton className="ir-fecha" onClick={irFecha}>
                      Ver
                    </IonButton>
                  </div>
                  <IonButton className="btn-hoy" onClick={() => {
                    setMes(new Date().getMonth());
                    setAnio(new Date().getFullYear());
                    updateCalendario();
                  }}>
                    Hoy
                  </IonButton>
                </div>
              </div>
            </div>

            {/* Lado Derecho */}
            <div className="derecha">
              <div className="fecha-hoy">
                <div className="dia-evento">{diaEvento}</div>
                <div className="fecha-evento">{fechaEvento}</div>
              </div>
              <div className="eventos">
                {eventosDelDia}
              </div>
              {tipoUsuario === 'profesional' ? (
                <div className="contenedor-aniadir-evento">
                  {isOpen && (
                    <div className="agregar-evento">
                      <div className="agregar-titulo-evento">
                        <div className="titulo-evento">Agregar Evento</div>
                        <IonButton className='cerrarBtn' fill="clear" onClick={toggleForm}>
                          <IonIcon icon={closeOutline} />
                        </IonButton>
                      </div>
                      <div className="detalles-evento">
                        <div className="input-evento">
                          <IonInput 
                            placeholder="Nombre Reserva" 
                            className="nombre-evento" 
                            value={nombreEvento} 
                            onIonInput={handleNombreInput} 
                          />
                        </div>
                        <div className="input-evento">
                          <IonInput 
                            placeholder="Hora Inicio" 
                            className="inicio-evento" 
                            value={inicioEvento} 
                            onIonInput={(e: { target: { value: string; }; }) => handleHoraInput(e, setInicioEvento)} 
                          />
                        </div>
                        <div className="input-evento">
                          <IonInput 
                            placeholder="Hora Termino" 
                            className="termino-evento" 
                            value={terminoEvento} 
                            onIonInput={(e: { target: { value: string; }; }) => handleHoraInput(e, setTerminoEvento)} 
                          />
                        </div>
                      </div>
                      <div className="agregar-boton-evento">
                        <IonButton 
                          className="agregar-bt-evento"
                          routerLink="/MetodoPago"
                          onClick={handleAddEvento}
                        > 
                          Añadir Evento
                        </IonButton>
                      </div>
                    </div>
                  )}
                  <IonButton className="aniadir-evento" onClick={toggleForm}>
                    <IonIcon icon={calendarOutline} />
                  </IonButton>
                </div>
              ) : null }
            </div>
          </div>
        </div>
        <IonModal isOpen={showDelModal} className="ion-modal" onDidDismiss={() => setShowDelModal(false)}>
        <div className="modal-container">
            <h2 className="modal-header">Eliminar Reserva</h2>
            <IonLabel position="stacked">¿Quieres eliminar esta reserva?</IonLabel>
              
            <IonButton color={'danger'} expand="full" onClick={handleDelEvento}>
              Eliminar
            </IonButton>
            <IonButton className="modal-button" expand="full" color="secondary" onClick={() => setShowDelModal(false)}>
              Cancelar
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <p>@2024 hecho por Dylan Rodriguez</p>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Calendario;

