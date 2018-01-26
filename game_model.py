class GameModel:

    def __init__(self, csv_row):
        self.id = csv_row[0]
        self.last_move_at = csv_row[3]
        self.turns = csv_row[4]
        self.victory_status = csv_row[5]
        self.winner = csv_row[6]
        self.moves = csv_row[12]