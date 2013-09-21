-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 21-09-2013 a las 02:24:33
-- Versión del servidor: 5.5.32-0ubuntu0.13.04.1
-- Versión de PHP: 5.4.9-4ubuntu2.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `jmena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria`
--

DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE IF NOT EXISTS `Categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Marca`
--

DROP TABLE IF EXISTS `Marca`;
CREATE TABLE IF NOT EXISTS `Marca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Producto`
--

DROP TABLE IF EXISTS `Producto`;
CREATE TABLE IF NOT EXISTS `Producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_categoria` int(11) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `Codigo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Stock` int(11) NOT NULL,
  `Valor` int(11) NOT NULL,
  `Alarma` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_5ECD6443CE25AE0A` (`id_categoria`),
  KEY `IDX_5ECD6443E98F4023` (`id_marca`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Vendedor`
--

DROP TABLE IF EXISTS `Vendedor`;
CREATE TABLE IF NOT EXISTS `Vendedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `apellidoPa` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `apellidoMa` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rut` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fono` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Producto`
--
ALTER TABLE `Producto`
  ADD CONSTRAINT `FK_5ECD6443CE25AE0A` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria` (`id`),
  ADD CONSTRAINT `FK_5ECD6443E98F4023` FOREIGN KEY (`id_marca`) REFERENCES `Marca` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
