<?php

class Game {
    public $id;
    public $language;
    public $playerIds;
    public $playerToMoveId;
    public $stashLetters;
    public $playerLetters;
    public $playerScores;
    public $boardLetters;
    public $bothPlayerPassCount;
    public $recentSetIndexes;

    public function drawTiles() {
        foreach ($this->playerLetters as $playerId => $playerLetters) {
            while (count($playerLetters) < 7) {
                $stashSize = count($this->stashLetters);
                $id = random_int(0, $stashSize - 1);
                $playerLetters[] = $this->stashLetters[$id];
                array_splice($this->stashLetters, $id, 1);
            }
            $this->playerLetters[$playerId] = array_values($playerLetters);
        }
    }

    public function getOtherPlayerId(string $playerId): string {
        foreach ($this->playerIds as $candidateId) {
            if ($candidateId !== $playerId) {
                return $candidateId;
            }
        }
        throw new Exception('no other player found');
    }

    public function getResponse(string $playerId): array {
        return [
            'boardLetters' => $this->boardLetters,
            'playerScores' => [
                'you' => $this->playerScores[$playerId],
                'other' => $this->playerScores[$this->getOtherPlayerId($playerId)],
            ],
            'stashSize' => count($this->stashLetters),
            'yourLetters' => $this->playerLetters[$playerId],
            'yourTurn' => $this->playerToMoveId === $playerId,
        ];
    }
}