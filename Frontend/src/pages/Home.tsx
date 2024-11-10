import { IonContent, IonHeader, IonToolbar, IonImg, IonTitle, IonButtons, IonButton, IonIcon, IonMenu, IonInput, IonList, IonItem, IonLabel, IonFooter, IonPage, IonMenuButton } from '@ionic/react';
import { searchOutline, listOutline, arrowBackOutline } from 'ionicons/icons';
import './Home.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import  axios from 'axios';

const Home = () => {
  const [captchaComplete, setCaptchaComplete] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const key = "6LfkK3oqAAAAALTCp8eulJFj74QqZIPsKYgNLA55"; //Clave para el CAPTCHA en el formulario de login

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
  };
  const handleCaptchaChange = (value: any) => {
    setCaptchaComplete(!!value);
  };



  const handleSubmit = async () => {
    if (!captchaComplete) {
      alert('Por favor, completa el CAPTCHA antes de continuar.');
    }
    
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(correo, password);
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            "email":correo,
            "password":password
        });
        const { token } = response.data;
        localStorage.setItem('token', token); // Guardar el token en localStorage
        alert('Inicio de sesión exitoso');
        window.location.href = "/Perfil"; // Redireccionar a la página principal al iniciar sesión correctamente
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      alert('Usuario o contraseña incorrectos');
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
      {/**/}
      <IonContent > 
        <div className="centrar-login">
          <section className="login">
            <form id="formLogin" onSubmit={handleLogin}>
              <h1>Inicia Sesión!</h1>
              <IonLabel>Email:</IonLabel>
              <div className="input-Login">
                <IonInput type='email' value={correo} onIonChange={handleEmailChange} required></IonInput>
              </div>
              <IonLabel>Contraseña:</IonLabel>
              <div className="input-Login">
                <IonInput type='password' value={password} onIonChange={handlePasswordChange} required></IonInput>
              </div>
              <div className='captcha'>
                <ReCAPTCHA
                sitekey={key}
                onChange={handleCaptchaChange}
                />
              </div>
              <IonButton expand="full" className="ingresar" type='submit' disabled={!captchaComplete}>Ingresar</IonButton>
              <IonButton expand="block" className="registrarse" routerLink="/Registrarse">¡Regístrate!</IonButton>
            </form>
          </section>
        </div>
        <IonFooter>
          <IonToolbar>
            <p>@2024 hecho por Dylan Rodriguez</p>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Home;
