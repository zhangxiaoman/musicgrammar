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
        $this->load->helper('form');
        $this->load->library('form_validation');

        $is_ajax = $this->input->post('ajax');
        $data['title'] = 'Create a news group';

        $this->form_validation->set_rules('name', 'Name', 'required');

        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('group/create',$data);
        }
        else
        {
            $data['id'] = $this->group_model->create();
            if ($is_ajax) {
                die(json_encode(array('code' => 0, 'data' => array('id' => $data['id']))));
            }

            $this->load->view('group/success', $data);
        }
    }

    public function view()
    {
        $title = $this->input->get("group_name");
        $result = $this->user_model->group_users();
        $data['users'] = $result;
        $data['title'] = $title;
        $this->load->view('group/view', $data);

    }

    public function begin()
    {

    }
}
