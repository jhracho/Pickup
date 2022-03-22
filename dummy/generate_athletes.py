from random import randint
from hashlib import md5


def _username(first_name, last_name):
    return first_name[0].lower() + last_name.lower()


class Athlete:
    def __init__(self, _id, first_name, last_name, username):
        self.id = _id
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password_hash = md5(b'password').hexdigest()
        self.football_select = randint(0, 1)
        self.golf_select = randint(0, 1)
        self.basketball_select = randint(0, 1)
        self.soccer_select = randint(0, 1)
        self.other_select = randint(0, 1)

    def _write(self, o):
        o.write(f'{self.id},"{self.first_name}","{self.last_name}","{self.username}",{self.password_hash},{self.football_select},{self.golf_select},{self.basketball_select},{self.soccer_select},{self.other_select}\n')


def main():
    num = 200
    first_names = [
        'Alice',
        'Bob',
        'Chris',
        'Dalton',
        'Emily',
        'Fred',
        'Genny',
        'Hayden',
        'Isaac',
        'Jared',
        'Kelvin',
        'Lucy',
        'Mary',
        'Nancy',
        'Olivia',
        'Parker',
        'Quinn',
        'Riley',
        'Sebastian',
        'Taylor',
        'Uriel',
        'Victoria',
        'Willow',
        'Xavier',
        'Yusef',
        'Zoey'
    ]
    last_names = [
        'Smith',
        'Johnson',
        'Williams',
        'Brown',
        'Jones',
        'Garcia',
        'Miller',
        'Davis',
        'Rodriguez',
        'Martinez',
        'Hernandez',
        'Lopez',
        'Gonzalez',
        'Wilson',
        'Anderson',
        'Thomas',
        'Taylor',
        'Moore',
        'Jackson',
        'Martin',
        'Lee',
        'Perez',
        'Thompson',
        'White',
        'Harris',
        'Sanchez',
        'Clark',
        'Ramirez',
        'Lewis',
        'Robinson',
        'Walker',
        'Young',
        'Allen',
        'King',
        'Wright',
        'Scott',
        'Torres',
        'Nguyen',
        'Hill',
        'Flores'
    ]
    usernames = []
    _id = 0

    o = open('data/athletes.csv', 'w')
    for _ in range(num):
        username = ''
        while True:
            first_name = first_names[randint(0, len(first_names) - 1)]
            last_name = last_names[randint(0, len(last_names) - 1)]
            username = _username(first_name, last_name)
            if username not in usernames:
                break
        athlete = Athlete(_id, first_name, last_name, username)
        athlete._write(o)
        usernames.append(username)
        _id = _id + 1
    o.close()


if __name__ == '__main__':
    main()
