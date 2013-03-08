<?php
namespace CdliModalSelector\Mapper;

use ZfcUser\Mapper\User as BaseUserMapper;
use Zend\Db\Sql\Select;
use Zend\Stdlib\Hydrator\HydratorInterface;

/**
 * Temporary hack on ZfcUser until a better way of querying users is worked out
 */
class ZfcUserZendDb extends BaseUserMapper
{
    public function fetchAll()
    {
        $select = $this->getSelect()->order('display_name ASC')->order('username ASC');
        $resultset = $this->select($select)->toArray(false);
        foreach ( $resultset as $k=>$v ) unset($resultset[$k]['password']);
        return $resultset;
    }
}
