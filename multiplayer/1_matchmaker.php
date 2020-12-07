<?php
require_once ('config.php');

$playerId = $_GET['playerId'];

$playerConnector = new PlayerConnector();
$player = $playerConnector->get($playerId);
if (!$player) {
	die('invalid id');
}
$playerConnector->setLastSeen($playerId);

if ($player->gameId) {
    header("Location: game/?playerId=$player->id&lang=$player->language");
    exit();
}

$loungeConnector = new LoungeConnector();
$playerIds = $loungeConnector->getPair($player->id, $player->language);

if (!$playerIds) {
    header("Location: lounge.html?playerId=$player->id");
    exit();
}

$game = new Game();
$game->boardLetters = array_fill(0, 225, '');
$game->bothPlayerPassCount = 0;
$game->isFinished = false;
$game->language = $player->language;
$game->playerIds = $playerIds;
$game->playerToMoveId = $player->id;
$game->playerLetters = [
    $playerIds[0] => [],
    $playerIds[1] => [],
];
$game->playerScores = [
    $playerIds[0] => 0,
    $playerIds[1] => 0
];
$game->stashLetters = array_values($player->language === "english" ? English::LETTER_STASH : German::LETTER_STASH);
$game->drawTiles();

$gameConnector = new GameConnector();
$gameConnector->save($game);

$player->gameId = $game->id;
$playerConnector->save($player);

$playerTwo = $playerConnector->get($playerIds[1]);
$playerTwo->gameId = $game->id;
$playerConnector->save($playerTwo);

header("Location: game/?playerId=$player->id&lang=$player->language");
