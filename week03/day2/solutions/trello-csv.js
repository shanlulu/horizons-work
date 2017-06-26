"use strict";

var program = require('commander');
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');
var Trello = require('trello');
var trello = new Trello("11d4c310a21b6f41026961f896401dde", "981a0c7de01ca019aef350df85ee2db70e094fdb0fca5d08a926f07d710531bf");

var bId = "575f32662e1339b789d9f676";

// instantiate key objects
var boardId;
var csvName;
var collect = function(val) {
  boardId = val;
};

// 1. parse cmdline args
program
  .version("0.0.0")
  .usage("node trello-csv.js [-u || --upload || -d || --download]  [board id] [csv file]")
  .option('-u, --upload [value]', 'Upload a csv as a trello board', collect)
  .option('-d, --download [value]', 'Download a trello board to csv', collect)
  .parse(process.argv);

var opFlag;
if (program.upload) {
  opFlag = 'u';
} else if (program.download){
  opFlag = 'd';
} else {
  console.log("Please supply an upload or download flag");
  process.exit();
}

csvName = process.argv[process.argv.length - 1];

// 1. upload functionality - read csv and upload to trello
var uploadToTrello = function(bId, fName) {
  var csvData = fs.readFileSync(fName).toString();
  
  csv.parse(csvData, { columns: true}, function(err, data){
    // build obj = { 'listName': [ 'card1 Name', ...], ...}
    var cardsInList = _.reduce(data, function(prev, currItem) {
      for (var key in currItem) {
        if (!prev[key]) {
          prev[key] = [];
        } 
        prev[key].push(currItem[key]);
      }
      return prev;
    }, {});
    _.mapObject(cardsInList, function(cards, listName) {
      trello.addListToBoard(bId, listName, function(err, trelloList) {

        cards.forEach(function(cardName) {
          trello.addCard(cardName, '', trelloList.id, function(err, cardData) {
            
          });
        });
      });
    });
  });
};

// 1. download functionality - read trello data and output to csv
var downloadFromTrello = function(bId, fName) {
  trello.getListsOnBoard(bId, function(err, lists) {
    
    var cardsByListName = {};
    lists.forEach(function(list) {
      trello.getCardsOnList(list.id).then(function(cards) {
        cards = cards.map(function(card) {
          return card.name;
        });
        cardsByListName[list.name] = cards;
        if (_.keys(cardsByListName).length === lists.length) {
          
          console.log(_.zip.apply(null, _.values(cardsByListName)));
          // console.log(_.zip());
          csv.stringify(_.zip.apply(null, _.values(cardsByListName)), {
              header: true,
              columns: _.keys(cardsByListName)
            },
            function(err, output) {
              // save output to csv
              console.log(output);
              fs.writeFileSync(fName, output);
          });
        }
        
      }, console.log);
    });

  });
};

return {
  'u': uploadToTrello,
  'd': downloadFromTrello
}[opFlag](boardId, csvName);
