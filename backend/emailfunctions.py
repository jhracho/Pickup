import yagmail

def send_game_email(dest, username, joinee, game_name, game_id):
    yag = yagmail.SMTP('pickupsports22@gmail.com')
    yag.send(dest, subject='Pickup - A user has joined your game!', contents= 
    f"""
    Hello {username},

    {joinee} has joined your game: <a href={game_id}>{game_name}</a>

    - Pickup Sports

    <a href='https://cnn.com'>Update Notification Settings</a>
    """)

def send_team_email(dest, username, joinee, team_name, team_id):
    yag = yagmail.SMTP('pickupsports22@gmail.com')
    yag.send(dest, subject='Pickup - A spot has opened up!', contents= 
    f"""
    Hello {username},

    {joinee} has joined your team: <a href={team_id}>{team_name}</a>

    - Pickup Sports

    <a href='https://cnn.com'>Update Notification Settings</a>
    """)

def send_waitlist_email(dest, game_name):
    yag = yagmail.SMTP('pickupsports22@gmail.com')
    yag.send(dest, subject='Pickup - A spot opened from your waitlist!', contents= 
    f"""
    Hello,

    A spot has opened up for the following game: {game_name} 
    
    Click <a href='https://cnn.com'>here</a> to log in and snag a spot!

    - Pickup Sports

    <a href='https://cnn.com'>Update Notification Settings</a>
    """)
