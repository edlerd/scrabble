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
    public $isFinished;

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
            'isFinished' => $this->isFinished,
            'playerScores' => [
                'you' => $this->playerScores[$playerId],
                'other' => $this->playerScores[$this->getOtherPlayerId($playerId)],
            ],
            'stashSize' => count($this->stashLetters),
            'yourLetters' => $this->playerLetters[$playerId],
            'yourTurn' => $this->playerToMoveId === $playerId,
        ];
    }

    public function calculateEnding() {
        if ($this->isFinished || !$this->checkEnded()) {
            return false;
        }

        $this->isFinished = true;

        $scoreArray = $this->getScoreArray();
        foreach ($this->playerLetters as $playerId => $letters) {
            foreach ($letters as $char) {
                $this->playerScores[$playerId] -= $scoreArray[$char];
            }
        }

        return true;
    }

    private function getScoreArray(): array {
        switch ($this->language) {
            case 'german':
                return German::LETTER_POINTS;
            case 'english':
            default:
                return English::LETTER_POINTS;
        }
    }

    private function checkEnded(): bool {
        if ($this->bothPlayerPassCount === count($this->playerIds) * 2) {
            return true;
        }

        foreach ($this->playerLetters as $playerId => $playerLetters) {
            if (count($playerLetters) === 0 && count($this->stashLetters) === 0) {
                return true;
            }
        }

        return false;
    }
}