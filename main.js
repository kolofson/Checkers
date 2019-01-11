// JavaScript Document

//global variables
var getId, piece, kid, kid_id, pieceSelected;

//page startup
$(document).ready(function() {
	
	"use strict";
    
	$(".redChecker").addClass("hover");
});

//GAME FUNCTIONS
function completeTurn(piece, nextSpot) {
	
	"use strict";
	//remove piece from old spot
	var self = $("#" + piece).detach();
	
	nextSpot = nextSpot + "Aligner";
	$(self).css("borderColor", "red");
	$(self).appendTo($("#" + nextSpot));
}

function matchValue(letter) {
	
	"use strict";
	
	//match letter1 for numeric value
	var key = Object.keys(alphabet);
	var getLetterInt;
	
	for(var i = 0; i < key.length; i++) {
		
		var checkLetter = key[i];

		if (letter === checkLetter) {

			getLetterInt = Object.values(alphabet)[i];
			break;
		}

		else {

			continue;
		}
		
	} 
	
	return getLetterInt;
}

//setup letters with numeric values
var alphabet = {
					A: 1,
					B: 2,
					C: 3,
					D: 4,
					E: 5,
					F: 6,
					G: 7,
					H: 8
          		};

//function to choose a piece to move
function chooseMove(event) {

	"use strict";
	
	getId = event.target.id;

	//check if piece was already selected to deselect
	if (document.getElementById(getId).style.borderColor === "yellow") {
		
		document.getElementById(getId).style.borderColor = "black";	
	}
	//otherwise select piece
	else {
		
		document.getElementById(getId).style.borderColor = "yellow";
	}
	
	
	$("td").addClass("hover");
	$("#msg").html("Choose a spot to move to");
	$("td").attr("onClick", "movePiece(event)");
}

//function to move the piece that was selected
function movePiece(event) {
	
	"use strict";
	
	var nextSpot = event.target.id;
	var nextSpotId = nextSpot;
	nextSpot = $("#" + nextSpot);
	nextSpot = nextSpot.attr("id");
	
	//grab global var - what piece was clicked
	var piece = getId;
	
	//get currentSpot for clicked piece 
	var currentSpot = $("#" + piece).parent();
	currentSpot = currentSpot.parent().attr("id");
	
	//get values for new and old spots to check for invalid moves
	var getLetter1 = currentSpot.charAt(0);
	var getNumber1 = currentSpot.charAt(1);
	getNumber1 = parseInt(getNumber1);
	var getLetter2 = nextSpot.charAt(0);
	var getNumber2 = nextSpot.charAt(1);
	getNumber2 = parseInt(getNumber2);
	
	//set letters to have numeric values
	var spot1 = matchValue(getLetter1);
	var spot2 = matchValue(getLetter2);
	
	//check if valid move
	//check if NOT backwards on board via Letter
	if (spot1 < spot2) {
		
		var spot1a = getNumber1 + 1;
		var spot1b = getNumber1 - 1;
		
		//check if NOT backwards & is a valid forward move via numeric
		if (getNumber2 === spot1a || getNumber2 === spot1b) {
			
			//check if spot is already taken
			var nextSpotAlignerId = $("#" + nextSpotId + "Aligner").attr("id");
			//check if it has a child checker piece
			var x = document.getElementById(nextSpotAlignerId).firstChild;
			//check if spot has a checker piece already
			if (x) {
				
				$("#msg").html("Spot Taken, Try Again");
				
			}
			//otherwise continue game
			else {
				
				completeTurn(piece, nextSpot);
				$("#msg").html("Computer's Turn");
				$("td").removeClass("hover");
				$(".redChecker").removeClass("hover");
				computerTurn();
			}

		}
		
		/**NEED TO IMPLEMENT CHECK FOR WHEN KING'D 
		
		//move backwards if & only if king'd
		else if () {
				 
		}
		**/
		
		else {
			
			$("#msg").html("Not a valid move, Try Again");
		}
	}
	
}

function computerTurn() {
	
	"use strict";
	//check whole board top down for pieces A to H
	var getRow, row, rowLetter, didFind = false;
	
	//match letter and get next letter
	var letters = Object.keys(alphabet);
	var letterLoc;
	
	//iterate through row (letters)
	for (var y = 0; y < letters.length; y++) {
		
		if (y === 0) {
			
			getRow = document.getElementById("row_A");
			row = $(getRow).attr("id");
			rowLetter = row.charAt(row.length - 1);
		}
		
		else {
			
			//find the index of old letter
			for (var look = 0; look < letters.length; look++) {
				
				if (letters[look] === rowLetter) {
					
					letterLoc = alphabet[rowLetter];
					
					if (letterLoc < (letters.length)) {
						
						letterLoc++;

					}
					
					else {
						
						letterLoc = 0;

					}
				}
			}
			
			var nextRowLetter = letters[letterLoc - 1];
			var getRowStr = row.toString();
			getRowStr = getRowStr.substring(0, 4) + nextRowLetter;
			getRow = document.getElementById(getRowStr);
			console.log(getRow);
			
		}
		//iterate through all boxes based on letter
		for (var i = 0; i < getRow.cells.length; i++) {
		
			var box = getRow.cells[i];

			//check if black square (class == odd || even(black))
			if ($(box).hasClass("even")) {

				var parent = $(box).attr("id") + "Aligner";
				//check if there is a piece in the spot 
				if (document.getElementById(parent).firstChild) {
					
					kid = document.getElementById(parent).firstChild;
					kid_id = $(kid).attr("id");
					piece = kid_id[0];
				}
				
				else {
					
					console.log("no piece here");
				}
			
				if (piece === "w") {

					console.log("cpu piece!");
					didFind = true;	
					pieceSelected = document.getElementById(kid_id);
					pieceSelected = $(pieceSelected).attr("id");
					
					//check if selected piece can move
					
				}

				else {
					//red piece
					console.log("player piece");
				}
				
				if (didFind === true) {
					
					break;
				}
			} //end of checking valid game square
			
			else {
				
				console.log("not a spot");
			}
		
		} //end row check
		
		if (didFind === false) {
			
			if (rowLetter === letters[y]) {
			
				letterLoc = y + 1;
			
			}
		
			rowLetter = letters[y];
		}
		
		else {
			
			break;
		}
		
	} //end change row loop
	
	//if both options --- then check rows further up for AI (do random for testing)
	

}
