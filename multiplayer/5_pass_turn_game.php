<?php
require_once ('config.php');

$playerId = $_GET['playerId'];
$droppedLetters = json_decode($_GET['droppedLetters']);

$playerConnector = new PlayerConnector();
$player = $playerConnector->get($playerId);
$playerConnector->setLastSeen($playerId);

$gameConnector = new GameConnector();
$game = $gameConnector->get($player->gameId);

$game->recentSetIndexes = [];
foreach ($droppedLetters as $letter) {
    $key = array_search($letter, $game->playerLetters[$playerId]);
    array_splice($game->playerLetters[$playerId], $key, 1);
}

$game->drawTiles();
$game->bothPlayerPassCount++;
$game->playerToMoveId = $game->getOtherPlayerId($playerId);

$gameConnector->save($game);

$data = $game->getResponse($playerId);
echo json_encode($data);