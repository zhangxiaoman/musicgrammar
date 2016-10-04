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


    public function group_list()
    {
        $this->db->order_by("id", "asc");
        $query = $this->db->get('group');
        $groups =  $query->result_array();

        $sql = "select group_id as id, count(1) as num from user group by group_id";
        $group_users_count = $this->db->query($sql)->result_array();

        $tempArr = array();
        foreach($group_users_count as $item) {
            $tempArr[$item['id']] = $item;
        }

        foreach($groups as $key => &$group) {

            if (!isset($tempArr[$group['id']])) {
                $group['user_count'] = 0;
                continue;
            }
            $group['user_count'] = $tempArr[$group['id']]['num'];

        }

        return $groups;
    }

}
