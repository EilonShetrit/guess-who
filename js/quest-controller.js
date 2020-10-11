'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
  saveToStorage(STORAGE_KEY, getQuests())
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide('slow');
  renderQuest();
  // TODO: show the quest section
  $('.quest').css({ display: 'block' });
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  var question = getCurrQuest();
  $('.quest h2').text(`${question.txt}`);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.victory').css({ display: 'block' });
      $('header img').css({ display: 'none' });
      $('.quest').hide('');
      // TODO: improve UX 
    } else {
      // TODO: hide and show new-quest section
      $('.quest').hide('');
      $('.new-quest').css({ display: 'block' });
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res;
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
  saveToStorage(STORAGE_KEY, getQuests())
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
