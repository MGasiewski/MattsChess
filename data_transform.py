import csv
from game_model import GameModel
from board import Board

games = []
WHITE = "white"
BLACK = "black"

with open('games.csv') as csvfile:
    gamereader = csv.reader(csvfile)
    for row in gamereader:
        game = GameModel(row)
        games.append(game)

for game in games:
    white_turn = True
    board = Board()
    moves = game.moves.split(" ")
    for move in moves:
        if white_turn:
            board.execute_move(move, WHITE, True)
        else:
            board.execute_move(move, BLACK, True)