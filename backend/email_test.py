import yagmail

def main():
    #yagmail.register('pickupsorts22@gmail.com', 'thep@ssword123')
    
    yag = yagmail.SMTP('pickupsports22@gmail.com')
    yag.send('jbuckle2@nd.edu', 'Hellooooo :D', 'Thank you for registering, etc.')
    

if __name__ == '__main__':
    main()