from random import randint
from datetime import datetime


class Game:
    def __init__(self, _id, sport):
        self.game_id = _id
        self.sport = sport
        dt = datetime.now()
        self.date = datetime.strftime(dt, '%d-%b-%y %I.%M.%S.%f')
        self.players_needed = randint(0, 10)
        if sport == 'Basketball':
            self.location_id = 0
        elif sport == 'Golf':
            self.location_id = 2
        else:
            self.location_id = 1

    def _write(self, o):
        o.write(
            f'{self.game_id},"{self.sport}","{self.date}",{self.players_needed},{self.location_id}\n')


def main():
    sports = ['Basketball', 'Golf', 'Football', 'Soccer', 'Volleyball']

    o = open('data/games.csv', 'w')
    for _id in range(50):
        Game(_id, sports[randint(0, len(sports) - 1)])._write(o)
    o.close()


if __name__ == '__main__':
    main()
