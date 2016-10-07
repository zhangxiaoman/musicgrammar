<?php
class User_Model extends CI_Model {

    public static $avatar_arr = array('avatar_1', "avatar_2","avatar_3","avatar_4", "avatar_5");

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
        $avatar_index = rand(0,4);
        $avatar = self::$avatar_arr[$avatar_index];
        $user = array(
            'name' => $name,
            'group_id' => $group_id,
            'avatar' => $avatar,
            'create_at' => time()
        );
        $this->db->insert('user', $user);
        $id = $this->db->insert_id();
        $user['id'] = $id;
        return $user;
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

    public function group_users($groupId, $level = 0,$status = 0 )
    {

        if (empty($level) || empty($status)) {
            $this->db->where('group_id', $groupId)->where("is_deleted", 0);
        } else {
            $this->db->where('group_id', $groupId)->where("is_deleted", 0)->where('musical_id', $level)->where('status', self::STATUS_READY);
        }

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

    public function get_count_by_group($group_id)
    {
        $sql = "select count(1) as num from user where group_id = {$group_id} and is_deleted = 0";
        $result = $this->db->query($sql)->row_array();

        return $result['num'];
    }


    public function update_musical($user_id, $musical_id)
    {
        $where = "id = {$user_id}";
        return $this->db->update('user',array('musical_id' => $musical_id), $where);
    }

    public function update_record($user_ids, $record_id)
    {
        $user_id_str  =  implode(',', $user_ids);
        $where = "id in ({$user_id_str})";
        return $this->db->update('user',array('record_id' => $record_id), $where);
    }

    public function musical_ready_user($musical_id)
    {
        $this->db->where('musical_id', $musical_id)->where("is_deleted", 0);
        $this->db->where('status', self::STATUS_READY);
        $this->db->limit(10);
        $this->db->order_by("create_at", "desc");
        $query = $this->db->get('user');
        return $query->result_array();
    }
}
