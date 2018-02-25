<?php

class LoungeConnector {
    const REDIS_LOUNGE_KEY = 'scr_lounge:';

    private $redis;

    public function __construct() {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    public function add(Player $player) {
        $this->redis->sAdd(self::REDIS_LOUNGE_KEY . $player->language, $player->id);
    }

    public function getPair(string $playerId, string $language) {
        $key = self::REDIS_LOUNGE_KEY . $language;

        $reservePlayerId = $this->redis->sRem($key, $playerId);
        if (!$reservePlayerId) {
            return false;
        }

        $tryAgain = true;
        while ($tryAgain) {
            $secondPlayerId = $this->redis->sPop($key);

            if (!$secondPlayerId) {
                $this->redis->sAdd($key, $playerId);
                return false;
            }

            $tryAgain = false;
            $playerConnector = new PlayerConnector();
            $lastSeen = $playerConnector->getLastSeenSecondsAgo($secondPlayerId);
            if ($lastSeen > 10) {
                $playerConnector->delete($secondPlayerId);
                $secondPlayerId = false;
                $tryAgain = true;
            }
        }

        return [
            $playerId,
            $secondPlayerId,
        ];
    }
}