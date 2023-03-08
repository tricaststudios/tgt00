<?php
return [
    'only' => [
        'dashboard',

        'terms',

        'markets.index',
        'markets.show',

        'miners.index',

        'user.orders.index',
        'user.orders.store',

        'user.deposits.index',
        'user.deposits.store',

        'user.withdrawals.index',
        'user.withdrawals.store',

        'user.withdrawals.accounts.index',
        'user.withdrawals.accounts.store',

        'user.profile.edit',
        'user.profile.update',
        'user.profile.destroy',

        'user.wallet_address.update',
        'user.wallet.index',

        'user.miners.index',
        'user.miners.store',

        'user.security.edit',
        'user.password.update',

        'user.pin.update',
        'user.verification.store',

        'logout',
        'login',
        'register',
        'password.request'
    ],
];
