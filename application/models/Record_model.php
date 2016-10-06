<?php
class Record_Model extends CI_Model {


    public function __construct()
    {
        $this->load->database();
    }


    public function save()
    {

        $record = array(
            'score' => 0,
        );
        $this->db->insert('record', $record);
        $id = $this->db->insert_id();
        return $id;
    }
}
