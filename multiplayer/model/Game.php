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
        $newPlayerLetters = [];
        foreach ($this->playerLetters as $playerId => $playerLetters) {
            $missingLetterCount = 7 - count($playerLetters);

            if ($missingLetterCount === 0) {
                $newPlayerLetters[$playerId] = array_values($playerLetters);
                continue;
            }

            $pickedLetterIndexes = array_rand($this->stashLetters, $missingLetterCount);
            $pickedLetterIndexes = is_array($pickedLetterIndexes) ? $pickedLetterIndexes : [$pickedLetterIndexes];
            foreach ($pickedLetterIndexes as $id) {
                $playerLetters[] = $this->stashLetters[$id];
            }
            $newPlayerLetters[$playerId] = array_values($playerLetters);
            foreach ($pickedLetterIndexes as $id) {
                unset($this->stashLetters[$id]);
            }
            $this->stashLetters = array_values($this->stashLetters);
        }
        $this->playerLetters = $newPlayerLetters;
    }

    public function getOtherPlayerId(string $playerId): string {
        foreach ($this->playerIds as $candidateId) {
            if ($candidateId !== $playerId) {
                return $candidateId;
            }
        }
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