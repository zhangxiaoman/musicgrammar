<?php
class User_Model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function create()
    {
        $user = array(
            'name' => $this->input->post('name'),
            'group_id' => $this->input->post('group_id'),
            'create_at' => time()
        );
        $this->db->insert('user', $user);
        $id = $this->db->insert_id();
        return $id;
    }

    public function update_status()
    {
        return $this->db->update('user',array('status' => 1), array('id' => $this->input->get('id')));
    }

    public function group_users()
    {
        $this->db->where('group_id', $this->input->get("group_id"));
        $this->db->limit(10);
        $this->db->order_by("create_at", "desc");
        $query = $this->db->get('user');
        return $query->result_array();
    }

}
