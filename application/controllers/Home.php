<?php
class Home extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('group_model');
        $this->load->model('user_model');
        $this->load->helper('url');
    }

    public function index()
    {
        $groups = $this->group_model->group_list();
        $data['groups'] = $groups;
        $this->load->view('home/index', $data);
    }

    public function select()
    {
        $user_id = $_REQUEST['user_id'];

        if (empty($user_id)) {
            redirect("/");
        }
        $user_info = $this->user_model->get($user_id);
        $data['user_name'] = $user_info['name'];
        $data['group_id'] = $user_info['group_id'];
        $data['status'] = $user_info['status'];

        $group_info = $this->group_model->get_group($user_info['group_id']);
        $data['group_alias'] = $group_info['alias'];
        $data['group_name'] = $group_info['name'];
        $this->load->view('home/select', $data);
    }

    public function exec()
    {
        $this->load->view('home/exec');
    }


}
