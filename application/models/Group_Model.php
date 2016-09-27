<?php
class Group_Model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function get_groups()
    {
        $this->db->limit(3);
        $this->db->order_by("id", "desc");
        $query = $this->db->get('group');
        return $query->result_array();
    }

    public function create()
    {
        $group = array(
            'name' => $this->input->post('name'),
            'create_at' => time()
        );
        $this->db->insert('group', $group);
        $id = $this->db->insert_id();
        return $id;
    }

}
