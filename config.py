
class Config(object):
    DEBUG = True
    TESTING = False

class DevelopmentConfig(Config):
    OPENAI_KEY = 'place your key here'

config = {
    'development': DevelopmentConfig,
    'testing': DevelopmentConfig,
    'production': DevelopmentConfig
}
