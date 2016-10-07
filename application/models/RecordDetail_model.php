<?php
class RecordDetail_Model extends CI_Model {


    public function __construct()
    {
        $this->load->database();
    }


    public function save($record_id,$user_id, $group_id, $result)
    {

        $result_arr = json_decode($result, true);

        $result_final = array();
        foreach($result_arr as $key => $value) {
            $result_final[$key."d"] = $value;
        }

        $record = array(
            'record_id' => $record_id,
            'user_id' => $user_id,
            'group_id' => $group_id,
            'result' => json_encode($result_final)
        );
        $this->db->insert('record_detail', $record);
        $id = $this->db->insert_id();
        return $id;
    }

    public function getDetail($record_id, $group_id)
    {
        return $this->db
            ->where('record_id', $record_id)
            ->where('group_id', $group_id)
            ->get('record_detail')->result_array();
    }
}
