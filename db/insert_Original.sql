--
-- Volcado de datos para la tabla `ciclo`
--
INSERT INTO `ciclo` (`id_ciclo`, `descripcion`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4'),
(5, '5'),
(6, '6'),
(7, '7'),
(8, '8'),
(9, '9'),
(10, '10'),
(11, 'No ingresado');
--
-- Volcado de datos para la tabla `pregunta`
--
INSERT INTO `pregunta` (`id_pregunta`, `pregunta`, `estado`, `tipo_pregunta_id_tipo_pregunta`) VALUES
(1, '¿Cómo es la atención al alumno de parte de los docentes?', 1, 1),
(2, '¿Tiene recursos tecnológicos su sede universitaria? (Wiffi, hardware, software, equipo audiovisual, etc.)', 1, 2),
(3, '¿Ofrece la universidad otro tipo de actividad que pueda realizar durante su carrera (Talleres, competencias)?', 1, 2),
(4, '¿Cuenta la universidad con los servicios básicos para el estudiante (baños, agua, seguridad, higiene)?', 1, 2),
(5, '¿Consideras que estas aprendiendo más de lo esperado?', 1, 1),
(6, 'En la escala de 1 a 10 califique el acceso al parqueo, siendo 1 la escala más baja y 10 la más alta.', 1, 2),
(7, '¿Su salón de clases cuenta con ventilación e iluminación adecuada para recibir su catedra?', 1, 2),
(8, '¿Está satisfecho con la forma que los docentes imparten sus clases?', 1, 1),
(9, 'Califique el servicio que presta la cafetería en el centro universitario boca del monte.', 1, 1),
(10, '¿A que semestre perteneces?', 1, 1),
(11, 'Como consideraría tener una oficina administrativa en Ingeniería y Sistemas de Información en la sede Boca del Monte plan sábado, para hacer cualquier trámite que necesite.', 1, 2);
--
-- Volcado de datos para la tabla `respuesta`
--
INSERT INTO `respuesta` (`id_respuesta`, `respuesta`, `estado`, `pregunta_id_pregunta`) VALUES
(1, 'Excelente', 1, 1),
(2, 'Bueno', 1, 1),
(3, 'Regular', 1, 1),
(4, 'Malo', 1, 1),
(5, 'Si', 1, 2),
(6, 'No', 1, 2),
(7, 'No se', 1, 2),
(8, 'Si', 1, 3),
(9, 'No', 1, 3),
(10, 'No se', 1, 3),
(11, '100', 1, 4),
(12, '75', 1, 4),
(13, '50', 1, 4),
(14, '25', 1, 4),
(15, 'Excelentemente', 1, 5),
(16, 'Lo que puedo', 1, 5),
(17, 'Menos de lo que pensaba', 1, 5),
(18, 'Mucho menos de lo que pensaba', 1, 5),
(19, '1', 1, 6),
(20, '2', 1, 6),
(21, '3', 1, 6),
(22, '4', 1, 6),
(23, '5', 1, 6),
(24, '6', 1, 6),
(25, '7', 1, 6),
(26, '8', 1, 6),
(27, '9', 1, 6),
(28, '10', 1, 6),
(29, '100', 1, 7),
(30, '75', 1, 7),
(31, '50', 1, 7),
(32, '25', 1, 7),
(33, 'SI', 1, 8),
(34, 'NO', 1, 8),
(35, 'Otros', 1, 8),
(36, 'Excelente', 1, 9),
(37, 'Bueno', 1, 9),
(38, 'Regular', 1, 9),
(39, 'Malo', 1, 9),
(40, 'Otros', 1, 9),
(41, '1', 1, 10),
(42, '2', 1, 10),
(43, '3', 1, 10),
(44, '4', 1, 10),
(45, '5', 1, 10),
(46, '6', 1, 10),
(47, '7', 1, 10),
(48, '8', 1, 10),
(49, '9', 1, 10),
(50, '10', 1, 10),
(51, 'Excelente', 1, 11),
(52, 'Bueno', 1, 11),
(53, 'Regular', 1, 11),
(54, 'Malo', 1, 11);
--
-- Volcado de datos para la tabla `respuestas_obtenidas`
--
INSERT INTO `respuestas_obtenidas` (`id_respuestas_obtenidas`, `fecha`, `usuario_id_usuario`, `respuesta_id_respuesta`, `pregunta_id_pregunta`) VALUES
(1, '2020-02-27 17:10:07', 831710904, 11, 4),
(2, '2020-02-27 17:10:25', 831710904, 30, 7),
(3, '2020-02-27 17:22:47', 831710904, 6, 2),
(4, '2020-02-27 17:22:59', 831710904, 2, 1),
(5, '2020-02-27 17:23:07', 831710904, 10, 3),
(6, '2020-02-27 17:23:38', 831710904, 16, 5),
(7, '2020-02-27 17:23:45', 831710904, 34, 8),
(8, '2020-02-27 17:24:33', 831710904, 23, 6),
(9, '2020-02-27 17:24:42', 831710904, 38, 9),
(10, '2020-02-27 18:28:35', 1075269518, 2, 1),
(11, '2020-02-27 18:28:39', 1075269518, 6, 2),
(12, '2020-02-27 18:28:42', 1075269518, 17, 5),
(13, '2020-02-27 18:28:48', 1075269518, 9, 3),
(14, '2020-02-27 18:28:51', 1075269518, 39, 9),
(15, '2020-02-27 18:28:54', 1075269518, 31, 7),
(16, '2020-02-27 18:28:57', 1075269518, 34, 8),
(17, '2020-02-27 18:29:00', 1075269518, 13, 4),
(18, '2020-02-27 18:29:05', 1075269518, 24, 6),
(19, '2020-02-27 18:52:33', 831710904, 53, 11),
(20, '2020-02-27 18:55:07', 1075269518, 51, 11),
(21, '2020-02-27 20:11:11', 876043741, 6, 2),
(22, '2020-02-27 20:11:26', 876043741, 31, 7),
(23, '2020-02-27 20:11:38', 876043741, 9, 3),
(24, '2020-02-27 20:11:49', 876043741, 17, 5),
(25, '2020-02-27 20:12:21', 876043741, 12, 4),
(26, '2020-02-27 20:12:49', 876043741, 2, 1),
(27, '2020-02-27 20:13:12', 876043741, 35, 8),
(28, '2020-02-27 20:14:20', 876043741, 52, 11),
(29, '2020-02-27 20:14:27', 876043741, 38, 9),
(30, '2020-02-27 20:15:49', 876043741, 26, 6),
(31, '2020-02-29 17:59:13', 12940489, 1, 1),
(32, '2020-02-29 17:59:24', 12940489, 6, 2),
(33, '2020-02-29 17:59:36', 12940489, 9, 3),
(34, '2020-02-29 17:59:42', 12940489, 12, 4),
(35, '2020-02-29 17:59:48', 12940489, 15, 5),
(36, '2020-02-29 17:59:56', 12940489, 28, 6),
(37, '2020-02-29 18:00:09', 12940489, 31, 7),
(38, '2020-02-29 18:00:18', 12940489, 35, 8),
(39, '2020-02-29 18:00:25', 12940489, 38, 9),
(40, '2020-02-29 18:00:41', 12940489, 52, 11);
--
-- Volcado de datos para la tabla `tipo_pregunta`
--
INSERT INTO `tipo_pregunta` (`id_tipo_pregunta`, `nombre`, `descripcion`) VALUES
(1, 'DOCENCIA', 'Preguntas relacionadas a la docencia'),
(2, 'SEDE', 'Preguntas relacionadas a la sede');
--
-- Volcado de datos para la tabla `usuario`
--
INSERT INTO `usuario` (`id_usuario`, `usuario`, `encuestado`, `ciclo_id_ciclo`) VALUES
(12940489, 'Gustavo Cali undefined', 1, 10),
(831710904, 'Francisco Castillo', 1, 9),
(876043741, 'Rubén undefined', 1, 9),
(1075269518, 'Luis Velasquez', 1, 3),
(1075269519, '0', 0, 11),
(1075269520, '0', 0, 11);