<?php
class MY_Controller extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    public function success($data = array())
    {
        die(json_encode(array('code' => 0, 'data' => $data)));
    }

    public function error($code = 1, $message = "网络异常,请稍后再试", $data= array())
    {
        die(json_encode(array('code' => 1, 'message' => $message, 'data' => $data)));
    }

}
