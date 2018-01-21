var whitePieces = {"pawn":"♙", "knight": "♘", "bishop": "♗", "rook": "♖", "queen": "♕", "king": "♔"};
var blackPieces = {"pawn":"♟", "knight": "♞", "bishop": "♝", "rook": "♜", "queen": "♛", "king": "♚"};
var liftedPieces = {};
var qsRookHasMoved = false;
var ksRookHasMoved = false;
var kingHasMoved = false;


$(document).ready(function(){
    activateHighlighting();
    attachCallbacks();
    bindEscape();
    $("#no_moves").hide();
});

function bindEscape(){
    $(document).keyup(function(e){
        if(e.keyCode === 27){
            deactivateCallbacks();
            activateHighlighting();
            attachCallbacks();
            clearXs();
            placePieces();
        }
    });
}

function activateHighlighting(){
    $(".black, .white").filter(function(){
        var piece = $(this).text();
        return Object.values(whitePieces).includes(piece);
    }).each(function(){
        $(this).mouseenter(function(){$(this).css("background-color", "FFFF00")});
        var tileColor = $(this).attr("class");
        if(tileColor === "black"){
            $(this).mouseleave(function(){$(this).css("background-color", "#999")});
        }else{
            $(this).mouseleave(function(){$(this).css("background-color", "#FFF")});
        }
        $(this).css("cursor", "pointer");
    })
}

function deactivateCallbacks(){
    $(".black, .white").unbind();
}

function attachCallbacks(){
    $(".black, .white").filter(function(){
        return $(this).text() === whitePieces["pawn"];
    }).each(function(){
        attachPawnCallback(this);
    });

    $(".black, .white").filter(function(){
        return $(this).text() === whitePieces["knight"];
    }).each(function(){
        attachKnightCallback(this);
    });

    $(".black, .white").filter(function(){
        return $(this).text() === whitePieces["bishop"];
    }).each(function(){
        attachBishopCallback(this);
    });

    $(".black, .white").filter(function(){
        return $(this).text() === whitePieces["king"];
    }).each(function(){
        attachKingCallback(this);
    });

    $(".black, .white").filter(function(){
        return $(this).text() === whitePieces["rook"];
    }).each(function(){
        attachRookCallback(this);
    });

    $(".black, .white").filter(function(){
        return $(this).text() === whitePieces["queen"];
    }).each(function(){
        attachQueenCallback(this);
    });
    evaluateForCastling();
}

function evaluateForCastling(){
    if(!qsRookHasMoved && !kingHasMoved){
        let tileOne = $("#10").text();
        let tileTwo = $("#20").text();
        let tileThree = $("#30").text();
        if(tileOne === "" && tileTwo === "" && tileThree === ""){
            $("#qs_castle").show();
            $("#qs_castle").click(qsCastle);
        }else{
            $("#qs_castle").hide();
        }
    }else{
        $("#qs_castle").hide();
    }
    if(!ksRookHasMoved && !kingHasMoved){
        let tileOne = $("#50").text();
        let tileTwo = $("#60").text();
        if(tileOne === "" && tileTwo === ""){
            $("#ks_castle").show()
            $("#ks_castle").click(ksCastle);
        }else{
            $("#ks_castle").hide();
        }
    }else{
        $("#ks_castle").hide();
    }
}

function executeMove(piece, move){
    if($(piece).attr("id")==="00"){
        qsRookHasMoved = true;
    }

    if($(piece).attr("id")==="40"){
        kingHasMoved = true;
    }
    if($(piece).attr("id")==="70"){
        ksRookHasMoved = true;
    }
    var pieceChar = $(piece).text();
    $(piece).text("");
    $("#"+move).text(pieceChar);
    var color = $(piece).attr("class") === "black" ? "#999" : "#FFF";
    $(piece).css("background-color", color);
}

function clearXs(){
    $(".black, .white").filter(function(){
        return $(this).text() === "X";
    }).each(function(){
        $(this).text("");
    });
}

function displayNoMovesMessage(){
    $("#no_moves").show();
    $("#no_moves").delay(2000).fadeOut();
}

function placePieces(move){
    var iteratedItems = []
    if(liftedPieces[move]){
        delete liftedPieces[move];
    }
    for(var item in liftedPieces){
        $("#"+item).text(liftedPieces[item]);
        iteratedItems.push(item);
    }
    for(let obj of iteratedItems){
        delete liftedPieces[obj];
    }
}

function markMove(piece, move){
    var tileOccupant = $("#"+move).text();
    if(Object.values(blackPieces).includes(tileOccupant)){
        liftedPieces[move] = tileOccupant;
    }
    $("#"+move).text("X");
    $("#"+move).click(function(){
        executeMove(piece, move);
        deactivateCallbacks();
        activateHighlighting();
        attachCallbacks();
        clearXs();
        placePieces(move);
    });
}

function qsCastle(){
    deactivateCallbacks();
    $("#40").text("");
    $("#00").text("");
    $("#20").text(whitePieces["king"]);
    $("#30").text(whitePieces["rook"]);
    kingHasMoved = true;
    qsRookHasMoved = true;
    activateHighlighting();
    attachCallbacks();
}

function ksCastle(){
    deactivateCallbacks();
    $("#40").text("");
    $("#70").text("");
    $("#60").text(whitePieces["king"]);
    $("#50").text(whitePieces["rook"]);
    kingHasMoved = true;
    ksRookHasMoved = true;
    activateHighlighting();
    attachCallbacks();
}

function attachPawnCallback(pawn){
    $(pawn).click(function(){
        var position = $(pawn).attr("id");
        var possibleMoves = [];
        var y = parseInt(position[1]);
        if(y === 1){
            var destY = y + 2;
            var potentialMove = position[0] + String(destY);
            if($("#" + potentialMove).text() === ""){
                possibleMoves.push(potentialMove);
            }
        }
        var destY2 = y + 1;
        var potentialMove = position[0] + String(destY2);
        if($("#" + potentialMove).text() === "" && y <= 8){
                possibleMoves.push(potentialMove);
        }
        var rightDiag = String(parseInt(position[0])+1) + String(parseInt(position[1])+1);
        var leftDiag = String(parseInt(position[0]-1)) + String(parseInt(position[1])+1);
        if(Object.values(blackPieces).includes($("#"+rightDiag).text())){
            possibleMoves.push(rightDiag);
        }
        if(Object.values(blackPieces).includes($("#"+leftDiag).text())){
            possibleMoves.push(leftDiag);
        }
        if(possibleMoves.length === 0){

            return;
        }else{
            deactivateCallbacks();
            var piece = this;
            for(let move of possibleMoves){
                markMove(piece, move);
            }
        }
    });
}

function knightKingFilter(move){
    if(move[0] === "-" || move[1] === "-" || move[2] === "-"){
        return false;
    }
    if(parseInt(move[0]) < 0 || parseInt(move[0]) > 7){
        return false;
    }
    if(parseInt(move[1]) < 0 || parseInt(move[1]) > 7){
        return false;
    }
    var piece = $("#"+move).text();
    if(Object.values(whitePieces).includes(piece)){
        return false;
    }
    return true;
}

function attachKnightCallback(knight){
        $(knight).click(function(){
        var position = $(knight).attr("id");
        var possibleMoves = [];
        var x = parseInt(position[0]);
        var y = parseInt(position[1]);
        possibleMoves.push(String(x+2)+String(y+1));
        possibleMoves.push(String(x+1)+String(y+2));
        possibleMoves.push(String(x+2)+String(y-1));
        possibleMoves.push(String(x+1)+String(y-2));
        possibleMoves.push(String(x-1)+String(y+2));
        possibleMoves.push(String(x-2)+String(y+1));
        possibleMoves.push(String(x-1)+String(y-2));
        possibleMoves.push(String(x-2)+String(y-1));
        var finalMoves = possibleMoves.filter(knightKingFilter);
        if(finalMoves.length === 0){
            displayNoMovesMessage();
            return;
        }else{
            deactivateCallbacks();
            var piece = this;
            for(let move of finalMoves){
                markMove(piece, move);
            }
        }
    });
}

function attachQueenCallback(queen){
    $(queen).click(function(){
        var position = $(queen).attr("id");
        var finalMoves = [];
        var x = parseInt(position[0]);
        var y = parseInt(position[1]);
        finalMoves = finalMoves.concat(directionalMoves(x, y, 1, 1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, 1, -1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, -1, -1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, -1, 1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, 1, 0));
        finalMoves = finalMoves.concat(directionalMoves(x, y, 0, -1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, -1, 0));
        finalMoves = finalMoves.concat(directionalMoves(x, y,  0, 1));
        if(finalMoves.length === 0){
            displayNoMovesMessage();
            return;
        }else{
            deactivateCallbacks();
            var piece = this;
            for(let move of finalMoves){
                markMove(piece, move);
            }
        }
    });
}

function attachKingCallback(king){
    $(king).click(function(){
        var position = $(king).attr("id");
        var possibleMoves = [];
        var x = parseInt(position[0]);
        var y = parseInt(position[1]);
        possibleMoves.push(String(x+1)+String(y));
        possibleMoves.push(String(x+1)+String(y+1));
        possibleMoves.push(String(x+1)+String(y-1));
        possibleMoves.push(String(x-1)+String(y));
        possibleMoves.push(String(x-1)+String(y+1));
        possibleMoves.push(String(x-1)+String(y-1));
        possibleMoves.push(String(x)+String(y-1));
        possibleMoves.push(String(x)+String(y+1));
        var finalMoves = possibleMoves.filter(knightKingFilter);
        if(finalMoves.length === 0){
            displayNoMovesMessage();
            return;
        }else{
            deactivateCallbacks();
            var piece = this;
            for(let move of finalMoves){
                markMove(piece, move);
            }
        }
    });
}

function directionalMoves(x, y, xInc, yInc){
    var capturedPiece = false;
    var x2 = x+xInc;
    var y2 = y+yInc;
    var moves = [];
    while(true){
        if(capturedPiece){
            break;
        }
        if(x2 >= 8 || x2 < 0){
            break;
        }
        if(y2 >= 8 || y2 < 0){
            break;
        }
        var current = $("#" + String(x2) + String(y2)).text();
        if(Object.values(whitePieces).includes(current)){
            break;
        }
        if(Object.values(blackPieces).includes(current)){
            capturedPiece = true;
        }
        moves.push(String(x2) + String(y2));
        x2 = x2 + xInc;
        y2 = y2 + yInc;
    }
    return moves;
}

function attachBishopCallback(bishop){
    $(bishop).click(function(){
        var position = $(bishop).attr("id");
        var finalMoves = [];
        var x = parseInt(position[0]);
        var y = parseInt(position[1]);
        finalMoves = finalMoves.concat(directionalMoves(x, y, 1, 1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, 1, -1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, -1, -1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, -1, 1));
        if(finalMoves.length === 0){
            displayNoMovesMessage();
            return;
        }else{
            deactivateCallbacks();
            var piece = this;
            for(let move of finalMoves){
                markMove(piece, move);
            }
        }
    });
}

function attachRookCallback(rook){
    $(rook).click(function(){
        var position = $(rook).attr("id");
        var finalMoves = [];
        var x = parseInt(position[0]);
        var y = parseInt(position[1]);
        finalMoves = finalMoves.concat(directionalMoves(x, y, 1, 0));
        finalMoves = finalMoves.concat(directionalMoves(x, y, 0, -1));
        finalMoves = finalMoves.concat(directionalMoves(x, y, -1, 0));
        finalMoves = finalMoves.concat(directionalMoves(x, y,  0, 1));
        if(finalMoves.length === 0){
            displayNoMovesMessage();
            return;
        }else{
            deactivateCallbacks();
            var piece = this;
            for(let move of finalMoves){
                markMove(piece, move);
            }
        }
    });
}