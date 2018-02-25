<?php

class LoungeConnector {
    const REDIS_LOUNGE_KEY = 'scr_lounge';

    private $redis;

    public function __construct() {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    public function add(Player $player) {
        $this->redis->sAdd(self::REDIS_LOUNGE_KEY, $player->id);
    }

    public function remove(string $playerId) {
        $this->redis->sRem(self::REDIS_LOUNGE_KEY, $playerId);
    }

    public function getPair(string $playerId) {
        $reservePlayerId = $this->redis->sRem(self::REDIS_LOUNGE_KEY, $playerId);
        if (!$reservePlayerId) {
            return false;
        }

        $tryAgain = true;
        while ($tryAgain) {
            $secondPlayerId = $this->redis->sPop(self::REDIS_LOUNGE_KEY);

            if (!$secondPlayerId) {
                $this->redis->sAdd(self::REDIS_LOUNGE_KEY, $playerId);
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