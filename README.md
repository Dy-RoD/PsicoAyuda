# PsicoAyuda
## Descripción

El objetivo de la aplicación es la telemedicina, ofreciendo un software en  el cual permita la de manera facil y personalizada la atencion de profesionales en el  area  de la
psicologia y clientes que necesiten de ayuda, aportando una solucion y comportandose como un portal entre la comunicacion de los psicologos y pacientes.

## Tabla de Contenidos

1. [Funcionalidades Implementadas](#Funcionalidades-Implementadas)
2. [Implementacion de Inicio, Cierre y Backend](#Implementacion-de-Inicio,-Cierre-y-Backend)
3. [Conexion Entre  Datos y Logica](#Conexion-Entre-datos-y-logica)
4. [Aspectos de Seguridad Web](#Aspectos-de-Seguridad-Web)

## Funcionalidades Implementadas

- - ## PERFIL DEL PSICOLOGO:
- Descripción: Los psicólogos pueden crear y personalizar su perfil, incluyendo información sobre su experiencia, especialidades, tarifas, y disponibilidad.
- Roles involucrados: Psicólogo.
- Análisis: Facilita la presentación profesional y la visibilidad de los servicios ofrecidos, lo cual es esencial para que los usuarios elijan al profesional adecuado.
- Diseño: Interfaz de usuario para que los psicólogos puedan editar su perfil, con validaciones para campos obligatorios y opcionales.


- - ## AGENDA Y RESERVAS DE CITAS:
- Descripción: Los usuarios pueden ver la disponibilidad de los psicólogos y reservar citas online. Los psicólogos pueden gestionar su agenda y confirmar o rechazar citas.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Centraliza la gestión de citas, evitando conflictos de horario y facilitando la organización tanto para psicólogos como para usuarios.
- Diseño: Calendario interactivo para la gestión de citas, con notificaciones por correo y recordatorios.


- - ## BUSQUEDA DE PSICOLOGOS:
- Descripción: Los usuarios pueden buscar psicólogos por especialidad o ubicación con sugestiones en tiempo real.
- Roles involucrados: Cliente/Usuario.
- Análisis: Permite a los usuarios encontrar rápidamente a un psicólogo que se ajuste a sus necesidades específicas.
- Diseño: Barra de búsqueda con opciones de búsqueda en tiempo real que aparece al apretar el icono en forma de lupa.
> [!IMPORTANT] 
> **_Observación_: Esta Funcionalidad esta presente en todas las paginas por lo que no es necesario crear una nueva (pagina).**


- - ## EVALUACION DE SERVICIOS:
- Descripción: Los usuarios pueden calificar y dejar comentarios sobre los psicólogos después de una sesión.
- Roles involucrados: Cliente/Usuario.
- Análisis: Fomenta la transparencia y permite a los usuarios nuevos basarse en experiencias previas para elegir psicólogos.
- Diseño: Sistema de evaluación con estrellas y campo para comentarios, visible en el perfil del psicólogo.
> [!IMPORTANT]
> **_Observación_: Esta Funcionalidad está presente en la página `Perfil`, por lo que no es necesario crear paginas extras.**


- - ## MODULO DE PAGOS:
- Descripción: Procesamiento de pagos online por las sesiones realizadas.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Automatiza el proceso de pago, garantizando que las transacciones sean seguras y convenientes.
- Diseño: interfaz para poner datos para el pago de reserva de sesiones e integración de API de pago.


- - ## MENSAJERIA PRIVADA:
- Descripción: Los usuarios pueden comunicarse con los psicólogos a través de un sistema de mensajería privada para resolver dudas antes de una sesión.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Proporciona un canal seguro y directo de comunicación, fomentando la interacción y resolución de dudas.
- Diseño: Boton que redirecciona a el Whatsapp del psicologo.

- - ## RECURSOS DE AYUDA:
- Descripción:  Acceso a una colección de artículos, videos, y otros recursos relacionados con la salud mental disponibles (proporcionado por el psicólogo a cargo) para los
- usuarios que hallan reservado la atención del profesional.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Proporciona material de apoyo para complementar las sesiones y educar a los usuarios sobre temas de salud mental.
- Diseño: apartado reservado en el perfil del psicólogo como “Recomendaciones”.

## Implementacion de Inicio, Cierre y Backend
La implementacion del inicio y cierre de sesion se encuentran presentes en el software, funcionando de manera perfecta e interactuando y pasando informacion desde el Frontend al
Backend y recibiendo la informacion de vuelta, permitiendo asi la autorizacion a utilizar la App o el cierre y redireccionamiento al inicio de la aplicacion respectivamente. En 
el caso de el Backend se utilizo `Express.js` para la gestion de la API, a su vez la API REST cuenta con todos sus metodos integrados `GET`, `PUT` y `POST`.
> [!IMPORTANT]
> El metodo `DELETE` no se encuentra integrado por seguridad y fue reemplazado por el metodo `PUT`, el cual por dar un ejemplo, al querer eliminar una reserva, esta no se elimina
> complemante, si no que se deshabilita).

## Conexion Entre Datos y Logica
La conexion y traspaso de informacion entre el Frontend y Backend se maneja de manera correcta y segura, haciendo que los datos de los usuarios siempre esten resguardados y se
muestren de manera personalizada al usuario.

## Aspectos de Seguridad Web
En este proyecto se implementaron 4 aspectos  de seguridad web:
- Autenticacion y autorizacion de usuarios mediante JWT: Para poder navegar entre las distintas paginas de la aplicacion, se debe de autenticar que has sido autorizado a traves
del inicio de sesion y esto se hace a traves de un token que se genera de manera personalizada con los datos de cada usuario.
- hashing de contraseñas: Ya sea al registrarse o cambiar la contraseña, tu contraseña estara 100% resguardada ya que esta estara en todo momento encriptada, desde que entra al
Backend e incluso cuando se guarda en la base de datos, lo cual hace que a la hora de que se comprometan los datos, tu contraseña no se comprometera ya que se encuentra con Hash.
- Captcha: Al iniciar sesion o registrarse, se le pide al usuario validar de que no es un robot, agregandole una capa de seguridad en contra de los ataques ciberneticos.
- Sistema de roles: al registrarte, solo tienes 2 opciones, 1 es ser profesional y la otra es ser cliente, lo cual permite al  sistema manejar que y que no esta autorizado
a hacer un usuario mientras navega por la aplicacion.

## Creditos
Software creado por Dylan Rodriguez A.
