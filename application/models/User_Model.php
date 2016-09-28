<?php
class User_Model extends CI_Model {


    const STATUS_INIT = 0;
    const STATUS_READY = 1;
    const STATUS_BEGIN = 2;
    const STATUS_END = 3;

    public function __construct()
    {
        $this->load->database();
    }

    public function create($name, $group_id)
    {
        $user = array(
            'name' => $name,
            'group_id' => $group_id,
            'create_at' => time()
        );
        $this->db->insert('user', $user);
        $id = $this->db->insert_id();
        return $id;
    }

    /**
     * 更新状态, 支持批量
     *
     * @param int   $status
     * @param array $ids
     *
     * @return bool
     */
    public function update_status($status = 0, $ids = array())
    {
        if (empty($ids)) {
            return false;
        }
        $idStr = implode(',', $ids);
        $where = "id in ({$idStr})";

        return $this->db->update('user',array('status' => $status), $where);
    }

    public function group_users($groupId)
    {
        $this->db->where('group_id', $groupId)->where("is_deleted", 0);
        $this->db->limit(10);
        $this->db->order_by("create_at", "desc");
        $query = $this->db->get('user');
        return $query->result_array();
    }

    public function group_ready_user($groupId)
    {
        $this->db->where('group_id', $groupId)->where("is_deleted", 0);
        $this->db->where('status', self::STATUS_READY);
        $this->db->limit(10);
        $this->db->order_by("create_at", "desc");
        $query = $this->db->get('user');
        return $query->result_array();
    }

    public function get($id)
    {
        return $this->db->where('id' , $id)->where("is_deleted", 0)->get('user')->row_array();
    }

    public function delete_by_group_id($group_id)
    {
        return $this->db->set("is_deleted", 1)->where('group_id', $group_id)->update("user");
    }

}
