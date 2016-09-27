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
        $this->load->helper('form');
        $this->load->library('form_validation');

        $is_ajax = $this->input->post('ajax');
        $data['title'] = 'Create a news user';

        $this->form_validation->set_rules('name', 'Name', 'required');
        $this->form_validation->set_rules('group_id', 'Group', 'required');

        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('user/create',$data);
        }
        else
        {
            $data['id'] = $this->user_model->create();
            if ($is_ajax) {
                die(json_encode(array('code' => 0, 'data' => array())));
            }
            $this->load->view('user/success', $data);
        }
    }

    public function ready()
    {
        $result = $this->user_model->update_status();
        if($result) {
            die(json_encode(array('code' => 0, 'data' => array())));
        }
        die(json_encode(array('code' => 1, 'message' => '网络异常,请稍后再试', 'data' => array())));
    }

}
