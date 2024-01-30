// I am laaaaaaaaaaaaazy.
function log(x) { return console.log(x); };

// Loads a specific (spreadsheet) link, then picks named (sheet page):
var sheet = SpreadsheetApp.openById("1o--vnasGJVcROXa7vOWRjmf-SgyWDtmZZCo2K7WPiZg").getSheetByName("Sheet1");

// Returns one cell value
function readValue(cell) {
  let response = sheet.getRange(cell).getValues();
  return response[0][0]; // String
};

// Targets a specific cell range, currently expecting a String format (Ex.: "A1:A2")
function getCellsValues(cell) { return sheet.getRange(cell); };

// Returns a object with 2 values inside: 24 hours/military pattern minutes and hour (Ex.: "04" and "20" if time is 04:20am)
function generateDate() {
  let dH = new Date().toString().split(" ");
  let response = {
    minute: dH[4].split(":")[1],
    hour: dH[4].split(":")[0]
  };

  return response;
};

// Main purpose of this script. Pronks the tables.
// Wipes multiple data from the spreadsheet using ".clearContent()":
// This function heavily relies on user input inside spreadsheet.
// Source of targeted cells are here: 
// https://docs.google.com/spreadsheets/d/1o--vnasGJVcROXa7vOWRjmf-SgyWDtmZZCo2K7WPiZg/edit#gid=0&range=B28
function pronkers() {
  getCellsValues(readValue("B27")).clearContent(); // Valentine
  getCellsValues(readValue("C27")).clearContent(); // Red
  getCellsValues(readValue("D27")).clearContent(); // Carus
  getCellsValues(readValue("E27")).clearContent(); // Vaux
  getCellsValues(readValue("F27")).clearContent(); // Bacon
};

// Functions to time check correct time to run the script.
function disparoAutomatico() {
  let hour = "21"
  let date = generateDate(); // {hour: integer\0-24}
  let time = `${date.hour}:${date.minute}`;

  if (hour == date.hour) {
    if (date.minute == "00") {
      log(`Running execution @${time}...`);
      pronkers();
    }
  } else { log(`Execution @${time} ignored.`); };
};