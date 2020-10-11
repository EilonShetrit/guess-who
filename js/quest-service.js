const STORAGE_KEY = 'QestionsDB';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    if (loadFromStorage(STORAGE_KEY)) gQuestsTree = loadFromStorage(STORAGE_KEY)
    else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}
function isChildless(node) {
    return (node.yes === null && node.no === null)
}
function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars 
    var question = getCurrQuest();
    gPrevQuest = question;
    if (res === 'yes') gCurrQuest = question.yes;
    else gCurrQuest = question.no;
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    if(!newQuestTxt || !newGuessTxt) $('.btn-add-guess').click() === false;
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = createQuest(gCurrQuest.txt);
    if (lastRes === 'yes') gPrevQuest.yes = newQuest
    else gPrevQuest.no = newQuest;
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}
function getCurrQuest() {
    return gCurrQuest
}
function getQuests() {
    return gQuestsTree;
}