<?php

class GameConnector {
    const REDIS_GAME_PREFIX = 'scr_g:';

    private $redis;

    public function __construct() {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    private function getKeyByGameId(string $id): string {
        return self::REDIS_GAME_PREFIX . $id;
    }

    private function generateGameId(): string {
        return bin2hex(openssl_random_pseudo_bytes(16));
    }

    public function save(Game $game): Game {
        if (!$game->id) {
            $game->id = $this->generateGameId();
        }

        $key = $this->getKeyByGameId($game->id);
        $this->redis->set($key, json_encode($game));

        return $game;
    }

    public function get(string $gameId): Game {
        $key = $this->getKeyByGameId($gameId);
        $json = $this->redis->get($key);

        $data = json_decode($json, true);
        $game = new Game();
        foreach ($data as $key => $value) $game->{$key} = $value;

        return $game;
    }
}