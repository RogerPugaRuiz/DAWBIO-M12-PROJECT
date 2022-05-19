class pollutionInfo:     
    def __init__(self, air_quality_level: int = None, dominant_pollution: str = None,
                 location_name: str = None, date_day_info: str = None, date_time_info: str = None,
                 latitude: float = None, longitude: float = None, pollutants_dict: dict = None):
        
        self.air_quality_level = air_quality_level
        self.dominant_pollution = dominant_pollution
        self.location_name = location_name
        self.date_day_info = date_day_info
        self.date_time_info = date_time_info    
        self.latitude = latitude
        self.longitude = longitude
        for key in pollutants_dict: 
            setattr(self, key, pollutants_dict[key])

        #Getter
        def air_quality_level(self) -> int:
            return self.air_quality_level
        
        def dominant_pollution(self) -> str:
            return self.dominant_pollution
        
        def location_name(self) -> str:
            return self.location_name
        
        def date_day_info(self) -> str:
            return self.date_day_info
        
        def date_time_info(self) -> str:
            return self.date_time_info
        
        def latitude(self) -> float:
            return self.latitude
        
        def longitude(self) -> float:
            return self.longitude
        
        def no2(self) -> float:
            return self.no2
        
        def pm10(self) -> float:
            return self.pm10
        
        def pm25(self) -> float:
            return self.pm25
        
        def co(self) -> float:
            return self.co
        
        def o3(self) -> float:
            return self.o3
        
        def so2(self) -> float:
            return self.so2
        
        def wg(self) -> float:
            return self.wg
        
        def dew(self) -> float:
            return self.dew
        
        def t(self) -> float:
            return self.t
        
        def w(self) -> float:
            return self.w
        
        def r(self) -> float:
            return self.r
        
        def p(self) -> float:
            return self.p
        
        def h(self) -> float:
            return self.h
    

        
        
    
        
        
        
        