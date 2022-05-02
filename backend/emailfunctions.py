import yagmail

def send_game_email(dest, username, joinee, game_name, game_id):
    yag = yagmail.SMTP('pickupsports22@gmail.com', 'thep@ssword123')
    yag.send(dest, subject='Pickup - A user has joined your game!', contents= 
    f"""
    Hello {username},

    {joinee} has joined your game: <a href=http://52.87.107.120:8802/game/{game_id}>{game_name}</a>

    - Pickup Sports

    <a href='http://52.87.107.120:8802/profile'>Update Notification Settings</a>
    """)

def send_team_email(dest, username, joinee, team_name, team_id):
    yag = yagmail.SMTP('pickupsports22@gmail.com', 'thep@ssword123')
    yag.send(dest, subject='Pickup - A spot has opened up!', contents= 
    f"""
    Hello {username},

    {joinee} has joined your team: <a href={team_id}>{team_name}</a>

    - Pickup Sports

    <a href='http://52.87.107.120:8802/profile'>Update Notification Settings</a>
    """)

def send_waitlist_email(dest, game_name):
    yag = yagmail.SMTP('pickupsports22@gmail.com', 'thep@ssword123')
    yag.send(dest, subject='Pickup - A spot opened from your waitlist!', contents= 
    f"""
    Hello,

    A spot has opened up for the following game: {game_name} 
    
    Click <a href='http://52.87.107.120:8802/games'>here</a> to log in and snag a spot!

    - Pickup Sports

    <a href='http://52.87.107.120:8802/profile'>Update Notification Settings</a>
    """)

def send_cancel_email(dest, game_name):
    yag = yagmail.SMTP('pickupsports22@gmail.com', 'thep@ssword123')
    yag.send(dest, subject='Pickup - A game has been canceled...', contents= 
    f"""
    Hello,

    The following game has been canceled by its' creator: {game_name}.

    - Pickup Sports

    <a href='http://52.87.107.120:8802/profile'>Update Notification Settings</a>
    """)


def send_edit_email(dest, game_name, game_id):
    yag = yagmail.SMTP('pickupsports22@gmail.com', 'thep@ssword123')
    yag.send(dest, subject='Pickup - A game has been edited.', contents= 
    f"""
    Hello,

    The following game has been edited by its' creator: {game_name}.
    Check it out <a href='http://52.87.107.120:8802/game/{game_id}'>Here</a>

    - Pickup Sports

    <a href='http://52.87.107.120:8802/profile'>Update Notification Settings</a>
    """)