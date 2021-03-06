<?php

namespace CafeteriasBA\Models;

use CafeteriasBA\DB\Conexion;
use CafeteriasBA\Interfaz\IUsuarios;
use PDO;
use JsonSerializable;
use Exception;

class Usuario implements JsonSerializable, IUsuarios {

    private $id;
    protected $nombre;
    protected $apellido;
    protected $email;
    protected $pass;
    protected $fecha_registro;
    protected $ubicacion_foto;
    protected $fk_rol_usuario;
    protected $fk_privacidad;
    protected $atributos = ['id', 'nombre', 'apellido', 'email', 'pass', 'fecha_registro', 'ubicacion_foto', 'fk_rol_usuario', 'fk_privacidad'];

    /**
     * @param null $id
     */
    public function __construct($id = null) {
        // TODO: Implement __construct() method.
        if (!is_null($id)) {
            $this->findByPk($id);
        }
    }

    public function jsonSerialize() {
        /**
         * Option 1:
         *
         */
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            'email' => $this->email,
            'pass' => $this->pass,
            'fecha_registro' => $this->fecha_registro,
            'ubicacion_foto' => $this->ubicacion_foto,
            'fk_rol_usuario' => $this->fk_rol_usuario,
            'fk_privacidad' => $this->fk_privacidad,
        ];

        /*         * *
         *
         * Option 2:
         *
          $output = [];
          foreach ($this->atributos as $attr) {

          $output[$attr] = $this->$attr;
          } */
    }

    /**
     * @param $id
     */
    public function findByPk($id) {
        $this->setId($id);
        $query = "SELECT * FROM t_usuario WHERE ID_usuario = ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute(array($this->getId()));
        $this->loadData($stmt->fetch(PDO::FETCH_ASSOC));
    }
    
    /**
     * @param $email
     */
    public function findByEmail($email) {
        
        
        $query = "SELECT * FROM t_usuario WHERE email = ?";
        
        $stmt = Conexion::getStatement($query);
        
        $e=$stmt->execute(array($email));
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * @param $fila
     */
    protected function loadData($fila) {
        /*         * *
         * Set Load Data : Carga los campos de la clase usuario.
         */
        $this->setId($fila['ID_usuario']);
        $this->setNombre($fila['nombre']);
        $this->setApellido($fila['apellido']);
        $this->setEmail($fila['email']);
        $this->setPass($fila['pass']);
        $this->setFechaRegistro($fila['fecha_registro']);
        $this->setUbicacionFoto($fila['ubicacion_foto']);
        $this->setFkRolUsuario($fila['fk_rol_usuario']);
        $this->setFkPrivacidad($fila['fk_privacidad']);
    }

    /*     * *
     * @return array
     * conexion a la DB, Consulta Select *
     */

    public static function getAll() {
        $query = "SELECT * FROM t_usuario WHERE status = 'activo' AND NOT email='halonso@cafeteriasba.com.ar'";
        $stmt = Conexion::getStatement($query);
        $stmt->execute();
        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $usuario = new Usuario();
            $usuario->LoadData($fila);
            $salida[] = $usuario;
        }
        return $salida;
    }

    /**
     * @param $email
     * @return Usuario|null
     */
    public static function getByEmail($email) {

        $query = "SELECT * FROM t_usuario WHERE email= ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute([$email]);
        if ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $usuario = new Usuario();
            $usuario->loadData($fila);
            return $usuario;
        } else {
            return null;
        }
    }

    /*
      public static function crearUsuario($data)
      {
      $query = "INSERT INTO t_usuario (nombre,email,pass) VALUES (:nombre,:email,:passwd)";
      $stmt = Conexion::getStatement($query);
      $stmt->execute([]);
      } */

    /**
     * @param $data
     * @return bool
     * @throws Exception
     */
    public static function crearUsuario($data){
        
        $query = "INSERT INTO t_usuario (nombre,apellido,email,pass,fk_rol_usuario,fecha_registro,status,fk_privacidad) VALUES (:nombre,:apellido,:email,
		 :pass,:fk_rol_usuario,:fecha_registro,:status,:fk_privacidad)";

        $fkpriv = 1;

        $status = 'activo';

        $fechaR =  date("y-m-d");
        //$fechaR = '2018-10-10';

        $pass = Hash::encrypt($data['pass']);

        $stmt = Conexion::getStatement($query);

        $exito = $stmt->execute([
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'email' => $data['email'],
            'pass' => $pass,
            'fk_rol_usuario' => $data['fk_rol_usuario'],
            'fecha_registro' => $fechaR,
            'status' => $status,
            'fk_privacidad' => $fkpriv,
        ]);
        
        if ($exito) {
            
            return true;
            
        } else {
            
            throw new Exception('no se a podido crear el usuario');
            
        }
    }
    
    /*
    public static function registrarUsuario($data)
    {
    $query = "INSERT INTO t_usuario (nombre,email,pass) VALUES (:nombre,:email,:passwd)";
    $stmt = Conexion::getStatement($query);
    $stmt->execute([]);
    } */

    /**
     * @param $data
     * @return bool
     * @throws Exception
     */
    public static function registrarUsuario($data){
        
        $query = "INSERT INTO t_usuario (nombre,email,pass,fk_rol_usuario,fecha_registro,status,fk_privacidad) VALUES (:nombre,:email,
		 :pass,:fk_rol_usuario,:fecha_registro,:status,:fk_privacidad)";

        $fkpriv = 1;

        $status = 'activo';

        $fechaR =  date("y-m-d");
        //$fechaR = '2018-10-10';
        
        //despues seteamos el que va @fixme
        $rol_usuario = 2;

        $pass = Hash::encrypt($data['password']);

        $stmt = Conexion::getStatement($query);

        $exito = $stmt->execute([
            'nombre' => $data['nombre'],
            'email' => $data['email'],
            'pass' => $pass,
            'fk_rol_usuario' => $rol_usuario,
            'fecha_registro' => $fechaR,
            'status' => $status,
            'fk_privacidad' => $fkpriv,
        ]);
        
        if ($exito) {
            
            return true;
            
        } else {
            
            throw new Exception('No se a podido crear el usuario');
            
        }
    }

    /***
     * @param $id
     * @return array
     */

    public static function eliminarUsuario($id) {
        // TODO: Implement deleteUsuario() method.
        $query = "UPDATE t_usuario SET status = 'inactivo' WHERE ID_usuario = ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute([$id]);
        if ($stmt) {
            $salida = [
                'status' => 1,
                'message' => 'Usuario eliminado'
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
    public static function verUsuario($id) {
        // TODO: Implement verUsuario() method.
        $query = "SELECT * FROM t_usuario WHERE ID_usuario = ?";
        $stmt = Conexion::getStatement($query);
        $stmt->execute([$id]);
        $salida = [];
        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $usuario = new Usuario();
            $usuario->setId($fila['ID_usuario']);
            $usuario->loadData($fila);
            $salida[] = $usuario;
        }
        return $salida;
    }

    /**
     * @param $data
     * @return array
     */
    public static function editarUsuario($data) {
        // TODO: Implement editarUsuario() method.
        $query = "UPDATE t_usuario SET nombre = :nombre, apellido = :apellido,fk_rol_usuario = :fk_rol_usuario WHERE ID_usuario = :idusuario";
        $stmt = Conexion::getStatement($query);
        $stmt->execute([
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'fk_rol_usuario' => $data['fk_rol_usuario'],
            'idusuario' => $data['idusuario'],
        ]);
        if ($stmt) {
            $salida = [
                'status' => 1,
                'message' => 'Usuario actualizado'
            ];
        } else {
            $salida = [
                'status' => 0,
                'message' => 'Hubo un error en la actualizacion'
            ];
        }
        return $salida;
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
    public function getApellido() {
        return $this->apellido;
    }

    /**
     * @param mixed $apellido
     */
    public function setApellido($apellido) {
        $this->apellido = $apellido;
    }

    /**
     * @return mixed
     */
    public function getPass() {
        return $this->pass;
    }

    /**
     * @param mixed $pass
     */
    public function setPass($pass) {
        $this->pass = $pass;
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
    public function getFechaRegistro() {
        return $this->fecha_registro;
    }

    /**
     * @param mixed $fecha_registro
     */
    public function setFechaRegistro($fecha_registro) {
        $this->fecha_registro = $fecha_registro;
    }

    /**
     * @return mixed
     */
    public function getUbicacionFoto() {
        return $this->ubicacion_foto;
    }

    /**
     * @param mixed $ubicacion_foto
     */
    public function setUbicacionFoto($ubicacion_foto) {
        $this->ubicacion_foto = $ubicacion_foto;
    }

    /**
     * @return mixed
     */
    public function getFkRolUsuario() {
        return $this->fk_rol_usuario;
    }

    /**
     * @param mixed $fk_rolUsuario
     */
    public function setFkRolUsuario($fk_rol_usuario) {
        $this->fk_rol_usuario = $fk_rol_usuario;
    }

    /**
     * @return mixed
     */
    public function getFkPrivacidad() {
        return $this->fk_privacidad;
    }

    /**
     * @param mixed $fk_privacidad
     */
    public function setFkPrivacidad($fk_privacidad) {
        $this->fk_privacidad = $fk_privacidad;
    }

}
