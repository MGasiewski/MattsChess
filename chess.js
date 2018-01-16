var whitePieces = {"pawn":"♙", "knight": "♘", "bishop": "♗", "rook": "♖", "queen": "♕", "king": "♔"};
var blackPieces = {"pawn":"&#9823;", "knight": "&#9822;", "bishop": "&#9821;", "rook": "&#9820;", "queen": "&#9819;", "king": "&#9818;"};

$(document).ready(function(){
    activateHighlighting();
});

function activateHighlighting(){
    $(".black").mouseenter(function(){$(this).css("background-color", "FFFF00")});
    $(".black").mouseleave(function(){$(this).css("background-color", "999")});

    $(".white").mouseenter(function(){$(this).css("background-color", "FFFF00")});
    $(".white").mouseleave(function(){$(this).css("background-color", "FFF")});
}

function deactivateHighlighting(){
    $(".black, .white").unbind();
}

function attachCallbacks(){
    $(".black, .white").filter(function(){
        return $(this).text() === whitePieces["pawn"];
    }).each(function(){
        $(this).click(attachPawnCallback(this));
    });
}

function attachPawnCallback(pawn){
    $(pawn).click(function(){
        var position = $(pawn).attr("id");
        var possibleMoves = [];
        var y = parseInt(pawn[1]);
        if(position[1]==='2'){
            y += 2;
            var potentialMove = position[0] + String(y);
            if($("#" + potentialMove).val() === ""){
                possibleMoves.push(potentialMove);
            }
        }else{
            y += 1;
            var potentialMove = position[0] + String(y);
            if($("#" + potentialMove).val() === "" && y <= 8){
                possibleMoves.push(possibleMove);
            }
        }
    });
}

function attachKnightCallback(){}

function attachQueenCallback(){}

function attachKingCallback(){}

function attachBishopCallback(){}