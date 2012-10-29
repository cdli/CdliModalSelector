<?php
return array(
    'asset_manager' => array(
        'resolver_configs' => array(
            'paths' => array(
                __DIR__ . '/../public',
            ),
        ),
    ),
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
