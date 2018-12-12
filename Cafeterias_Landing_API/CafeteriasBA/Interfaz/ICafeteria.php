<?php
namespace CafeteriasBA\Interfaz;


interface ICafeteria
{
		public function getNombre();
		public function setNombre($nombre);
		public function getId();
		public function setId($id);
		public function getDireccion();
		public function setDireccion($direccion);
		public function getSucursal();
		public function setSucursal($sucursal);
		public function getEmail();
		public function setEmail($email);
		public function getTelefono();
		public function setTelefono($telefono);
		public function getSitioWeb();
		public function setSitioWeb($sitioWeb);
		public function getHorarioApertura();
		public function setHorarioApertura($horarioApertura);
		public function getHorarioCierre();
		public function setHorarioCierre($horarioCierre);
		public function getValoracion();
		public function setValoracion($valoracion);
		public function getVotos();
		public function setVotos($votos);
		public function getStatus();
		public function setStatus($status);
		public static function getAll();
		public static function eliminarCafeteria($id);
		public static function verCafeteria($id);
		public static function editarCafeteria($data);
		public static function crearCafeteria($data);
		public function findByPk($id);
}