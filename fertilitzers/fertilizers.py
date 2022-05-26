import pandas as pd

def clean_data(fertilizers_pesticides: pd.DataFrame) ->pd.DataFrame: 
    clean = fertilizers_pesticides.fillna(0)
    return clean


def get_total_fertilizers(fertilizers_pesticides: pd.DataFrame) -> pd.DataFrame:

    total_fertilizers = fertilizers_pesticides[fertilizers_pesticides['short names'].str.contains('total_fertilizers')]

    return total_fertilizers


def get_total_pesticides(fertilizers_pesticides: pd.DataFrame) -> pd.DataFrame:

    total_pesticides = fertilizers_pesticides[fertilizers_pesticides['short names'].str.contains('total_pesticides_use')]

    return total_pesticides


def convert_tsv(fertilizers: pd.DataFrame, pesticides: pd.DataFrame):

    fertilizers.to_csv('data/fertilizers.tsv',sep="\t")
    pesticides.to_csv('data/pesticides.tsv',sep="\t")




# Main
# -----------------------------------------------------------------------------
if __name__ == "__main__":

    fertilizers_pesticides: pd.DataFrame = pd.read_csv("data/CW_Agriculture_pesticides_fertilizers.csv", sep=",")
    clean_fertilizers_pesticides: pd.DataFrame = clean_data(fertilizers_pesticides)
    t_fertilizers:  pd.DataFrame = get_total_fertilizers(clean_fertilizers_pesticides)
    t_pesticides:  pd.DataFrame = get_total_pesticides(clean_fertilizers_pesticides)
    convert_tsv(t_fertilizers,t_pesticides)

    print(t_fertilizers)



# -----------------------------------------------------------------------------