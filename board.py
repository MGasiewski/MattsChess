import json
from game_model import GameModel

CHESS_LETTERS = "abcdefgh"
CHESS_PIECE_NOTATION = {"king": "K", "queen": "Q", "rook": "R", "bishop": "B", "knight": "N"}
BLACK_CHESS_CHARACTERS = {"king": '♚', "queen": '♛', "rook": '♜', "bishop": '♝', "knight": '♞', "pawn": '♟'}
WHITE_CHESS_CHARACTEWS = {"king": '♔', "queen": '♕', "rook": '♖', "bishop": '♗', "knight": '♘', "pawn": '♙'}

class Board:

    def __init__(self, game_json=None):
        rank = ['' for i in range(8)]
        if game_json == None:
            self.board = [rank for i in range(8)]
            #set black pawns
            for i in range(8):
                self.board[i][6] = '♟'
            #set black pieces
            self.board[0][7] = '♜'
            self.board[1][7] = '♞'
            self.board[2][7] = '♝'
            self.board[3][7] = '♛'
            self.board[4][7] = '♚'
            self.board[5][7] = '♝'
            self.board[6][7] = '♞'
            self.board[7][7] = '♜'
            #set white pawns
            for i in range(8):
                self.board[i][1] = '♙'
            #set white pieces
            self.board[0][0] = '♖'
            self.board[1][0] = '♘'
            self.board[2][0] = '♗'
            self.board[3][0] = '♕'
            self.board[4][0] = '♔'
            self.board[5][0] = '♗'
            self.board[6][0] = '♘'
            self.board[7][0] = '♖'
    
    def parse_json_board(self, json_board: str):
        pass

    def get_indices_of(self, piece_char: str, player: str) -> list:
        pass

    def decode_move(self, move: str, player: str):
        if move[0] in CHESS_LETTERS: 
            pass 
        elif move[0] == CHESS_PIECE_NOTATION["knight"]:
            indices = self.get_indices_of(move[0], player)
        elif move[0] == CHESS_PIECE_NOTATION["king"]:
            pass
        elif move[0] == CHESS_PIECE_NOTATION["queen"]:
            pass
        elif move[0] == CHESS_PIECE_NOTATION["bishop"]:
            pass
        elif move[0] == CHESS_PIECE_NOTATION["rook"]:
            pass
        return ""

    def execute_move(self, move: str, player: str, algebraic_notation=False):
        if algebraic_notation:
            move = self.decode_move(move, player)

