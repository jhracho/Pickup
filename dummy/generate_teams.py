from random import randint


class Team:
    def __init__(self, _id, sport, team_name):
        self.team_id = _id
        self.sport = sport
        self.team_name = team_name
        self.roster_spots = randint(0, 10)

    def _write(self, o):
        o.write(
            f'{self.team_id},"{self.sport}","{self.team_name}",{self.roster_spots}\n')


def main():
    sports = ['Basketball', 'Golf', 'Football', 'Soccer', 'Volleyball']
    team_names = [
        'Hartford Yard Goats',
        'Indiana State Sycamores',
        'Montgomery Biscuits',
        'Hamilton Tiger-Cats',
        'Webster University Gorloks',
        'South Dakota State School of Mines Hardrockers',
        'Modesto Nuts',
        'Binghamton Rumble Ponies',
        'St. Bonaventure Bonnies',
        'Stony Brook Seawolves',
        'Clinton LumberKings',
        'Santa Cruz Banana Slugs',
        'Victorian Bushrangers',
        'Akron Zips',
        'Campbell Fighting Camels',
        'Jacksonville Jumbo Shrimp',
        'Thailand Tobacco Monopoly Football Club',
        'Scottsdale Community College Fighting Artichokes',
        'University of Missouri-Kansas City Kangaroos',
        'Wichita Wingnuts',
        'Traverse City Beach Bums',
        'Akron Rubberducks',
        'Presbyterian College Blue Hose',
        'Youngstown State Penguins',
        'Albuquerque Isotopes',
        'Richmond Flying Squirrels',
        'Montreal Alouettes',
        'Fort Wayne Mad Ants'
    ]

    o = open('data/teams.csv', 'w')
    for _id in range(0, len(team_names)):
        Team(_id, sports[randint(0, len(sports) - 1)],
             team_names[_id])._write(o)
    o.close()


if __name__ == '__main__':
    main()
