<?php
require_once ('config.php');

$playerId = $_GET['playerId'];

$playerConnector = new PlayerConnector();
$player = $playerConnector->get($playerId);
$playerConnector->setLastSeen($playerId);

$gameConnector = new GameConnector();
$game = $gameConnector->get($player->gameId);

$data = $game->getResponse($playerId);
$data['recentSetIndexes'] = $game->recentSetIndexes;
echo json_encode($data);
