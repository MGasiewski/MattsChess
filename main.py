from flask import Flask, request, render_template
from board import Board

app = Flask(__name__)

@app.route("/MattsChess")
def matts_chess_app():
    return render_template("chess.html")

@app.route("/move")
def move():
    board_json = request.args.get("board")
    current_board = Board(board_json)

if __name__ == '__main__':
    app.run()
