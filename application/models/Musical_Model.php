<?php
class Musical_Model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function get($id)
    {
        return $this->db->where("id", $id)->get('musical')->row_array();
    }

}
