SCRIPT_NO_CALLABLE :str = "this script cannot be called"

def run(fig):
    """
    Run the dash server
    @param fig
    """
    # fig = go.Figure() # or any Plotly Express function e.g. px.bar(...)
    # # fig.add_trace( ... )
    # # fig.update_layout( ... )


    app = dash.Dash()
    app.layout = html.Div([
        dcc.Graph(figure=fig)
    ])

    app.run_server(debug=True, use_reloader=False)

def get_figure(data_frame):
    """
    the function receives a df and it returns the figure
    @param data_frame
    @return figure
    """
    fig = px.scatter_geo(data_frame, locations="iso_alpha", color="continent",
                        hover_name="country", size="pop",
                        animation_frame="year",
                        projection="natural earth")
    return fig

if __name__ == "__main__":
    import dash
    import dash_core_components as dcc
    import dash_html_components as html
    import plotly.express as px

    df = px.data.gapminder()
    run(get_figure(df))
else:
    print (SCRIPT_NO_CALLABLE)
