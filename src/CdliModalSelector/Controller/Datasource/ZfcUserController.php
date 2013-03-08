<?php
namespace CdliModalSelector\Controller\Datasource;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use ZfcUser\Mapper\User as UserMapper;

class ZfcUserController extends AbstractRestfulController
{
    /**
     * Return list of resources
     *
     * @return mixed
     */
    public function getList()
    {
        return new JsonModel(array(
            'resultset' => $this->getUserMapper()->fetchAll(),
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
    public function getUserMapper()
    {
        if (is_null($this->userMapper)) {
            $this->userMapper = $this->getServiceLocator()->get('zfcuser_user_mapper');
        }
        return $this->userMapper;
    }

    public function setUserMapper(UserMapper $m)
    {
        $this->userMapper = $m;
        return $this;
    }
}
