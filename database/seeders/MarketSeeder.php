<?php

namespace Database\Seeders;

use App\Models\Market;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarketSeeder extends Seeder
{

    protected $cryptos = [
        ['name' => 'Bitcoin', 'avatar' => "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579", 'symbol' => 'btc', 'key_id' => 'bitcoin'],
        ['name' => 'Ethereum', 'avatar' => "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880", 'symbol' => 'eth', 'key_id' => 'ethereum'],
        ['name' => 'XRP', 'avatar' => "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731", 'symbol' => 'xrp', 'key_id' => 'ripple'],
        ['name' => 'EOS', 'avatar' => "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png?1547034481", 'symbol' => 'eos', 'key_id' => 'eos'],
        ['name' => 'Cardano', 'avatar' => "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860", 'symbol' => 'ada', 'key_id' => 'cardano'],
        ['name' => 'BNB', 'avatar' => "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850", 'symbol' => 'bnb', 'key_id' => 'binancecoin'],
        ['name' => 'Dogecoin', 'avatar' => "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256", 'symbol' => 'doge', 'key_id' => 'dogecoin'],
        ['name' => 'Litecoin', 'avatar' => "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580", 'symbol' => 'ltc', 'key_id' => 'litecoin'],
        ['name' => 'TRON', 'avatar' => "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066", 'symbol' => 'trx', 'key_id' => 'tron'],
        ['name' => 'Solana', 'avatar' => "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422", 'symbol' => 'sol', 'key_id' => 'solana'],
        ['name' => 'Shiba Inu', 'avatar' => "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1622619446", 'symbol' => 'shib', 'key_id' => 'shiba-inu'],
        ['name' => 'Polygon', 'avatar' => "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912", 'symbol' => 'matic', 'key_id' => 'matic-network'],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->cryptos as $key => $crypto) {
            Market::create([
                'name' => $crypto['name'],
                'avatar' => $crypto['avatar'],
                'symbol' => $crypto['symbol'],
                'key' => $crypto['key_id'],
                'min_amount' => 5000,
                'max_amount' => 100000,
                'is_active' => true,
                'metadata' => [
                    "intervals" =>  json_encode([15, 30, 60, 120, 180]),
                    "amount_quick_options" =>  json_encode([5000, 8000, 10000, 12000, 18000]),
                    "amount_win_percentage" =>  json_encode([10, 20, 30, 40, 50])
                ]
            ]);
        }
    }
}
