<?php
class User extends MY_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->helper('url_helper');
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
        $data['id'] = $this->user_model->create($name, $group_id);
        $this->success($data);
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
        $id = $this->input->post("id");
        $result = $this->user_model->update_status(User_Model::STATUS_END, array($id));
        if($result) {
            $this->success();
        }
        $this->error();
    }

    public function view()
    {
        $id = $this->input->post("id");
        $user = $this->user_model->get($id);
        if (empty($user)) {
            $this->error();
        }
        $user['create_at'] = date("Y-m-d H:i:s", $user['create_at']);
        $this->success($user);
    }

}
