<?php
return array(
    'router' => array(
        'routes' => array(
            'cdli-modal-selector_ds_zfcuser' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/api/cdli-modal-selector/ds/zfcuser',
                    'defaults' => array(
                        'controller' => 'cdli-modal-selector_ds_zfcuser',
                    ),
                ),
                'may_terminate' => true,
            ),
        ),
    ),
    'view_manager' => array(
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
);
