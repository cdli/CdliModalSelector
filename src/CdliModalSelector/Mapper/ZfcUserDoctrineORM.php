<?php
namespace CdliModalSelector\Mapper;

/**
 * Temporary hack on ZfcUser until a better way of querying users is worked out
 */
class ZfcUserDoctrineORM extends \ZfcUserDoctrineORM\Mapper\User
{
    public function fetchAll()
    {
        $er = $this->em->getRepository($this->options->getUserEntityClass());
        $resultset=array();
        foreach ($er->findBy(array()) as $v) {
            $resultset[$v->getId()] = array(
                'id' => $v->getId(),
                'username' => $v->getUsername(),
                'email' => $v->getEmail(),
                'displayName' => $v->getDisplayName(),
                'state' => $v->getState(),
            );
        }
        return $resultset;
    }
}
