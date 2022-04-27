import yagmail

def send_game_email(dest, username, joinee, game_name, game_id):
    yag = yagmail.SMTP('pickupsports22@gmail.com')
    yag.send(dest, subject='Pickup - A user has joined your game!', contents= 
    f"""
    Hello {username},

    {joinee} has joined your game: <a href={game_id}>{game_name}</a>

    <a href='https://cnn.com'>Update Notification Settings</a>
    """)
