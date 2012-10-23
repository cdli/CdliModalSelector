<?php
namespace CdliModalSelector\Controller\Datasource;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class ZfcUserController extends AbstractRestfulController
{
    /**
     * Return list of resources
     *
     * @return mixed
     */
    public function getList()
    {
        $mapper = $this->getUserMapper();
        $select = $mapper->getSelect('user')->order('display_name ASC')->order('username ASC');
        $resultset = $mapper->select($select)->toArray(false);
        foreach ( $resultset as $k=>$v ) unset($resultset[$k]['password']);

        return new JsonModel(array(
            'resultset' => $resultset,
        ));
    }

    /**
     * Return single resource
     *
     * @param  mixed $id
     * @return mixed
     */
    public function get($id)
    {
    }

    /**
     * Create a new resource
     *
     * @param  mixed $data
     * @return mixed
     */
    public function create($data)
    {
    }

    /**
     * Update an existing resource
     *
     * @param  mixed $id
     * @param  mixed $data
     * @return mixed
     */
    public function update($id, $data)
    {
    }

    /**
     * Delete an existing resource
     *
     * @param  mixed $id
     * @return mixed
     */
    public function delete($id)
    {
    }    

    protected $userMapper;
    protected function getUserMapper()
    {
        if (is_null($this->userMapper)) {
            $this->userMapper = $this->getServiceLocator()->get('zfcuser_user_mapper');
        }
        return $this->userMapper;
    }
}
