<?php

namespace CafeteriasBA\Models;

use JsonSerializable;
use CafeteriasBA\Interfaz\INotas;
use CafeteriasBA\DB\Conexion;
use PDO;


class Nota implements JsonSerializable, INotas
{

		private $id;
		protected $titulo;
		protected $nota;
		protected $creacion_nota;
		protected $fk_cafeteria;
		protected $cafeteria;

		/**
			* @param null $id
			*/
		function __construct($id = null)
		{
				// TODO: Implement __construct() method.
				if(is_null($id))
				{
						$this->findByPk($id);
				}
		}

		/**
			* @param $id
			*/
		public function findByPk($id)
		{
				$this->setId($id);
				$query = "SELECT * FROM t_nota
                  WHERE ID_nota= ?";
				$stmt = Conexion::getStatement($query);
				$stmt->execute(array($this->getId()));
				$this->loadData($stmt->fetch(PDO::FETCH_ASSOC));
		}

		/**
			* @param $fila
			*/
		protected function loadData($fila)
		{
				/***
					* Set Load Data : Carga los campos de la clase Nota.
					*/
				$this->setId($fila['ID_nota']);
				$this->setTitulo($fila['titulo_nota']);
				$this->setNota($fila['nota']);
				$this->setCreacionNota($fila['creacion_nota']);
				$this->setFkCafeteria($fila['fk_cafeteria']);
				$this->setCafeteria($fila['cafeteria']);
		}


		function jsonSerialize()
		{
				// TODO: Implement jsonSerialize() method.
				return
					[
						'id' => $this->id,
						'titulo' => $this->titulo,
						'nota' => $this->nota,
						'creacion_nota' => $this->creacion_nota,
						'fk_cafeteria' => $this->fk_cafeteria,
						'cafeteria' => $this->cafeteria,
					];
		}

		/**
			* @return array
			*/
		public static function getAll()
		{
				// TODO: Implement getAll() method.
				$query =  "SELECT t_nota.ID_nota, t_nota.titulo_nota, t_nota.nota, t_nota.creacion_nota, t_nota.fk_cafeteria, t_cafeteria.nombre as cafeteria FROM t_nota INNER JOIN t_cafeteria ON t_nota.fk_cafeteria = t_cafeteria.ID_cafeteria WHERE t_nota.status = 'activo'";
				$stmt = Conexion::getStatement($query);
				$stmt->execute();
				while($fila = $stmt->fetch(PDO::FETCH_ASSOC))
				{
						$nota = new Nota();
						$nota->LoadData($fila);
						$salida[] = $nota;
				}
				return $salida;

		}

		/**
			* @param $id
			* @return array
			*/
		public static function eliminarNota($id)
		{
				// TODO: Implement eliminarNota() method.
				$query = "DELETE FROM t_nota WHERE ID_nota= ?";
				$stmt = Conexion::getStatement($query);
				$stmt->execute([$id]);
				if($stmt){
						$salida=[
							'status' => 1,
							'message' => 'Nota eliminada'
						];
				} else {
						$salida=[
							'status' => 0,
							'message' => 'Hubo un error en la eliminacion'
						];
				}
				return $salida;
		}

		/**
			* @param $id
			* @return array
			*/
		public static function verNota($id)
		{
				// TODO: Implement verNota() method.
				$query = "SELECT t_nota.ID_nota, t_nota.titulo_nota, t_nota.nota, t_nota.creacion_nota, t_nota.fk_cafeteria, t_cafeteria.nombre as cafeteria FROM t_nota INNER JOIN t_cafeteria ON t_nota.fk_cafeteria = t_cafeteria.ID_cafeteria WHERE ID_nota = ?";
				$stmt = Conexion::getStatement($query);
				$stmt->execute([$id]);
				$salida = [];
				while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
						$nota = new Nota();
						$nota->setId($fila['ID_nota']);
						$nota->loadData($fila);
						$salida[] = $nota;
				}
				return $salida;
		}

		/**
			* @param $id
			* @param $data
			*/
		public static function editarNota($id, $data)
		{
				// TODO: Implement editarNota() method.

		}

		/**
			* @param $data
			*/
		public static function crearNota($data)
		{
				// TODO: Implement crearNota() method.
		}


		/**
			* @return mixed
			*/
		public function getId()
		{
				return $this->id;
		}

		/**
			* @param mixed $id
			*/
		public function setId($id)
		{
				$this->id = $id;
		}

		/**
			* @return mixed
			*/
		public function getTitulo()
		{
				return $this->titulo;
		}

		/**
			* @param mixed $titulo
			*/
		public function setTitulo($titulo)
		{
				$this->titulo = $titulo;
		}

		/**
			* @return mixed
			*/
		public function getNota()
		{
				return $this->nota;
		}

		/**
			* @param mixed $nota
			*/
		public function setNota($nota)
		{
				$this->nota = $nota;
		}

		/**
			* @return mixed
			*/
		public function getCreacionNota()
		{
				return $this->creacion_nota;
		}

		/**
			* @param mixed $creacion_nota
			*/
		public function setCreacionNota($creacion_nota)
		{
				$this->creacion_nota = $creacion_nota;
		}

		/**
			* @return mixed
			*/
		public function getFkCafeteria()
		{
				return $this->fk_cafeteria;
		}

		/**
			* @param mixed $fk_cafeteria
			*/
		public function setFkCafeteria($fk_cafeteria)
		{
				$this->fk_cafeteria = $fk_cafeteria;
		}

		/**
			* @return mixed
			*/
		public function getCafeteria()
		{
				return $this->cafeteria;
		}

		/**
			* @param mixed $cafeteria
			*/
		public function setCafeteria($cafeteria)
		{
				$this->cafeteria = $cafeteria;
		}


		
}