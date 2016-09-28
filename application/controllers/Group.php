<?php
class Group extends MY_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('group_model');
        $this->load->model('user_model');
        $this->load->helper('url_helper');
    }

    public function index()
    {
        $data['group'] = $this->group_model->get_groups();
        $data['title'] = '分组';
        $this->load->view('group/index', $data);
    }

    public function create()
    {
        $name = $this->input->post("name");

        if (empty($name)) {
            $this->error("name is empty");
        }
        $data = $this->group_model->create($name);
        $data['create_at'] = date('Y-m-d H:i:s', $data['create_at']);
        $this->success($data);
    }

    public function view()
    {
        $group_id = $this->input->post('group_id');
        $group_info = $this->group_model->get_group($group_id);
        $group_info['create_at'] = date('Y-m-d H:i:s', $group_info['create_at']);
        $users = $this->user_model->group_users($group_id);

        foreach ($users as &$user) {
            $user['create_at'] = date('Y-m-d H:i:s', $user['create_at']);

            switch ($user['status']) {
                case User_Model::STATUS_INIT:
                    $user['status_name'] = "刚进来";
                    break;
                case User_Model::STATUS_READY:
                    $user['status_name'] = "已准备";
                    break;
                case User_Model::STATUS_BEGIN:
                    $user['status_name'] = "已开始";
                    break;
                case User_Model::STATUS_END:
                    $user['status_name'] = "已结束";
                    break;
            }
        }
        $data['users'] = $users;
        $data['group'] = $group_info;
        $this->success($data);

    }

    /**
     * 开始
     */
    public function begin()
    {
        $group_id = $this->input->post("group_id");
        $users = $this->user_model->group_ready_user($group_id);
        $user_ids = array();
        foreach ($users as $item) {
            $user_ids[] = $item['id'];
        }
        $result = $this->user_model->update_status(User_Model::STATUS_BEGIN, $user_ids);


        if($result) {
            foreach ($users as &$item) {
                $item['create_at'] = date("Y-m-d H:i:s", $item['create_at']);
                $item['status'] = User_Model::STATUS_BEGIN;
            }
            $this->success($users);
        }
        $this->error();
    }

}
