var width = document.getElementById('vis')
    .clientWidth;
var height = document.getElementById('vis')
    .clientHeight;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
}
// var vis = d3.slider().min(1961).max(2015).ticks(20).showRange(true).value(6);

// var slider = d3.slider().min(1961).max(2015).ticks(10).showRange(true).value(1999);
// // // Render the slider in the div
// d3.select('#slider').call(slider);



var svg = d3.select('#vis')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var data = {};

var x_scale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y_scale = d3.scaleLinear()
    .range([height, 0]);

var colour_scale = d3.scaleQuantile()
    .range(["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

var y_axis = d3.axisLeft(y_scale);
var x_axis = d3.axisBottom(x_scale);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append('g')
    .attr('class', 'y axis');

function draw(year) {

    var csv_data = data[year];

    var t = d3.transition()
        .duration(2000);

    var area = csv_data.map(function (d) {
        return d.area;
    });
    x_scale.domain(area);

    var max_value = d3.max(csv_data, function (d) {
        return +d.value;
    });

    y_scale.domain([0, max_value]);
    colour_scale.domain([0, max_value]);

    var bars = svg.selectAll('.bar')
        .data(csv_data)

    bars
        .exit()
        .remove();

    var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) {
            return x_scale(d.area);
        })
        .attr('width', x_scale.bandwidth())
        .attr('y', height)
        .attr('height', 0)

    new_bars.merge(bars)
        .transition(t)
        .attr('y', function (d) {
            return y_scale(+d.value);
        })
        .attr('height', function (d) {
            return height - y_scale(+d.value)
        })
        .attr('fill', function (d) {
            return colour_scale(+d.value);
        })

    svg.select('.x.axis')
        .call(x_axis);

    svg.select('.y.axis')
        .transition(t)
        .call(y_axis);

}

d3.queue()
    .defer(d3.csv, 'data/CW1961.csv')
    .defer(d3.csv, 'data/CW1962.csv')
    .defer(d3.csv, 'data/CW1963.csv')
    .defer(d3.csv, 'data/CW1964.csv')
    .defer(d3.csv, 'data/CW1965.csv')
    .defer(d3.csv, 'data/CW1966.csv')
    .defer(d3.csv, 'data/CW1967.csv')
    .defer(d3.csv, 'data/CW1968.csv')
    .defer(d3.csv, 'data/CW1969.csv')
    .defer(d3.csv, 'data/CW1970.csv')
    .defer(d3.csv, 'data/CW1971.csv')
    .defer(d3.csv, 'data/CW1972.csv')
    .defer(d3.csv, 'data/CW1973.csv')
    .defer(d3.csv, 'data/CW1974.csv')
    .defer(d3.csv, 'data/CW1975.csv')
    .defer(d3.csv, 'data/CW1976.csv')
    .defer(d3.csv, 'data/CW1977.csv')
    .defer(d3.csv, 'data/CW1978.csv')
    .defer(d3.csv, 'data/CW1979.csv')
    .defer(d3.csv, 'data/CW1980.csv')
    .defer(d3.csv, 'data/CW1981.csv')
    .defer(d3.csv, 'data/CW1982.csv')
    .defer(d3.csv, 'data/CW1983.csv')
    .defer(d3.csv, 'data/CW1984.csv')
    .defer(d3.csv, 'data/CW1985.csv')
    .defer(d3.csv, 'data/CW1986.csv')
    .defer(d3.csv, 'data/CW1987.csv')
    .defer(d3.csv, 'data/CW1988.csv')
    .defer(d3.csv, 'data/CW1989.csv')
    .defer(d3.csv, 'data/CW1990.csv')
    .defer(d3.csv, 'data/CW1991.csv')
    .defer(d3.csv, 'data/CW1992.csv')
    .defer(d3.csv, 'data/CW1993.csv')
    .defer(d3.csv, 'data/CW1994.csv')
    .defer(d3.csv, 'data/CW1995.csv')
    .defer(d3.csv, 'data/CW1996.csv')
    .defer(d3.csv, 'data/CW1997.csv')
    .defer(d3.csv, 'data/CW1998.csv')
    .defer(d3.csv, 'data/CW1999.csv')
    .defer(d3.csv, 'data/CW2000.csv')
    .defer(d3.csv, 'data/CW2001.csv')
    .defer(d3.csv, 'data/CW2002.csv')
    .defer(d3.csv, 'data/CW2003.csv')
    .defer(d3.csv, 'data/CW2004.csv')
    .defer(d3.csv, 'data/CW2005.csv')
    .defer(d3.csv, 'data/CW2006.csv')
    .defer(d3.csv, 'data/CW2007.csv')
    .defer(d3.csv, 'data/CW2008.csv')
    .defer(d3.csv, 'data/CW2009.csv')
    .defer(d3.csv, 'data/CW2010.csv')
    .defer(d3.csv, 'data/CW2011.csv')
    .defer(d3.csv, 'data/CW2012.csv')
    .defer(d3.csv, 'data/CW2013.csv')
    .defer(d3.csv, 'data/CW2014.csv')
    .defer(d3.csv, 'data/CW2015.csv')
    .await(function (error, d1961, d1962, d1963, d1964, d1965, d1966, d1967, d1968, d1969, d1970, d1971, d1972, d1973, d1974, d1975,
        d1976, d1977, d1978, d1979, d1980, d1981, d1982, d1983, d1984,
        d1985, d1986, d1987, d1988, d1989, d1990, d1991, d1992, d1993,
        d1994, d1995, d1996, d1997, d1998, d1999, d2000, d2001, d2002,
        d2003, d2004, d2005, d2006, d2007, d2008, d2009, d2010, d2011,
        d2012, d2013, d2014, d2015) {
        data['1961'] = d1961;
        data['1962'] = d1962;
        data['1963'] = d1963;
        data['1964'] = d1964;
        data['1965'] = d1965;
        data['1966'] = d1966;
        data['1967'] = d1967;
        data['1968'] = d1968;
        data['1969'] = d1969;
        data['1970'] = d1970;
        data['1971'] = d1971;
        data['1972'] = d1972;
        data['1973'] = d1973;
        data['1974'] = d1974;
        data['1975'] = d1975;
        data['1976'] = d1976;
        data['1977'] = d1977;
        data['1978'] = d1978;
        data['1979'] = d1979;
        data['1980'] = d1980;
        data['1981'] = d1981;
        data['1982'] = d1982;
        data['1983'] = d1983;
        data['1984'] = d1984;
        data['1985'] = d1985;
        data['1986'] = d1986;
        data['1987'] = d1987;
        data['1988'] = d1988;
        data['1989'] = d1989;
        data['1990'] = d1990;
        data['1991'] = d1991;
        data['1992'] = d1992;
        data['1993'] = d1993;
        data['1994'] = d1994;
        data['1995'] = d1995;
        data['1996'] = d1996;
        data['1997'] = d1997;
        data['1998'] = d1998;
        data['1999'] = d1999;
        data['2000'] = d2000;
        data['2001'] = d2001;
        data['2002'] = d2002;
        data['2003'] = d2003;
        data['2004'] = d2004;
        data['2005'] = d2005;
        data['2006'] = d2006;
        data['2007'] = d2007;
        data['2008'] = d2008;
        data['2009'] = d2009;
        data['2010'] = d2010;
        data['2011'] = d2011;
        data['2012'] = d2012;
        data['2013'] = d2013;
        data['2014'] = d2014;
        data['2015'] = d2015;
        draw('2015');
    });

var slider = d3.select('#year');
// var slider = d3.slider().min(1961).max(2015).ticks(10).showRange(true).value(1999);

slider.on('change', function () {
    draw(this.value);
    // d3.select('#slider').call(slider);
});

// var slider = d3.slider().min(1961).max(2015).ticks(10).showRange(true).value(1999);
// // Render the slider in the div
// d3.select('#slider').call(slider);


// // Render the slider in the div

