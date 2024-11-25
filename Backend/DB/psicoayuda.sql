-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 07:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psicoayuda`
--

-- --------------------------------------------------------

--
-- Table structure for table `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `idProfesional` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comentarios`
--

INSERT INTO `comentarios` (`id`, `comentario`, `idProfesional`, `idCliente`) VALUES
(1, '¡Recomendadísima! Mi pareja y yo pudimos salir adelante después de su ayuda a través de las sesiones.', 5, 7),
(2, 'Muy buena Psicologa, yo (el admin) mismo la probe', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `especialidad` varchar(255) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `especialidades`
--

INSERT INTO `especialidades` (`id`, `especialidad`, `idUsuario`) VALUES
(1, 'Psicología de Pareja y Familiar.', 5);

-- --------------------------------------------------------

--
-- Table structure for table `experiencias`
--

CREATE TABLE `experiencias` (
  `id` int(11) NOT NULL,
  `experiencia` varchar(255) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experiencias`
--

INSERT INTO `experiencias` (`id`, `experiencia`, `idUsuario`) VALUES
(1, '5 años en activo funcionamiento dentro del área.', 5),
(2, '2 años como trabajadora independiente', 5);

-- --------------------------------------------------------

--
-- Table structure for table `recomendaciones`
--

CREATE TABLE `recomendaciones` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `idProfesional` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recomendaciones`
--

INSERT INTO `recomendaciones` (`id`, `descripcion`, `url`, `idProfesional`, `idCliente`) VALUES
(1, 'Consejos para una buena convivencia:', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5, 7),
(2, 'Artículo sobre relaciones sanas:', 'https://es.wikipedia.org/wiki/No-Utilizar-Wikipedia-Como-Fuente', 5, 7),
(3, 'prueba descripcion', 'prueba de url', 5, 6),
(4, 'descripcion de la recomendacion', 'url-de-la-recomendacion', 5, 7),
(5, 'admin descripcion', 'admin url', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `mes` int(11) NOT NULL,
  `anio` int(11) NOT NULL,
  `inicio` varchar(5) NOT NULL,
  `termino` varchar(5) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `visible` tinyint(1) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservas`
--

INSERT INTO `reservas` (`id`, `dia`, `mes`, `anio`, `inicio`, `termino`, `nombre`, `visible`, `idUsuario`, `idCliente`) VALUES
(1, 9, 10, 2024, '10:30', '12:30', 'Reserva 1', 1, 5, 1),
(2, 9, 10, 2024, '14:30', '15:30', 'Reserva 2', 1, 5, 1),
(3, 9, 11, 2024, '12:30', '13:30', 'Reserva Dylan Rodriguez', 1, 5, 1),
(4, 9, 11, 2024, '16:30', '17:30', 'Reserva Lale Man', 1, 5, 6),
(5, 14, 11, 2024, '10:30', '12:30', 'Reserva 1', 1, 5, 1),
(6, 14, 11, 2024, '13:30', '14:30', 'Reserva 2', 1, 5, 6),
(7, 19, 12, 2024, '13:30', '14:30', 'hola mundo', 1, 5, 1),
(8, 9, 12, 2024, '17:10', '18:20', 'examen', 1, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `titulos`
--

CREATE TABLE `titulos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(500) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `titulos`
--

INSERT INTO `titulos` (`id`, `titulo`, `idUsuario`) VALUES
(1, 'Psicología - Pontificia Universidad Católica de Valparaíso.', 5),
(2, 'Certificado Ingles nivel B2', 5);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `rut` varchar(10) NOT NULL,
  `region` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `fono` varchar(30) DEFAULT NULL,
  `fotoPerfil` blob DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tipoUsuario` varchar(11) DEFAULT NULL,
  `calificacion` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `rut`, `region`, `email`, `fono`, `fotoPerfil`, `password`, `tipoUsuario`, `calificacion`) VALUES
(1, 'Dylan', 'Rodriguez', '21233531-2', 'valparaiso', 'dylanrod159@gmail.com', '123123123', NULL, '$2a$10$0XnYrl1ab081Y9igOvrOhusu.v/fF1a/T6hcYyUQobAUAMImhEeSm', 'admin', 4.9),
(5, 'lupita', 'rodriguez', '13244478-9', 'valparaiso', 'lupita@prueba', '+56988888888', NULL, '$2a$10$O2LrSRzI7V/sdFW2.m/IhuIFBZCDF1KYNHO8hJaOArNXp5bC3StOm', 'profesional', 4),
(6, 'lale', 'anabalon', '18239223-5', 'valparaiso', 'lale@man.com', '+56969696969', NULL, '$2a$10$pqFeXRuGTQWgIMQZKowYpuMqBH4GJsrxxSoTEvoJPimqqNLsDO/82', 'profesional', 4.9),
(7, 'Bella', 'Kodpher', '11111111-1', 'metropolitana', 'bellaKodpher@gmail.com', '945345345', NULL, '$2a$10$WxwS9rxSdkWq5ze/q.VyGO3t2mNin7WO13oe5LJLhWLU6TYdvIO5W', 'cliente', 4.9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idProfesional` (`idProfesional`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indexes for table `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `experiencias`
--
ALTER TABLE `experiencias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `recomendaciones`
--
ALTER TABLE `recomendaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idProfesional` (`idProfesional`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `titulos`
--
ALTER TABLE `titulos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `experiencias`
--
ALTER TABLE `experiencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recomendaciones`
--
ALTER TABLE `recomendaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `titulos`
--
ALTER TABLE `titulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idProfesional`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `especialidades`
--
ALTER TABLE `especialidades`
  ADD CONSTRAINT `especialidades_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `especialidades_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `especialidades_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `experiencias`
--
ALTER TABLE `experiencias`
  ADD CONSTRAINT `experiencias_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `experiencias_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recomendaciones`
--
ALTER TABLE `recomendaciones`
  ADD CONSTRAINT `recomendaciones_ibfk_1` FOREIGN KEY (`idProfesional`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recomendaciones_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `titulos`
--
ALTER TABLE `titulos`
  ADD CONSTRAINT `titulos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `titulos_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `titulos_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
