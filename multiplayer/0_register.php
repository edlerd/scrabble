<?php
require_once ('config.php');

const LANGUAGE_ENGLISH = 'english';

$player = new Player();
$player->name = htmlspecialchars($_POST['playerName']);
$player->language = LANGUAGE_ENGLISH;

$playerConnector = new PlayerConnector();
$playerConnector->save($player);
$playerConnector->setLastSeen($player->id);

$loungeConnector = new LoungeConnector();
$loungeConnector->add($player);

header("Location: 1_matchmaker.php?playerId=$player->id");