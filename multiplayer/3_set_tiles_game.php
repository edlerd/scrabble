<?php
require_once ('config.php');

$playerId = $_GET['playerId'];
$points = $_GET['points'];
$setLettersWithIndex = json_decode($_GET['setLettersWithIndex']);

$playerConnector = new PlayerConnector();
$player = $playerConnector->get($playerId);
$playerConnector->setLastSeen($playerId);

$gameConnector = new GameConnector();
$game = $gameConnector->get($player->gameId);

$game->recentSetIndexes = [];
foreach ($setLettersWithIndex as $lettersWithIndex) {
    $index = $lettersWithIndex->id;
    $letter = $lettersWithIndex->ltr;

    $game->boardLetters[$index] = $letter;
    $game->recentSetIndexes[] = $index;

    $key = array_search($letter, $game->playerLetters[$playerId]);
    array_splice($game->playerLetters[$playerId], $key, 1);
}

$game->drawTiles();
$game->bothPlayerPassCount = 0;
$game->playerToMoveId = $game->getOtherPlayerId($playerId);

//todo: validate and calculate server side
$game->playerScores[$playerId] += $points;

$gameConnector->save($game);

$data = $game->getResponse($playerId);
echo json_encode($data);
