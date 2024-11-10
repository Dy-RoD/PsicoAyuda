# PsicoAyuda
## Descripción

El principal objetivo de la aplicación esta relacionado con la telemedicina, el cual involucra que haya un 
registro de psicólogos que ofrecen diferentes servicios para la atención de la salud mental de quién lo solicite.

## Tabla de Contenidos

1. [Implementación de 7 mockups UI en el framework Ionic](#Implementación-de-7-mockups-UI-en-el-framework-Ionic)
2. [modelo de la base de datos](#modelo-de-la-base-de-datos)
3. [Lectura de Datos JSON](#Lectura-de-Datos-JSON)
4. [Patrones de diseño](#Patrones-de-diseño)


## Implementación de 7 mockups UI en el framework Ionic
> [!IMPORTANT] 
> La aplicacion inicia en el archivo `Home.tsx` el cual reemplaza a `Login.html` de la entrega pasada.

- - ## PERFIL DEL PSICOLOGO:
- Descripción: Los psicólogos pueden crear y personalizar su perfil, incluyendo información sobre su experiencia, especialidades, tarifas, y disponibilidad.
- Roles involucrados: Psicólogo.
- Análisis: Facilita la presentación profesional y la visibilidad de los servicios ofrecidos, lo cual es esencial para que los usuarios elijan al profesional adecuado.
- Diseño: Interfaz de usuario para que los psicólogos puedan editar su perfil, con validaciones para campos obligatorios y opcionales.


- - ## AGENDA Y RESERVAS DE CITAS:
- Descripción: Los usuarios pueden ver la disponibilidad de los psicólogos y reservar citas online. Los psicólogos pueden gestionar su agenda y confirmar o rechazar citas.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Centraliza la gestión de citas, evitando conflictos de horario y facilitando la organización tanto para psicólogos como para usuarios.
- Diseño: Calendario interactivo para la gestión de citas.


- - ## BUSQUEDA DE PSICOLOGOS:
- Descripción: Los usuarios pueden buscar psicólogos por especialidad o ubicación con sugestiones en tiempo real.
- Roles involucrados: Cliente/Usuario.
- Análisis: Permite a los usuarios encontrar rápidamente a un psicólogo que se ajuste a sus necesidades específicas.
- Diseño: Barra de búsqueda con opciones de búsqueda en tiempo real que aparece al apretar el icono en forma de lupa.
> [!IMPORTANT]  
> Esta Funcionalidad esta presente en todas las paginas por lo que no es necesario crear una nueva (pagina).


- - ## EVALUACION DE SERVICIOS:
- Descripción: Los usuarios pueden calificar y dejar comentarios sobre los psicólogos después de una sesión.
- Roles involucrados: Cliente/Usuario.
- Análisis: Fomenta la transparencia y permite a los usuarios nuevos basarse en experiencias previas para elegir psicólogos.
- Diseño: Sistema de evaluación con estrellas y campo para comentarios, visible en el perfil del psicólogo.
> [!IMPORTANT] 
> Esta Funcionalidad está presente en las páginas "PerfilPsicologo" y "Chatea", por lo que no es necesario crear paginas extras.


- - ## MODULO DE PAGOS:
- Descripción: Procesamiento de pagos online por las sesiones realizadas.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Automatiza el proceso de pago, garantizando que las transacciones sean seguras y convenientes.
- Diseño: interfaz para poner datos para el pago de reserva de sesiones e integración de API de pago.


- - ## MENSAJERIA PRIVADA:
- Descripción: Los usuarios pueden comunicarse con los psicólogos a través de un sistema de mensajería privada para resolver dudas antes de una sesión.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Proporciona un canal seguro y directo de comunicación, fomentando la interacción y resolución de dudas.
- Diseño: Boton que redirecciona a el WhatsApp del psicologo.


- - ## RECURSOS DE AYUDA:
- Descripción:  Acceso a una colección de artículos, videos, y otros recursos relacionados con la salud mental disponibles (proporcionado por el psicólogo a cargo) para los usuarios que hallan reservado la atención del profesional.
- Roles involucrados: Psicólogo, Cliente/Usuario.
- Análisis: Proporciona material de apoyo para complementar las sesiones y educar a los usuarios sobre temas de salud mental.
- Diseño: apartado reservado en el perfil del psicólogo como “Recomendaciones”.



## modelo de la base de datos

[Diagrama De la Base de Datos a utilizar](https://imgur.com/a/MQmLy5b)

MySQL es una excelente opción para bases de datos relacionales debido a su alta fiabilidad y rendimiento. Ofrece una amplia compatibilidad con diversas plataformas y lenguajes de programación, lo que facilita su integración en proyectos. Además, cuenta con una comunidad activa y abundante documentación, lo que simplifica la resolución de problemas. Su escalabilidad permite manejar desde pequeños proyectos hasta aplicaciones empresariales de gran tamaño. Por último, su modelo de licencias open-source reduce costos, haciendo de MySQL una opción accesible y eficiente.

## Lectura de Datos JSON

Para leer datos JSON se utilizo el famoso framework llamado `Express` que nos permite hacer peticiones HTTP y utilizar JSON como el formato de datos.

El uso de `express` para leer JSON se puede ver y probar en la pagina [Reserva](https://imgur.com/a/B6Xns6J) en donde se utiliza un fichero JSON llamado `eventos.json` el cual llama a las reservas que tiene un usuario y se muestra en pantalla ( siempre y cuando el dia que tenga esa reserva este seleccionado y este contenga reservas).

## Patrones de diseño

- - ## DRAWER: 
- menu ubicado arriba a  la derecha de la pantalla que contiene botones  que redirigen a nuevas paginas, los que permiten al usuario cambiar de sección con un solo toque.

- - ## PULL TO REFRESH (Deslizar para actualizar):
- Este patrón se usa para actualizar el contenido de una pantalla deslizando hacia abajo, lo que resulta intuitivo en dispositivos móviles (se podra encontrar aplicado en  la pagina principal al estar o no logeado (aun no  construida).

- - ## NAVIGATION BAR:
- Barra de busqueda en el cual el  usuario  puede buscar ya sea psicologos o regiones  registradas  en la aplicacion.
