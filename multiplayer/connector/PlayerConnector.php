<?php

class PlayerConnector {
    const REDIS_PLAYER_PREFIX = 'scr_p:';
    const REDIS_PLAYER_LAST_SEEN_PREFIX = 'scr_pl:';

    private $redis;

    public function __construct() {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    private function getKeyByPlayerId(string $playerId): string {
        return self::REDIS_PLAYER_PREFIX . $playerId;
    }

    private function generatePlayerId(): string {
        return bin2hex(openssl_random_pseudo_bytes(16));
    }

    public function save(Player $player): Player {
        if (!$player->id) {
            $player->id = $this->generatePlayerId();
        }

        $key = $this->getKeyByPlayerId($player->id);
        $this->redis->set($key, json_encode($player));

        return $player;
    }

    public function get(string $playerId): ?Player {
        $key = $this->getKeyByPlayerId($playerId);
        $json = $this->redis->get($key);

	$player = new Player();

	if (!$json) {
		return null;
	}

        $data = json_decode($json, true);
        foreach ($data as $key => $value) $player->{$key} = $value;

        return $player;
    }

    private function getKeyLastSeen(string $playerId): string {
        return self::REDIS_PLAYER_LAST_SEEN_PREFIX . $playerId;
    }

    public function setLastSeen(string $playerId) {
        $key = $this->getKeyLastSeen($playerId);
        $this->redis->set($key, time());
    }

    public function getLastSeenSecondsAgo(string $playerId) {
        $key = $this->getKeyLastSeen($playerId);
        $lastSeenTimestamp = (int) $this->redis->get($key);

        return time() - $lastSeenTimestamp;
    }

    public function delete(string $playerId) {
        $key = $this->getKeyByPlayerId($playerId);
        $this->redis->delete($key);

        $timeKey = $this->getKeyLastSeen($playerId);
        $this->redis->delete($timeKey);
    }
}
