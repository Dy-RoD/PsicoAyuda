import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonInput, IonList, IonItem, IonLabel, IonFooter, IonCheckbox, IonPage, IonMenuButton, IonImg, IonSelect, IonSelectOption } from '@ionic/react';
import { searchOutline, listOutline, arrowBackOutline } from 'ionicons/icons';
import './Registrarse.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import axios from 'axios';

const Registrarse = () => {
  const key = "6LfkK3oqAAAAALTCp8eulJFj74QqZIPsKYgNLA55"; //Clave para el CAPTCHA en el formulario de registro
  const [captchaComplete, setCaptchaComplete] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [region, setRegionSeleccionada] = useState<string | undefined>(undefined);
  const [correo, setCorreo] = useState('');
  const [fono, setFono] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<string | undefined>(undefined);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };
  const handleApellidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApellido(e.target.value);
  };
  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRut(e.target.value);
  };
  const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(e.target.value);
  };
  const handleFonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFono(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleTipoUsuarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoUsuario(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionSeleccionada(e.target.value);
  };
  const handleCaptchaChange = (value: any) => {
    setCaptchaComplete(!!value);
  };

  const handleSubmit = () => {
    if (!region) {
      alert('Por favor, selecciona una región');
    }
    if (!captchaComplete) {
      alert('Por favor, completa el CAPTCHA antes de continuar.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/auth/Registrar', {
            "nombre": nombre,
            "apellido": apellido,
            "rut": rut,
            "region": region,
            "correo": correo,
            "fono":fono,
            "password":password,
            "tipoUsuario": tipoUsuario
        });
        const { token } = response.data;
        localStorage.setItem('token', token); // Guardar el token en localStorage
        alert('Registro exitoso');
        window.location.href = "/Home"; // Redireccionar a la página principal al registrarse correctamente
    } catch (err) {
      console.error("Error al registrarse", err);
      alert('Datos incorrectos');
    }
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
        {/* Formulario de Registro */}
        <div className="centrar-registrar">
          <section className="registrar">
            <form id="formRegistro" onSubmit={handleLogin}>
              <h1>¡Regístrate!</h1>
              <IonLabel>Nombre</IonLabel>
              <div className="input-Registrarse">
                <IonInput type="text" id="nombre" value={nombre} onIonChange={handleNombreChange} required />
              </div>
              <IonLabel>Apellido(s)</IonLabel>
              <div className="input-Registrarse">
                <IonInput type="text" id="apellido" value={apellido} onIonChange={handleApellidoChange} required />
              </div>
              <IonLabel>RUT (sin punto, con guion)</IonLabel>
              <div className="input-Registrarse">
                <IonInput type="text" id="rut" value={rut} onIonChange={handleRutChange} placeholder='12345678-9' required />
              </div>
              <IonLabel>Región</IonLabel>
              <IonItem className="check" >
                <IonSelect label="Region" placeholder="Seleccione!" value={region} onIonChange={handleChange}>
                  <IonSelectOption value="arica_y_parinacota">Arica y Parinacota</IonSelectOption>
                  <IonSelectOption value="antofagasta">Antofagasta</IonSelectOption>
                  <IonSelectOption value="atacama">Atacama</IonSelectOption>
                  <IonSelectOption value="aysen">Aysén</IonSelectOption>
                  <IonSelectOption value="biobio">Biobío</IonSelectOption>
                  <IonSelectOption value="coquimbo">Coquimbo</IonSelectOption>
                  <IonSelectOption value="la_arauncania">La Araucanía</IonSelectOption>
                  <IonSelectOption value="los_lagos">Los Lagos</IonSelectOption>
                  <IonSelectOption value="los_rios">Los Ríos</IonSelectOption>
                  <IonSelectOption value="magallanes">Magallanes</IonSelectOption>
                  <IonSelectOption value="maule">Maule</IonSelectOption>
                  <IonSelectOption value="metropolitana">Metropolitana</IonSelectOption>
                  <IonSelectOption value="nuble">Ñuble</IonSelectOption>
                  <IonSelectOption value="ohiggins">O'Higgins</IonSelectOption>
                  <IonSelectOption value="tarapaca">Tarapacá</IonSelectOption>
                  <IonSelectOption value="valparaiso">Valparaíso</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonLabel>Email</IonLabel>
              <div className="input-Registrarse">
                <IonInput type="email" id="email" value={correo} onIonChange={handleCorreoChange} placeholder='ejemplo@ejemplo.com' required />
              </div>
              <IonLabel>Telefono</IonLabel>
              <div className="input-Registrarse">
                <IonInput type='text' id="fono" value={fono} onIonChange={handleFonoChange} placeholder='912345678' required />
              </div>
              <IonLabel>Contraseña</IonLabel>
              <div className="input-Registrarse">
                <IonInput type="password" id="password" value={password} onIonChange={handlePasswordChange} required />
              </div>
              <IonLabel>Confirmar Contraseña</IonLabel>
              <div className="input-Registrarse">
                <IonInput type="password" id="confirmPassword" required />
              </div>
              <IonItem className="check" >
                <IonSelect label="Seleccione su caso"  placeholder="Click!" value={tipoUsuario} onIonChange={handleTipoUsuarioChange}>
                  <IonSelectOption value="cliente">Cliente</IonSelectOption>
                  <IonSelectOption value="profesional">Profesional</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem lines="none" className="check">
                <IonCheckbox id="tycCheckbox" />
                <IonLabel><a href="#tyc">Términos y condiciones</a></IonLabel>
              </IonItem>
              <div className='captcha'>
                <ReCAPTCHA
                sitekey={key}
                onChange={handleCaptchaChange}
                />
              </div>
              <IonButton className="submit" type="submit" expand="full" disabled={!captchaComplete}>Ingresar</IonButton>
              <IonButton expand="block" className="logearse" routerLink="/Home">Iniciar sesion</IonButton>
            </form>
          </section>
        </div>

        {/* Footer */}
        <IonFooter>
          <IonToolbar>
            <p>@2024 hecho por Dylan Rodriguez</p>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Registrarse;
