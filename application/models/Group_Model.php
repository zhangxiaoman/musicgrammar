<?php
class Group_Model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function get_group($id)
    {
        return $this->db->where('id', $id)->get("group")->row_array();
    }

    public function get_groups()
    {
        $this->db->limit(3);
        $this->db->order_by("id", "desc");
        $query = $this->db->get('group');
        return $query->result_array();
    }

    public function create($name)
    {
        $group = array(
            'name' => $name,
            'create_at' => time()
        );
        $this->db->insert('group', $group);
        $id = $this->db->insert_id();

        $this->db->where("id", $id);
        $result = $this->db->get("group")->row_array();
        return $result;
    }

}
