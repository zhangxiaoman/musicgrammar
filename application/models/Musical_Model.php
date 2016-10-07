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

    public function begin_brk()
    {
        $where = "id = 5";
        return $this->db->update('musical',array('status' => 1), $where);
    }

}
