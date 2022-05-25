class forecastPollutionInfo:
    #Constructor     
    def __init__(self, location_name: str = None, date_day_info: str = None, pollutant: str = None, pollutant_avg: int = None, pollutant_max: int = None, pollutant_min: int = None):
        
        self.location_name = location_name
        self.date_day_info = date_day_info
        self.pollutant = pollutant
        self.pollutant_avg = pollutant_avg 
        self.pollutant_max = pollutant_max
        self.pollutant_min = pollutant_min

        #Getters
        def location_name(self) -> str:
            return self.location_name
        
        def date_day_info(self) -> str:
            return self.date_day_info
        
        def pollutant(self) -> str:
            return self.pollutant
        
        def pollutant_avg(self) -> int:
            return self.pollutant_avg
        
        def pollutant_max(self) -> int:
            return self.pollutant_max
        
        def pollutant_min(self) -> int:
            return self.pollutant_min
