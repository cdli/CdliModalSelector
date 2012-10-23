<?php
namespace CdliModalSelector\Mapper;

use ZfcUser\Mapper\User as BaseUserMapper;
use Zend\Db\Sql\Select;
use Zend\Stdlib\Hydrator\HydratorInterface;

/**
 * Temporary hack on ZfcUser until a better way of querying users is worked out
 */
class ZfcUser extends BaseUserMapper
{
    public function getSelect($table = null) 
    { 
        return parent::getSelect($table); 
    }

    public function select(Select $select, $entityPrototype = null, HydratorInterface $hydrator = null)
    {
        return parent::select($select, $entityPrototype, $hydrator);
    }
}
