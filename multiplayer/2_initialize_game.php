<?php
require_once ('config.php');

$playerId = $_GET['playerId'];

$playerConnector = new PlayerConnector();
$player = $playerConnector->get($playerId);
$playerConnector->setLastSeen($playerId);

$gameConnector = new GameConnector();
$game = $gameConnector->get($player->gameId);

$otherPlayerId = $game->getOtherPlayerId($playerId);
$otherPlayer = $playerConnector->get($otherPlayerId);

$data = $game->getResponse($playerId);
$data['otherPlayersName'] = $otherPlayer->name;

echo json_encode($data);