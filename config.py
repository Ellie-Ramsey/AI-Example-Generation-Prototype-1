
class Config(object):
    DEBUG = True
    TESTING = False

class DevelopmentConfig(Config):
    OPENAI_KEY = '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'

config = {
    'development': DevelopmentConfig,
    'testing': DevelopmentConfig,
    'production': DevelopmentConfig
}
