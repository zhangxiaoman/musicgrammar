<?php
class Home extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('group_model');
        $this->load->model('user_model');
        $this->load->model('musical_model');
        $this->load->helper('url');
        $this->load->library('session');
    }

    public function start()
    {
        if (empty($_SESSION['is_checked'])) {
            redirect("/");
        }
        $groups = $this->group_model->group_list();
        $data['groups'] = $groups;
        $this->load->view('home/index', $data);
    }

    public function select()
    {
        if (empty($_SESSION['is_checked'])) {
            redirect("/");
        }
        $user_id = $_SESSION['user_id'];

        if (!$this->user_model->check_user($user_id)) {
            redirect("/home/start");
        }
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

        $_SESSION['group_id'] = $data['group_id'];
        $_SESSION['group_name'] = $data['group_name'];

        $this->load->view('home/select', $data);
    }

    public function exercise()
    {
        if (empty($_SESSION['is_checked'])) {
            redirect("/");
        }
        $user_id = empty($_SESSION['user_id']) ? "" : $_SESSION['user_id'];
        if (!$this->user_model->check_user($user_id)) {
            redirect("/home/start");
        }
        $data['user_name'] = empty($_SESSION['user_name']) ? "" : $_SESSION['user_name'];
        $data['group_name'] = empty($_SESSION['group_name']) ? "" : $_SESSION['group_name'];
        $data['group_alias'] =  empty($_SESSION['group_alias']) ? "" : $_SESSION['group_alias'];

        if (empty($data['user_name']) || empty($data['group_name']) || empty($data['group_alias'])) {
            redirect("/home/start");
        }
        $this->load->view('home/exercise', $data);
    }


    // 准备闯关
    public function ready_break()
    {
        $data['user_name'] = empty($_SESSION['user_name']) ? "" : $_SESSION['user_name'];
        $data['group_name'] = empty($_SESSION['group_name']) ? "" : $_SESSION['group_name'];
        $data['group_alias'] =  empty($_SESSION['group_alias']) ? "" : $_SESSION['group_alias'];
        $data['group_id'] =  empty($_SESSION['group_id']) ? "" : $_SESSION['group_id'];
        $data['user_id'] =  empty($_SESSION['user_id']) ? "" : $_SESSION['user_id'];

        $level = $this->input->post('level');
        if (empty($data['user_name']) || empty($data['group_name']) || empty($data['group_alias'])) {
            $this->error(1, "");
        }

        $_SESSION['musical_id'] = $level;
        $result = $this->user_model->update_musical($data['user_id'], $level);
        $this->user_model->update_status(User_Model::STATUS_READY, array($data['user_id']));

        if (empty($result)) {
            $this->error(2, "网络错误,请稍后再试");
        }
        $users = $this->user_model->group_users($data['group_id'], $level,User_Model::STATUS_READY);
        $this->success(array('users' => $users));
    }


    public  function get_musical()
    {
        $id = $this->input->post("id");

        $musical = $this->musical_model->get($id);

        $musical_content = json_decode($musical['content'], true);

        // 节拍数.
        $temps = count($musical_content);

        // 每一拍时间.
        $temps_time = number_format($musical['length']/$temps,0,"","");

        if ($id != 5) {
            $temps_time = 859;
        }

        foreach($musical_content as $key => &$item) {
            $item_begin = $key * $temps_time;
            foreach($item as $k => &$value) {

                $value['begin_time'] = $item_begin + $value['begin'] / 10  * $temps_time;
            }

        }
        $musical['temps'] = $temps;
        $musical['temps_time'] = $temps_time;
        $musical['content'] = $musical_content;

        $this->success($musical);

    }

    // 创作版
    public function create()
    {
        if (empty($_SESSION['is_checked'])) {
            redirect("/");
        }
        $user_id = empty($_SESSION['user_id']) ? "" : $_SESSION['user_id'];
        if (!$this->user_model->check_user($user_id)) {
            redirect("/home/start");
        }
        $data['user_name'] = empty($_SESSION['user_name']) ? "" : $_SESSION['user_name'];
        $data['group_name'] = empty($_SESSION['group_name']) ? "" : $_SESSION['group_name'];
        $data['group_alias'] =  empty($_SESSION['group_alias']) ? "" : $_SESSION['group_alias'];

        if (empty($data['user_name']) || empty($data['group_name']) || empty($data['group_alias'])) {
            redirect("/home/start");
        }
        $data['user_id'] =  empty($_SESSION['user_id']) ? "" : $_SESSION['user_id'];

        $result = $this->user_model->update_musical($data['user_id'], 5);
        $this->user_model->update_status(User_Model::STATUS_READY, array($data['user_id']));

        $_SESSION['musical_id'] = 5;
        $this->load->view('home/create',$data);
    }

    // 创作版
    public function breakthrough()
    {
        if (empty($_SESSION['is_checked'])) {
            redirect("/");
        }

        $data['user_name'] = empty($_SESSION['user_name']) ? "" : $_SESSION['user_name'];
        $data['group_name'] = empty($_SESSION['group_name']) ? "" : $_SESSION['group_name'];
        $data['group_alias'] =  empty($_SESSION['group_alias']) ? "" : $_SESSION['group_alias'];
        if (empty($data['user_name']) || empty($data['group_name']) || empty($data['group_alias'])) {
            redirect("/home/start");
        }
        $user_id = empty($_SESSION['user_id']) ? "" : $_SESSION['user_id'];
        if (!$this->user_model->check_user($user_id)) {
            redirect("/home/start");
        }
        $this->load->view('home/breakthrough',$data);
    }

    public function check_begin_brk()
    {
        $musical_id = 5;
        $musical = $this->musical_model->get($musical_id);

        if ($musical['status'] == 1 ) {
            $this->success(array('is_begin' => 1));
        }
        $this->success(array('is_begin' => 0));
    }

    public function test()
    {
        $this->load->view('home/test');
    }

    public function index()
    {
         
        if (!empty($_SESSION['is_checked'])) {
            redirect("/home/start");
        }
        $this->load->view('home/start');
    }

    public function check()
    {
        $school_name  = $this->input->post("school_name");

        if (true || trim($school_name) == '成都市现代职业技术学校') {
            $_SESSION['is_checked'] = 1;
            $this->success();
        }
        $this->error();
    }


}
