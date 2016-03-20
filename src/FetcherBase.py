class FetcherBase(object):
    platformId = 0
    cinemasList = []
    data = []
    def __init__(self, *args, **kwargs):
        return super(FetcherBase, self).__init__(*args, **kwargs)

    def run(self):
        pass
