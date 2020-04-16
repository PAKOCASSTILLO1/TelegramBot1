-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 03-03-2020 a las 01:27:03
-- Versión del servidor: 5.7.29-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciclo`
--

CREATE TABLE `ciclo` (
  `id_ciclo` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Estructura de tabla para la tabla `pregunta`
--
CREATE TABLE `pregunta` (
  `id_pregunta` int(11) NOT NULL COMMENT 'identificador único de la pregunta',
  `pregunta` varchar(200) DEFAULT NULL COMMENT 'pregunta',
  `estado` tinyint(4) DEFAULT NULL COMMENT '1=Activo, 2=Inactivo',
  `tipo_pregunta_id_tipo_pregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Estructura de tabla para la tabla `respuesta`
--
CREATE TABLE `respuesta` (
  `id_respuesta` int(11) NOT NULL COMMENT 'identificación unica de la respuesta',
  `respuesta` varchar(100) DEFAULT NULL COMMENT 'respuesta',
  `estado` tinyint(4) DEFAULT NULL COMMENT '1=Activo, 2=Inactivo',
  `pregunta_id_pregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Estructura de tabla para la tabla `respuestas_obtenidas`
--
CREATE TABLE `respuestas_obtenidas` (
  `id_respuestas_obtenidas` int(11) NOT NULL COMMENT 'identificador único de la respuesta obtenida',
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'fecha en que se respondio',
  `usuario_id_usuario` int(11) NOT NULL,
  `respuesta_id_respuesta` int(11) NOT NULL,
  `pregunta_id_pregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Estructura de tabla para la tabla `tipo_pregunta`
--
CREATE TABLE `tipo_pregunta` (
  `id_tipo_pregunta` int(11) NOT NULL COMMENT 'identificador único del tipo de pregunta',
  `nombre` varchar(45) DEFAULT NULL COMMENT 'nombre del tipo de pregunta',
  `descripcion` varchar(100) DEFAULT NULL COMMENT 'descripción del tipo de pregunta'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Estructura de tabla para la tabla `usuario`
--
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL COMMENT 'identificador único del usuario',
  `usuario` varchar(50) NOT NULL DEFAULT 'nombre del usuario' COMMENT 'nombre del usuario',
  `encuestado` tinyint(1) NOT NULL COMMENT 'Estado de encuesta del usuario',
  `ciclo_id_ciclo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciclo`
--
ALTER TABLE `ciclo`
  ADD PRIMARY KEY (`id_ciclo`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id_pregunta`),
  ADD KEY `fk_pregunta_tipo_pregunta_idx` (`tipo_pregunta_id_tipo_pregunta`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id_respuesta`),
  ADD KEY `fk_respuesta_pregunta1_idx` (`pregunta_id_pregunta`);

--
-- Indices de la tabla `respuestas_obtenidas`
--
ALTER TABLE `respuestas_obtenidas`
  ADD PRIMARY KEY (`id_respuestas_obtenidas`),
  ADD KEY `fk_respuestas_obtenidas_usuario1_idx` (`usuario_id_usuario`),
  ADD KEY `fk_respuestas_obtenidas_respuesta1_idx` (`respuesta_id_respuesta`),
  ADD KEY `fk_respuestas_obtenidas_pregunta1_idx` (`pregunta_id_pregunta`);

--
-- Indices de la tabla `tipo_pregunta`
--
ALTER TABLE `tipo_pregunta`
  ADD PRIMARY KEY (`id_tipo_pregunta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usuario_ciclo1_idx` (`ciclo_id_ciclo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciclo`
--
ALTER TABLE `ciclo`
  MODIFY `id_ciclo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id_pregunta` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador único de la pregunta';
--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id_respuesta` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificación unica de la respuesta';
--
-- AUTO_INCREMENT de la tabla `respuestas_obtenidas`
--
ALTER TABLE `respuestas_obtenidas`
  MODIFY `id_respuestas_obtenidas` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador único de la respuesta obtenida';
--
-- AUTO_INCREMENT de la tabla `tipo_pregunta`
--
ALTER TABLE `tipo_pregunta`
  MODIFY `id_tipo_pregunta` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador único del tipo de pregunta';
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador único del usuario';
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `fk_pregunta_tipo_pregunta` FOREIGN KEY (`tipo_pregunta_id_tipo_pregunta`) REFERENCES `tipo_pregunta` (`id_tipo_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `fk_respuesta_pregunta1` FOREIGN KEY (`pregunta_id_pregunta`) REFERENCES `pregunta` (`id_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `respuestas_obtenidas`
--
ALTER TABLE `respuestas_obtenidas`
  ADD CONSTRAINT `fk_respuestas_obtenidas_pregunta1` FOREIGN KEY (`pregunta_id_pregunta`) REFERENCES `pregunta` (`id_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_respuestas_obtenidas_respuesta1` FOREIGN KEY (`respuesta_id_respuesta`) REFERENCES `respuesta` (`id_respuesta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_respuestas_obtenidas_usuario1` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_ciclo1` FOREIGN KEY (`ciclo_id_ciclo`) REFERENCES `ciclo` (`id_ciclo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
