from src import create_app

app = create_app()

mode = 'debug'

if __name__ == '__main__':
    if mode == 'debug':
        app.run(debug=True)
    else:
        app.run()