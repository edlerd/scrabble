/**

 Copyright 2014-2018 David Edler

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/
var BOARD = null; // future pointer to dom element
var BOARD_LETTERS = [];
var TO_BE_PLAYED_BOARD_LETTER_INDEXES = [];
var LETTERS_PLAYED_BY_OPPONENT_INDEXES = [];

var OPPONENT_NAME;

var LETTER_STASH_SIZE;
var POINTS_PER_LETTER;
var LANGUAGE_CONFIG;

var IS_MY_MOVE;
var IS_GAME_FINISHED;

var PLAYER_ID = getUrlParameterByName('playerId');
var PLAYER_LETTERS = [];

var PLAYER_1_POINTS  = 0;
var PLAYER_2_POINTS  = 0;

const LANG_ENGLISH = 'english';
const LANG_GERMAN = 'deutsch';
const ENGLISH_CONFIG_URL = 'config/english.jsonp';
const GERMAN_CONFIG_URL = 'config/german.jsonp';
loadLanguageConfig();

function getUrlParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getConfigUrl() {
  var lang = getUrlParameterByName('lang');

  switch (lang) {
    case LANG_ENGLISH:
      return ENGLISH_CONFIG_URL;
    case LANG_GERMAN:
    default:
      return GERMAN_CONFIG_URL;
  }
}

function i18n(text) {
  var lang = getUrlParameterByName('lang') || LANG_GERMAN;

  if (TRANSLATION_MAP[text] && TRANSLATION_MAP[text][lang]) {
    return TRANSLATION_MAP[text][lang];
  }

  return text;
}

function loadLanguageConfig() {
  var request = new XMLHttpRequest();
  var configUrl = getConfigUrl();
  request.open("GET", configUrl, true);
  request.onreadystatechange = function()
  {
    if (request.readyState === 4) {
      LANGUAGE_CONFIG = JSON.parse(request.responseText);
      POINTS_PER_LETTER = LANGUAGE_CONFIG.POINTS_PER_LETTER;
      loadDictionary();
    }
  };
  request.send(null);
}

var DICTIONARY = [];

function loadDictionary() {
  var request = new XMLHttpRequest();
  request.open("GET", LANGUAGE_CONFIG.DICTIONARY_URL, true);
  request.onreadystatechange = function()
  {
    if (request.readyState === 4) {
      DICTIONARY = request.responseText.replace("OE","Ö").replace("UE",'Ü').replace('AE','Ä').toUpperCase();
      initializeMultiplayer();
    }
  };
  request.send(null);
}

function initializeMultiplayer() {
  var request = new XMLHttpRequest();
  request.open("GET", '../2_initialize_game.php?playerId=' + PLAYER_ID, true);
  request.onreadystatechange = function()
  {
    if (request.readyState === 4) {

      GAME_STATE = JSON.parse(request.responseText);
      BOARD_LETTERS = GAME_STATE.boardLetters;
      OPPONENT_NAME = GAME_STATE.otherPlayersName;
      PLAYER_1_POINTS = GAME_STATE.playerScores.you;
      PLAYER_2_POINTS = GAME_STATE.playerScores.other;
      PLAYER_LETTERS = GAME_STATE.yourLetters;
      LETTER_STASH_SIZE = parseInt(GAME_STATE.stashSize);
      IS_MY_MOVE = GAME_STATE.yourTurn;
      startGame();
    }
  };
  request.send(null);
}

function sendSetTilesRequest(setLettersWithIndex, points, onDone) {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    '../3_set_tiles.php?playerId=' + PLAYER_ID + '&points=' + points + '&setLettersWithIndex=' + JSON.stringify(setLettersWithIndex),
    true
  );
  request.onreadystatechange = function()
  {
    if (request.readyState === 4) {

      GAME_STATE = JSON.parse(request.responseText);
      BOARD_LETTERS = GAME_STATE.boardLetters;
      PLAYER_LETTERS = GAME_STATE.yourLetters;
      PLAYER_1_POINTS = GAME_STATE.playerScores.you;
      PLAYER_2_POINTS = GAME_STATE.playerScores.other;
      LETTER_STASH_SIZE = parseInt(GAME_STATE.stashSize);
      IS_MY_MOVE = GAME_STATE.yourTurn;

      onDone();

      if (GAME_STATE.isFinished) {
        endGame();
      }
    }
  };
  request.send(null);
}

function sendGetOtherPlayersMoveRequest(onKeepWaiting, onDone) {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    '../4_get_other_players_move.php?playerId=' + PLAYER_ID,
    true
  );
  request.onreadystatechange = function()
  {
    if (request.readyState === 4) {
      GAME_STATE = JSON.parse(request.responseText);
      BOARD_LETTERS = GAME_STATE.boardLetters;
      PLAYER_1_POINTS = GAME_STATE.playerScores.you;
      PLAYER_2_POINTS = GAME_STATE.playerScores.other;
      LETTERS_PLAYED_BY_OPPONENT_INDEXES = GAME_STATE.recentSetIndexes;
      LETTER_STASH_SIZE = parseInt(GAME_STATE.stashSize);
      IS_MY_MOVE = GAME_STATE.yourTurn;

      if (IS_MY_MOVE) {
        onDone();

        if (GAME_STATE.isFinished) {
          endGame();
        }
      } else {
        onKeepWaiting();
      }
    }
  };
  request.send(null);
}

function sendPassRequest(droppedLetters, onDone) {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    '../5_skip_turn.php?playerId=' + PLAYER_ID + '&droppedLetters=' + JSON.stringify(droppedLetters),
    true
  );
  request.onreadystatechange = function()
  {
    if (request.readyState === 4) {
      GAME_STATE = JSON.parse(request.responseText);
      LETTER_STASH_SIZE = parseInt(GAME_STATE.stashSize);
      PLAYER_1_POINTS = GAME_STATE.playerScores.you;
      PLAYER_2_POINTS = GAME_STATE.playerScores.other;
      PLAYER_LETTERS = GAME_STATE.yourLetters;
      IS_MY_MOVE = GAME_STATE.yourTurn;

      onDone();

      if (GAME_STATE.isFinished) {
        endGame();
      }
    }
  };
  request.send(null);
}

function showLetterInput(elem) {
  // get current field
  var targetPosition = elem.srcElement.id.substring(1,elem.srcElement.id.length).split("_");
  var x = parseInt(targetPosition[0]) - 1;
  var y = parseInt(targetPosition[1]) - 1;

  // if there is already a active tile, remove it.
  if (elem.target.classList.contains('player_set_tile')) {
    var returnedIndex = x * 15 + y;
    var letter = BOARD_LETTERS[returnedIndex];
    BOARD_LETTERS[x*15+y] = "";
    TO_BE_PLAYED_BOARD_LETTER_INDEXES.splice(TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(returnedIndex), 1);
    PLAYER_LETTERS.push(letter);
    elem.target.classList.remove('player_set_tile');
    printPlayersLetters();
    printBoard();
    updatePlayButton();
    return;
  }

  // there is already a letter
  if (elem.target.innerHTML !== '') {
    return;
  }

  // mark target cell
  elem.srcElement.classList.add("input_here");

  // show the input layer
  var input_container = document.getElementById("input_container");
  input_container.style.padding= (elem.srcElement.offsetTop + 10) + " 0 0 " + (elem.srcElement.offsetLeft + 55);
  input_container.style.display= "block";
  input_container.innerHTML = i18n('Welchen Buchstaben möchtest du hier setzen?') + "<br><div class='input_letter'>" + PLAYER_LETTERS.join("</div><div class='input_letter'>") + "</div>";

  // append event listeners to input buttons
  var buttons=document.getElementsByClassName("input_letter");
  for (var i=0; i<buttons.length; i++) {
    buttons[i].onclick = letterClicked;
  }
}

function letterClicked(elem) {
  // hide input layer
  document.getElementById("input_container").style.display="none";

  // get target field
  var targetRect = document.getElementsByClassName("input_here")[0];
  targetRect.classList.remove("input_here");

  // get clicked letter
  var letter = elem.srcElement.innerHTML;

  // get target position
  var targetPosition = targetRect.id.substring(1,targetRect.id.length).split("_");
  var x = parseInt(targetPosition[0]) - 1;
  var y = parseInt(targetPosition[1]) - 1;

  var letter_position = PLAYER_LETTERS.indexOf(letter);
  if (letter_position === -1) {
    alert("Den Buchstaben hast du nicht auf der Hand!");
    return;
  }

  // set the letter
  BOARD_LETTERS[x*15 + y] = letter;
  PLAYER_LETTERS.splice(letter_position,1);
  TO_BE_PLAYED_BOARD_LETTER_INDEXES.push(x*15 + y);
  LETTERS_PLAYED_BY_OPPONENT_INDEXES = [];
  printPlayersLetters();
  printBoard();
  updatePlayButton();
}

function updatePlayButton() {
  var points = checkValidStateAndCalculatePoints();
  if (points) {
    document.getElementById("move").innerHTML = i18n("spielen") + " (" + i18n("für") + " " + points + " " + i18n("punkte") + ")";
    document.getElementById("move").disabled = false;
  } else {
    document.getElementById("move").innerHTML = i18n("spielen");
    document.getElementById("move").disabled = true;
  }
}

function printPlayersLetters() {
  var out = "";
  for (var i=0; i<PLAYER_LETTERS.length; i++) {
    out += '<div class="hand_letter">' + PLAYER_LETTERS[i] + '<div class="hand_letter_points">' + POINTS_PER_LETTER[PLAYER_LETTERS[i]] + '</div></div>';
  }
  document.getElementById("player_1_letters").innerHTML = out;
}

function printBoard() {
  for (var i=0; i<15; i++) {
    for (var j=0; j<15; j++) {
      var field = BOARD.rows[i].cells[j];
      field.innerHTML=BOARD_LETTERS[i * 15 + j];

      if (BOARD_LETTERS[i * 15 + j] === '') {
        field.style.cursor = "pointer";
      } else {
        field.style.cursor = "auto";
      }

      if (TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(i * 15 + j) !== -1) {
	      if (!field.classList.contains('player_set_tile')) {
	        field.classList.add('player_set_tile');
        }
        field.style.cursor = "no-drop";
      } else {
       field.classList.remove('player_set_tile');
      }

      if (LETTERS_PLAYED_BY_OPPONENT_INDEXES.indexOf(i * 15 + j) !== -1) {
        if (!field.classList.contains('ki_set_tile')) {
          field.classList.add('ki_set_tile');
        }
      } else {
        field.classList.remove('ki_set_tile');
      }
    }
  }

  // score
  document.getElementById("player_1_points").innerHTML = PLAYER_1_POINTS.toString();
  document.getElementById("player_2_points").innerHTML = PLAYER_2_POINTS.toString();

  // remaining tiles
  document.getElementById("letters_left").innerHTML = LETTER_STASH_SIZE.toString();
}

function takeBackCurrentTiles() {
  for (var i=0; i<TO_BE_PLAYED_BOARD_LETTER_INDEXES.length; i++) {
    var pos = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i];
    PLAYER_LETTERS.push(BOARD_LETTERS[pos]);
    BOARD_LETTERS[pos] = '';
  }
  TO_BE_PLAYED_BOARD_LETTER_INDEXES.length=0;
  printPlayersLetters();
  printBoard();
  updatePlayButton();
}

function isWordInDictionary(word) {
  return DICTIONARY.match("\n" + word + "\n") !== null;
}

function findWordsAndPointsByActiveLetters() {
  var words = [];
  var pointSum = 0;
  for (var i=0; i < TO_BE_PLAYED_BOARD_LETTER_INDEXES.length; i++) {
    var cur = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i];
    /*
     * horizontal words
     */
    // find leftest letter
    var h=cur;
    while (BOARD_LETTERS[h-1] !== "" && (h % 15) > 0) {
      h -=1;
    }
    //construct word
    var word_multiplier = 1;
    var letter_multiplier = 1;
    var word = BOARD_LETTERS[h];
    if (TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(h) !== -1) {
      if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("dl")) {
        letter_multiplier = 2;
      }
      if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("tl")) {
        letter_multiplier = 3;
      }
      if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("dw")) {
        word_multiplier *= 2;
      }
      if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("tw")) {
        word_multiplier *= 3;
      }
    }
    var points = letter_multiplier * POINTS_PER_LETTER[BOARD_LETTERS[h]];
    h++;
    while (BOARD_LETTERS[h] !== "" && (h % 15) !== 0) {
      letter_multiplier = 1;
      if (TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(h) !== -1) {
        if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("dl")) {
          letter_multiplier = 2;
        }
        if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("tl")) {
          letter_multiplier = 3;
        }
        if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("dw")) {
          word_multiplier *= 2;
        }
        if (document.getElementById("s"+ Math.floor(h/15+1) + "_" + Math.floor(h%15+1)).classList.contains("tw")) {
          word_multiplier *= 3;
        }
      }
      word = word.concat(BOARD_LETTERS[h]);
      points += letter_multiplier * POINTS_PER_LETTER[BOARD_LETTERS[h]];
      h+=1;
    }
    if (word.length > 1 && words.indexOf(word) === -1) {
      words.push(word);
      pointSum += points * word_multiplier;
    }

    /*
     * vertical words
     */
    // find highest letter
    var v=cur;
    while (BOARD_LETTERS[v-15] !== "" && v > 14) {
      v -= 15;
    }
    //construct word
    word = '';
    points = 0;
    word_multiplier = 1;
    while (BOARD_LETTERS[v] !== "" && v < 225) {
      letter_multiplier = 1;
      if (TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(v) !== -1) {
        if (document.getElementById("s"+ Math.floor(v/15+1) + "_" + Math.floor(v%15+1)).classList.contains("dl")) {
          letter_multiplier = 2;
        }
        if (document.getElementById("s"+ Math.floor(v/15+1) + "_" + Math.floor(v%15+1)).classList.contains("tl")) {
          letter_multiplier = 3;
        }
        if (document.getElementById("s"+ Math.floor(v/15+1) + "_" + Math.floor(v%15+1)).classList.contains("dw")) {
          word_multiplier *= 2;
        }
        if (document.getElementById("s"+ Math.floor(v/15+1) + "_" + Math.floor(v%15+1)).classList.contains("tw")) {
          word_multiplier *= 3;
        }
      }
      word = word.concat(BOARD_LETTERS[v]);
      points += letter_multiplier * POINTS_PER_LETTER[BOARD_LETTERS[v]];
      v += 15;
    }
    if (word.length > 1 && words.indexOf(word) === -1) {
      words.push(word);
      pointSum += points * word_multiplier;
    }
  }
  return [words, pointSum];
}

/**
 * is the current position of new letters valid?
 *
 * one new word set and no letters on random points of the board
 * new word is connected to old letters
 * or opening of the game and center field used
 **/
function isLetterPositionValid() {
  var start = 225;
  var end = 0;
  for (i=0; i < TO_BE_PLAYED_BOARD_LETTER_INDEXES.length; i++) {
    if (TO_BE_PLAYED_BOARD_LETTER_INDEXES[i] < start) {
      start = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i];
    }
    if (TO_BE_PLAYED_BOARD_LETTER_INDEXES[i] > end) {
      end = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i];
    }
  }

  var lineEnd = Math.abs(14 - (start % 15)) + start;
  var isHorizontal = lineEnd >= end;
  var increment = isHorizontal ? 1 : 15;

  for (i=start; i<end; i+=increment) {
    if (BOARD_LETTERS[i] === "") {
      return false;
    }
  }

  // do the tiles connect to letters on the board?
  for (var i=0; i < TO_BE_PLAYED_BOARD_LETTER_INDEXES.length; i++) {
    var left = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i]-1;
    if (left%15 < 14 && isFieldWithLetter(left)) {
      return true;
    }

    var right = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i]+1;
    if (right%15 > 0 && isFieldWithLetter(right)) {
      return true;
    }

    var top = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i]-15;
    if (top > 0 && isFieldWithLetter(top)) {
      return true;
    }

    var down = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i]+15;
    if (down < 225 && isFieldWithLetter(down)) {
      return true;
    }
  }

  return wasBoardEmpty() && isCenterFieldUsed();
}

function wasBoardEmpty() {
  for (var i = 0; i < 225; i++) {
    if (BOARD_LETTERS[i] !== '' && TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(i) === -1) {
      return false;
    }
  }

  return true;
}

function isCenterFieldUsed() {
  return TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(112) !== -1;
}

function isFieldWithLetter(index) {
  return TO_BE_PLAYED_BOARD_LETTER_INDEXES.indexOf(index) === -1 && BOARD_LETTERS[index] !== '';
}

function checkValidStateAndCalculatePoints() {
  if (!isLetterPositionValid()) {
    return false;
  }

  var t = findWordsAndPointsByActiveLetters();
  var words = t[0];
  var points = t[1];

  if (words.length < 1) {
    return false;
  }

  for (var i=0; i<words.length; i++) {
    if (!isWordInDictionary(words[i])) {
      return false;
    }
  }

  if (TO_BE_PLAYED_BOARD_LETTER_INDEXES.length === 7) {
    points += 50;
  }

  return points;
}

function onFinishMoveClick() {
  var lettersWithIndex = [];
  for (var i=0; i<TO_BE_PLAYED_BOARD_LETTER_INDEXES.length; i++) {
    var id = TO_BE_PLAYED_BOARD_LETTER_INDEXES[i];
    lettersWithIndex.push({
      'id': id,
      'ltr': BOARD_LETTERS[id]
    });
  }
  var points = checkValidStateAndCalculatePoints();

  var onDone = function() {
    printPlayersLetters();
    printBoard();
    waitForOtherPlayersMove();
    TO_BE_PLAYED_BOARD_LETTER_INDEXES = [];
  };

  sendSetTilesRequest(lettersWithIndex, points, onDone);
}

function waitForOtherPlayersMove() {
  if (IS_GAME_FINISHED) {
    return;
  }

  updatePlayButton();

  document.getElementById("input_container").innerHTML='waiting for other player';
  document.getElementById("input_container").style.display= "block";

  var onDone = function() {
    printBoard();
    document.getElementById("input_container").style.display= "none";
    playAlarmOnNoReaction()
  };

  setTimeout(
    function() {
      sendGetOtherPlayersMoveRequest(waitForOtherPlayersMove, onDone)
    },
    2000
  );
}

function playAlarmOnNoReaction() {
  var audio = new Audio('ring.mp3');

  var alarmTimeout = setTimeout(
    function(){
      audio.play();
    },
    10000
  );

  document.onmousemove = function(){
    clearTimeout(alarmTimeout);
  };

  document.onscroll = function() {
    clearTimeout();
  };
}

function onLetterToSwapClicked(elem) {
  if (elem.srcElement.style.background !== 'yellow') {
    elem.srcElement.style.background = 'yellow';
    elem.srcElement.classList.add('selected_to_switch');
  } else {
    elem.srcElement.style.background = '';
    elem.srcElement.classList.remove('selected_to_switch');
  }
}

function onSelectSwapTilesClicked() {
  takeBackCurrentTiles();

  if (LETTER_STASH_SIZE === 0) {
    onPerformSwapTiles();
    return;
  }

  var buttons=document.getElementsByClassName('hand_letter');
  for (var i=0; i<buttons.length; i++) {
    buttons[i].onclick = onLetterToSwapClicked;
  }

  var button = document.getElementById('pass');
  button.innerHTML = i18n('Wähle die Buchstaben aus, welche Du tauschen möchtest, dann klicke hier');
  button.onclick = onPerformSwapTiles;
}

function onPerformSwapTiles() {
  var letterElements = document.getElementsByClassName('selected_to_switch');
  var droppedLetters = [];
  for (var i = 0; i < letterElements.length; i++) {
    var letter = letterElements[i].innerHTML.charAt(0);
    var letter_position = PLAYER_LETTERS.indexOf(letter);
    PLAYER_LETTERS.splice(letter_position,1);
    droppedLetters.push(letter);
  }

  var onDone = function() {
    printPlayersLetters();

    var button = document.getElementById('pass');
    button.innerHTML = i18n('Buchstaben tauschen (passen)');
    button.onclick = onSelectSwapTilesClicked;

    waitForOtherPlayersMove();
  };

  sendPassRequest(droppedLetters, onDone);
}

function endGame() {
  IS_GAME_FINISHED = true;

  document.getElementById("move").disabled = true;
  document.getElementById('pass').disabled = true;

  document.getElementById("input_container").innerHTML='game over <a href="../" style="color:#ff9900">start new game</a>';
  document.getElementById("input_container").style.display= "block";

  alert(
    i18n('Das Spiel ist aus.') + '\n' +
    i18n("DU") + ": " + PLAYER_1_POINTS + ' ' + i18n("punkte") + '\n' +
    OPPONENT_NAME + ": " + PLAYER_2_POINTS + ' ' + i18n("punkte")
  );
}

function startGame() {
  BOARD = document.getElementById("board");
  // event handlers on board
  for (var i=0; i<15; i++) {
    for (var j=0; j<15; j++) {
      BOARD.rows[i].cells[j].onclick=showLetterInput;
    }
  }

  document.getElementById("move").disabled = true;
  document.getElementById("opponent_name").innerHTML = OPPONENT_NAME;

  printPlayersLetters();
  printBoard();

  if (!IS_MY_MOVE) {
    waitForOtherPlayersMove();
  }
}
