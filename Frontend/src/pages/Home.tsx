import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonImg,
  IonTitle,
  IonButtons,
  IonButton,
  IonInput,
  IonLabel,
  IonFooter,
  IonPage,
  IonMenuButton,
  IonModal,
  IonItem,
} from '@ionic/react';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [captchaComplete, setCaptchaComplete] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [rut, setRut] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const key = '6LfkK3oqAAAAALTCp8eulJFj74QqZIPsKYgNLA55';

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaComplete(!!value);
  };

  const handleRecover = async () => {
    if (!rut || !correo) {
      alert('Por favor ingresa todos los campos');
      return; // Si faltan datos, no enviar la solicitud
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/recover', { rut, email: correo });
      if (response.data.success) {
        localStorage.setItem('recoverId', response.data.userId);
        alert('Datos verificados, por favor actualiza tu contraseña.');
        setShowRecoverModal(false);
        setShowUpdateModal(true);
      } else {
        alert('Los datos no coinciden con ninguna cuenta.');
      }
    } catch (err) {
      console.error(err);
      alert('Error al verificar los datos.');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/changePass', {
        userId: localStorage.getItem('recoverId'),
        nuevaContrasena: newPassword,
      });
      if (response.data.success) {
        localStorage.removeItem('recoverId');
        alert('Contraseña actualizada exitosamente.');
        setShowUpdateModal(false);
      } else {
        alert('Error al actualizar la contraseña.');
      }
    } catch (err) {
      console.error(err);
      alert('Error al actualizar la contraseña.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaComplete) {
      alert('Por favor, completa el CAPTCHA antes de continuar.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: correo,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.userData));
      alert('Inicio de sesión exitoso');
      window.location.href = '/Perfil';
    } catch (err) {
      console.error('Error al iniciar sesión', err);
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="logoBtn">
            <IonButton>
              <IonImg className="logo" src="../assets/images/logo.png" />
            </IonButton>
          </IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="centrar-login">
          <section className="login">
            <form id="formLogin" onSubmit={handleLogin}>
              <h1>Inicia Sesión!</h1>
              <IonLabel>Email:</IonLabel>
              <div className="input-Login">
                <IonInput
                  type="email"
                  value={correo}
                  onIonChange={(e: CustomEvent) => setCorreo(e.detail.value as string)}
                  required
                />
              </div>
              
              <IonLabel>Contraseña:</IonLabel>
              <div className="input-Login">
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e: CustomEvent) => setPassword(e.detail.value as string)}
                  required
                />  
              </div>
              <ReCAPTCHA sitekey={key} onChange={handleCaptchaChange} />
              <IonButton expand="full" className="ingresar" type="submit" disabled={!captchaComplete}>
                Ingresar
              </IonButton>
              <IonButton expand="block" className="registrarse" routerLink="/Registrarse">
                ¡Regístrate!
              </IonButton>
              <IonButton expand="block" className="forgot-password" onClick={() => setShowRecoverModal(true)}>
                ¿Olvidaste tu contraseña?
              </IonButton>
            </form>
          </section>
        </div>

        {/* Modal de recuperación */}
        <IonModal isOpen={showRecoverModal} className="ion-modal" onDidDismiss={() => setShowRecoverModal(false)}>
          <div className="modal-container">
            <h2 className="modal-header">Recuperar Contraseña</h2>
              <IonLabel position="stacked">RUT (sin puntos, con guion)</IonLabel>
              <div className="modal-input">
                <IonInput
                value={rut}
                onIonChange={(e: CustomEvent) => setRut(e.detail.value as string)}
                required
                />
              </div>
              <IonLabel position="stacked">Correo</IonLabel>
              <div className="modal-input">
                <IonInput
                type="email"
                value={correo}
                onIonChange={(e: CustomEvent) => setCorreo(e.detail.value as string)}
                required
                />
              </div>
            <IonButton className="modal-button" expand="full" onClick={handleRecover}>
              Verificar
            </IonButton>
            <IonButton className="modal-button" expand="full" color="danger" onClick={() => setShowRecoverModal(false)}>
              Cancelar
            </IonButton>
          </div>
        </IonModal>



        {/* Modal de actualización */}
        <IonModal isOpen={showUpdateModal} onDidDismiss={() => setShowUpdateModal(false)}>
          <div className="modal-container">
            <h2 className="modal-header">Actualizar Contraseña</h2>
              <IonLabel position="stacked">Nueva Contraseña</IonLabel>
              <div className="modal-input">
                <IonInput
                  type="password"
                  value={newPassword}
                  onIonChange={(e: CustomEvent) => setNewPassword(e.detail.value as string)}
                  required
                />
              </div>
            <IonButton className="modal-button" expand="full" onClick={handleUpdatePassword}>
              Actualizar
            </IonButton>
            <IonButton className="modal-button" expand="full" color="danger" onClick={() => setShowUpdateModal(false)}>
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

export default Home;


/* 
<div className="input-Login">
  <IonInput type='email' value={correo} onIonChange={handleEmailChange} required></IonInput>
</div>*/