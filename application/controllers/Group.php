<?php
class Group extends MY_Controller {


    public static $levelMap = array(
        '1' => '关卡一',
        '2' => '关卡二',
        '3' => '关卡三',
        '4' => '关卡四',
        '5' => '关卡五',
    );
    public function __construct()
    {
        parent::__construct();
        $this->load->model('group_model');
        $this->load->model('user_model');
        $this->load->model('record_model');
        $this->load->model('musical_model');
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
        $user_id = 0;
        if (empty($group_id)) {
            $group_id = $_SESSION['group_id'];
            $user_id = $_SESSION['user_id'];
        }

        $group_info = $this->group_model->get_group($group_id);
        $group_info['create_at'] = date('Y-m-d H:i:s', $group_info['create_at']);
        $users = $this->user_model->group_users($group_id);

        $curr_user = array();
        if (!empty($user_id)) {
            $curr_user = $this->user_model->get($user_id);
        }

        $show_user = array();
        foreach ($users as $key => &$user) {
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
            $user['level'] = self::$levelMap[$user['musical_id']];
            if (!empty($curr_user) && $curr_user['musical_id'] != $user['musical_id']) {
                continue;
            }
            $show_user[] = $user;
        }
        $data['users'] = $show_user;
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

        $record_id = $this->record_model->save();

        $_SESSION['record_id'] = $record_id;

        if($result) {
            foreach ($users as &$item) {
                $item['create_at'] = date("Y-m-d H:i:s", $item['create_at']);
                $item['status'] = User_Model::STATUS_BEGIN;
            }
            $this->success($users);
        }
        $this->error();
    }

    /**
     * 清空 user
     */
    public function clear()
    {
        $group_id = $this->input->post("group_id");
        if (empty($group_id)) {
            $this->error("参数错误");
        }

        $result = $this->user_model->delete_by_group_id($group_id);

        if ($result) {
            $this->success();
        }
        $this->error();
    }

    public function lists()
    {
        $result = $this->group_model->group_list();

        foreach($result as &$item) {
            $users = $this->user_model->group_users($item['id']);
            foreach ($users as $key => &$user) {
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
                $user['level'] = self::$levelMap[$user['musical_id']];
            }
            $item['users'] = $users;

        }

        $data['groups'] = $result;

        $this->load->view('group/index',$data);
    }

    public function begin_brk()
    {
        $this->musical_model->begin_brk();
    }


}
