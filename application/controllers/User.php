<?php
class User extends MY_Controller {


    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('group_model');
        $this->load->model('musical_model');
        $this->load->model('record_model');
        $this->load->model('recordDetail_model');
        $this->load->helper('url_helper');
        $this->load->library('session');
    }

    public function index()
    {
        $data['user'] = $this->user_model->get_user();

        $data['title'] = '用户';
        $this->load->view('user/index', $data);
    }

    public function create()
    {
        $name = $this->input->post('username');
        $group_id = $this->input->post('group_id');

        if (empty($name) || empty($group_id))
        {
            $this->error(1, "参数错误");
        }

        $user_count = $this->user_model->get_count_by_group($group_id);
        if ($user_count >= 5) {
            $this->error(1,"当前组下已经有5个小伙伴啦...");
        }
        $user = $this->user_model->create($name, $group_id);

        $group_info = $this->group_model->get_group($group_id);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $name;
        $_SESSION['group_name'] = $group_info['name'];
        $_SESSION['group_alias'] = $group_info['alias'];
        $_SESSION['group_id'] = $group_info['id'];
        $_SESSION['avatar'] = $user['avatar'];
        $this->success($user);
    }

    /**
     * Ready.
     */
    public function ready()
    {
        $id = $this->input->post("id");
        $result = $this->user_model->update_status(User_Model::STATUS_READY, array($id));
        if($result) {
           $this->success();
        }
        $this->error();
    }

    /**
     * End
     */
    public function end()
    {

        $user_id = $_SESSION['user_id'];
        $group_id = $_SESSION['group_id'];

        $user_info = $this->user_model->get($user_id);

        $record_id = $user_info['record_id'];

        $_SESSION['record_id'] = $record_id;

        $musical_result = $this->input->post('result');

        $result = $this->user_model->update_status(User_Model::STATUS_END, array($user_id));
        if($result) {
            $this->recordDetail_model->save($record_id, $user_id, $group_id, $musical_result);
            $this->success();
        }
        $this->error();
    }

    public function view()
    {
        $user_id = $_SESSION['user_id'];
        $user = $this->user_model->get($user_id);
        if (empty($user)) {
            $this->error();
        }
        $user['create_at'] = date("Y-m-d H:i:s", $user['create_at']);
        $this->success(array('user' => $user));
    }

    public function cal_score()
    {
        $record_id = $_SESSION['record_id'];
        $group_id = $_SESSION['group_id'];
        $musical_id = $_SESSION['musical_id'];
        $musical_info = $this->musical_model->get($musical_id);
        $musical_content = json_decode($musical_info['content'], true);

        $detail = $this->recordDetail_model->getDetail($record_id, $group_id);


        // 组员不够5人
        if (count($detail) < 5) {
            $this->success(array('is_success' => 0));
        }

        foreach($detail as $item) {
            // 有学生没有敲击
            if (empty($item['result'])) {
                $this->success(array('is_success' => 0, "result" => $detail));
            }
        }

        $this->success(array('is_success' => 1, "result" => array($record_id, $group_id, $detail)));

    }

}
