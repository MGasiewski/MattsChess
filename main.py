from flask import Flask, request, send_from_directory

app = Flask(__name__)

@app.route("/MattsChess")
def mattsChessApp():
    return app.send_static_file('chess.html')

@app.route("/move", methods=['GET'])
def move():
    return "insert move here"

