"""Module in charge of executing the interactive map server"""
import sys
import dash
import dash_core_components as dcc
import dash_html_components as html
import plotly.express as px

SCRIPT_NO_CALLABLE: str = "this script cannot be called"


def run():
    """
    Run the dash server
    """

    data_frame = px.data.gapminder()
    fig = get_figure(data_frame)

    app = dash.Dash()
    app.layout = html.Div([dcc.Graph(figure=fig)])

    app.run_server(debug=True, port=sys.argv[1], host=sys.argv[2], use_reloader=False)


def get_figure(data_frame):
    """
    the function receives a df and it returns the figure
    @param data_frame
    @return figure
    """
    fig = px.scatter_geo(
        data_frame,
        locations="iso_alpha",
        color="continent",
        hover_name="country",
        size="pop",
        animation_frame="year",
        projection="natural earth",
    )
    return fig


if __name__ == "__main__":
    run()
else:
    print(SCRIPT_NO_CALLABLE)
