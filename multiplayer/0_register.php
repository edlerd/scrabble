<?php
require_once ('config.php');

const LANGUAGE_ENGLISH = 'english';
const LANGUAGE_GERMAN = 'german';

$player = new Player();
$player->name = htmlspecialchars($_POST['playerName']);
$player->language = in_array($_POST['language'], [ LANGUAGE_ENGLISH, LANGUAGE_GERMAN ]) ? $_POST['language'] : LANGUAGE_ENGLISH;;

$playerConnector = new PlayerConnector();
$playerConnector->save($player);
$playerConnector->setLastSeen($player->id);

$loungeConnector = new LoungeConnector();
$loungeConnector->add($player);

header("Location: 1_matchmaker.php?playerId=$player->id");