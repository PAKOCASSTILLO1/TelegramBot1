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
(1, '¿A que semestre perteneces?', 1, 1),
(2, '¿Cómo es la atención al alumno de parte de los docentes?', 1, 1),
(3, '¿Tiene recursos tecnológicos su sede universitaria? (Wiffi, hardware, software, equipo audiovisual, etc.)', 1, 2),
(4, '¿Ofrece la universidad otro tipo de actividad que pueda realizar durante su carrera (Talleres, competencias)?', 1, 2),
(5, '¿Cuenta la universidad con los servicios básicos para el estudiante (baños, agua, seguridad, higiene)?', 1, 2),
(6, '¿Consideras que estas aprendiendo más de lo esperado?', 1, 1),
(7, 'En la escala de 1 a 10 califique el acceso al parqueo, siendo 1 la escala más baja y 10 la más alta.', 1, 2),
(8, '¿Su salón de clases cuenta con ventilación e iluminación adecuada para recibir su catedra?', 1, 2),
(9, '¿Está satisfecho con la forma que los docentes imparten sus clases?', 1, 1),
(10, 'Califique el servicio que presta la cafetería en el centro universitario boca del monte.', 1, 1),
(11, 'Como consideraría tener una oficina administrativa en Ingeniería y Sistemas de Información en la sede Boca del Monte plan sábado, para hacer cualquier trámite que necesite.', 1, 2);
--
-- Volcado de datos para la tabla `respuesta`
--
INSERT INTO `respuesta` (`id_respuesta`, `respuesta`, `estado`, `pregunta_id_pregunta`) VALUES
(41, '1', 1, 1),
(42, '2', 1, 1),
(43, '3', 1, 1),
(44, '4', 1, 1),
(45, '5', 1, 1),
(46, '6', 1, 1),
(47, '7', 1, 1),
(48, '8', 1, 1),
(49, '9', 1, 1),
(50, '10', 1, 1),

(1, 'Excelente', 1, 2),
(2, 'Bueno', 1, 2),
(3, 'Regular', 1, 2),
(4, 'Malo', 1, 2),

(5, 'Si', 1, 3),
(6, 'No', 1, 3),
(7, 'No se', 1, 3),

(8, 'Si', 1, 4),
(9, 'No', 1, 4),
(10, 'No se', 1, 4),

(11, '100', 1, 5),
(12, '75', 1, 5),
(13, '50', 1, 5),
(14, '25', 1, 5),

(15, 'Excelentemente', 1, 6),
(16, 'Lo que puedo', 1, 6),
(17, 'Menos de lo que pensaba', 1, 6),
(18, 'Mucho menos de lo que pensaba', 1, 6),

(19, '1', 1, 7),
(20, '2', 1, 7),
(21, '3', 1, 7),
(22, '4', 1, 7),
(23, '5', 1, 7),
(24, '6', 1, 7),
(25, '7', 1, 7),
(26, '8', 1, 7),
(27, '9', 1, 7),
(28, '10', 1, 7),

(29, '100', 1, 8),
(30, '75', 1, 8),
(31, '50', 1, 8),
(32, '25', 1, 8),

(33, 'SI', 1, 9),
(34, 'NO', 1, 9),
(35, 'Otros', 1, 9),

(36, 'Excelente', 1, 10),
(37, 'Bueno', 1, 10),
(38, 'Regular', 1, 10),
(39, 'Malo', 1, 10),
(40, 'Otros', 1, 10),

(51, 'Excelente', 1, 11),
(52, 'Bueno', 1, 11),
(53, 'Regular', 1, 11),
(54, 'Malo', 1, 11);
--
-- Volcado de datos para la tabla `tipo_pregunta`
--
INSERT INTO `tipo_pregunta` (`id_tipo_pregunta`, `nombre`, `descripcion`) VALUES
(1, 'DOCENCIA', 'Preguntas relacionadas a la docencia'),
(2, 'SEDE', 'Preguntas relacionadas a la sede');