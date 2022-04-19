import yagmail

def main():
    yag = yagmail.SMTP('pickupsports22', 'thep@ssword123')
    yag.send('shayden2@nd.edu', 'Hello from Pickup Sports', 'Thank you for registering, etc.')


if __name__ == '__main__':
    main()