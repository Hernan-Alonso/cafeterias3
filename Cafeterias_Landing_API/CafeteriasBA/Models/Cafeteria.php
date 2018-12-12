<?php

namespace CafeteriasBA\Models;

use CafeteriasBA\Interfaz\ICafeteria;
use CafeteriasBA\DB\Conexion;
use JsonSerializable;
use PDO;
use Exception;

class Cafeteria implements JsonSerializable, ICafeteria {

    private $id;
    protected $nombre;
    protected $direccion;
    protected $telefono;
    protected $email;
    protected $sitio_web;
    protected $sucursal;
    protected $horario_apertura;
    protected $horario_cierre;
    protected $valoracion;
    protected $votos;
    protected $status;
    protected $descripcion;

    /**
     * Cafeteria constructor.
     * @param $id
     */
    public function __construct($id = null) {
        if (!is_null($id)) {
            $this->findByPk($id);
        }
    }

    function jsonSerialize() {
        // TODO: Implement jsonSerialize() method.
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'direccion' => $this->direccion,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'sitio_web' => $this->sitio_web,
            'sucursal' => $this->sucursal,
            'horario_apertura' => $this->horario_apertura,
            'horario_cierre' => $this->horario_cierre,
            'valoracion' => $this->valoracion,
            'votos' => $this->votos,
            'status' => $this->status,
            'descripcion' => $this->descripcion,
        ];
    }

    /**
     * @param $id
     */
    public function findByPk($id) {
        $this->setId($id);
        $query = "SELECT * FROM t_cafeteria
                  WHERE ID_cafeteria = ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute(array($this->getId()));
        $this->loadData($stmt->fetch(PDO::FETCH_ASSOC));
    }

    /**
     * @param $fila
     */
    protected function loadData($fila) {
        /*         * *
         * Set Load Data : Carga los campos de la clase usuario.
         */
        $this->setId($fila['ID_cafeteria']);
        $this->setNombre($fila['nombre']);
        $this->setDireccion($fila['direccion']);
        $this->setEmail($fila['email']);
        $this->setTelefono($fila['telefono']);
        $this->setSitioWeb($fila['sitio_web']);
        $this->setSucursal($fila['sucursal']);
        $this->setHorarioApertura($fila['horario_apertura']);
        $this->setHorarioCierre($fila['horario_cierre']);
        $this->setValoracion($fila['valoracion']);
        $this->setVotos($fila['votos']);
        $this->setStatus($fila['status']);
        $this->setDescripcion($fila['descripcion']);
    }

    /**
     * @return array
     */
    public static function getAll() {
        // TODO: Implement getAll() method.
        $query = "SELECT * FROM t_cafeteria WHERE status = 'activo'";
        $stmt = Conexion::getStatement($query);
        $stmt->execute();
        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cafeteria = new Cafeteria();
            $cafeteria->LoadData($fila);
            $salida[] = $cafeteria;
        }
        return $salida;
    }

    public static function topRank() {
        $query = "SELECT * FROM t_cafeteria WHERE status = 'activo' ORDER BY valoracion DESC LIMIT 3";
        $stmt = Conexion::getStatement($query);
        $stmt->execute();
        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cafeteria = new Cafeteria();
            $cafeteria->LoadData($fila);
            $salida[] = $cafeteria;
        }
        return $salida;
    }

    /**
     * @param $id
     * @return array
     */
    public static function eliminarCafeteria($id) {
        // TODO: Implement eliminarCafeteria() method.
        $query = "UPDATE t_cafeteria SET status = 'inactivo' WHERE ID_cafeteria = ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute([$id]);
        if ($stmt) {
            $salida = [
                'status' => 1,
                'message' => 'Cafeteria eliminada'
            ];
        } else {
            $salida = [
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
    public static function verCafeteria($id) {
        // TODO: Implement verCafeteria() method.
        $query = "SELECT * FROM t_cafeteria WHERE ID_cafeteria = ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute([$id]);

        $salida = [];

        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cafeteria = new Cafeteria();
            $cafeteria->setId($fila['ID_cafeteria']);
            $cafeteria->loadData($fila);
            $salida[] = $cafeteria;
        }
        return $salida;
    }

    public static function getByEmail($email) {
        // TODO: Implement verCafeteria() method.
        $query = "SELECT * FROM t_cafeteria WHERE email = ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute([$email]);
        if ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cafeteria = new Cafeteria();
            $cafeteria->loadData($fila);
            return $cafeteria;
        } else {
            return null;
        }
    }

    /**
     * Buscar en la db de acuerdo a parametros pasados
     * @param array data
     * @return \CafeteriasBA\Models\Cafeteria
     */
    public static function search($data) {

        // TODO: Implement verCafeteria() method.
        $query = "SELECT * FROM t_cafeteria WHERE LOWER(nombre) "
                . "LIKE ? or LOWER(sucursal) LIKE ?";

        $stmt = Conexion::getStatement($query);

        $nombre = strtolower($data['nombre']);

        $sucu = strtolower($data['zona']);

        if(trim($nombre) == ''){
            $nombre = '*';
        }
        
        if(trim($sucu) == ''){
            $sucu = '*';
        }
        
        $params = array('%'.trim($nombre).'%','%'.trim($sucu).'%');

        $stmt->execute($params);

        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $cafeteria = new Cafeteria();

            $cafeteria->LoadData($fila);

            $salida[] = $cafeteria;
        }

        if ($salida) {
            return $salida;
        } else {

            return null;
        }
    }

    /**
     * @param $data
     * @return Cafeteria
     * @throws Exception
     */
    public static function editarCafeteria($data) {
        // TODO: Implement editarCafeteria() method.
        $query = "UPDATE t_cafeteria SET
        nombre=:nombre,
        direccion=:direccion,
        telefono=:telefono,
        email=:email,
        sitio_web=:sitio_web,
        sucursal=:sucursal,
        horario_apertura=:horario_apertura,
        horario_cierre=:horario_cierre
        WHERE ID_cafeteria=:idcafeteria";
        $stmt = Conexion::getStatement($query);
        $exito = $stmt->execute([
            'nombre' => $data['nombre'],
            'direccion' => $data['direccion'],
            'telefono' => $data['telefono'],
            'email' => $data['email'],
            'sitio_web' => $data['sitioWeb'],
            'sucursal' => $data['sucursal'],
            'horario_apertura' => $data['horarioApertura'],
            'horario_cierre' => $data['horarioCierre'],
            'idcafeteria' => $data['idcafeteria'],
        ]);
        if ($exito) {
            $cafeteria = new Cafeteria($data['idcafeteria']);
            //$cafeteria->loadData($data);
            $salida = $cafeteria;
            return $salida;
        } else {
            throw new Exception('No se ha podido editar la cafeteria.');
        }
    }

    /*     * *
     * @param $data
     * @return bool
     * @throws Exception
     */

    public static function crearCafeteria($data) {
        // TODO: Implement crearCafeteria() method.
        $query = "INSERT INTO t_cafeteria (nombre,direccion,telefono,email,sitio_web,sucursal,horario_apertura,horario_cierre,valoracion,votos,status) VALUES (:nombre,
				:direccion,:telefono,:email,
:sitio_web,:sucursal,:horario_apertura,:horario_cierre,:valoracion,:votos,:status)";
        $valoracion = 0;
        $votos = 0;
        $status = 'activo';
        $stmt = Conexion::getStatement($query);
        $exito = $stmt->execute([
            'nombre' => $data['nombre'],
            'direccion' => $data['direccion'],
            'telefono' => $data['telefono'],
            'email' => $data['email'],
            'sitio_web' => $data['sitioWeb'],
            'sucursal' => $data['sucursal'],
            'horario_apertura' => $data['horarioApertura'],
            'horario_cierre' => $data['horarioCierre'],
            'valoracion' => $valoracion,
            'votos' => $votos,
            'status' => $status,
        ]);
        if ($exito) {
            return true;
        } else {
            throw new Exception('no se a podido crear la cafeteria');
        }
    }

    /**
     * @return mixed
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id) {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getNombre() {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getDireccion() {
        return $this->direccion;
    }

    /**
     * @param mixed $direccion
     */
    public function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    /**
     * @return mixed
     */
    public function getTelefono() {
        return $this->telefono;
    }

    /**
     * @param mixed $telefono
     */
    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    /**
     * @return mixed
     */
    public function getEmail() {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email) {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getSitioWeb() {
        return $this->sitio_web;
    }

    /**
     * @param mixed $sitio_web
     */
    public function setSitioWeb($sitio_web) {
        $this->sitio_web = $sitio_web;
    }

    /**
     * @return mixed
     */
    public function getSucursal() {
        return $this->sucursal;
    }

    /**
     * @param mixed $sucursal
     */
    public function setSucursal($sucursal) {
        $this->sucursal = $sucursal;
    }

    /**
     * @return mixed
     */
    public function getHorarioApertura() {
        return $this->horario_apertura;
    }

    /**
     * @param mixed $horario_apertura
     */
    public function setHorarioApertura($horario_apertura) {
        $this->horario_apertura = $horario_apertura;
    }

    /**
     * @return mixed
     */
    public function getHorarioCierre() {
        return $this->horario_cierre;
    }

    /**
     * @param mixed $horario_cierre
     */
    public function setHorarioCierre($horario_cierre) {
        $this->horario_cierre = $horario_cierre;
    }

    /**
     * @return mixed
     */
    public function getValoracion() {
        return $this->valoracion;
    }

    /**
     * @param mixed $valoracion
     */
    public function setValoracion($valoracion) {
        $this->valoracion = $valoracion;
    }

    /**
     * @return mixed
     */
    public function getVotos() {
        return $this->votos;
    }

    /**
     * @param mixed $votos
     */
    public function setVotos($votos) {
        $this->votos = $votos;
    }

    /**
     * @return mixed
     */
    public function getStatus() {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status) {
        $this->status = $status;
    }

    /**
     * @return mixed
     */
    public function getdescripcion() {
        return $this->descripcion;
    }

    /**
     * @param mixed $status
     */
    public function setdescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

}