class FlavorForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherType: localStorage.getItem('weatherType')
      , weatherDate: localStorage.getItem('weatherDate')
      , cities : []
      , cityCnt : 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  fetchCity(city) {
    // 
    // check city's weather on specified day, if it matchs the query condition, add it to city list for show.
    //
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=6285bfd2714a308c4fdd1e0c0616f3b9', {
        method : 'get'
    }).then(response => response.json())
    .then(response => {
        response.list.forEach(it => {
          // Take the 9pm's data weather as a whole day data
          if(it.dt_txt == this.state.weatherDate + " 21:00:00") {
            console.log("test weather on specified day");
            var isMatch = false;
            if(it.weather[0].main == "Clear" && this.state.weatherType == "Sunny") {
              isMatch = true;
            }

            if(it.weather[0].main == "Clouds" && this.state.weatherType == "Cloudy") {
              isMatch = true;
            }

            if(it.weather[0].main == "Rain" && this.state.weatherType == "Rainy") {
              isMatch = true;
            }

            if(it.weather[0].main == "Snow" && this.state.weatherType == "Snowy") {
              isMatch = true;
            }

            var newCities = this.state.cities;
            if(isMatch) {
              newCities = this.state.cities.concat({name:city, temp:it.main.temp});
            }

            this.setState({weatherType: localStorage.getItem('weatherType')
              , weatherDate: localStorage.getItem('weatherDate')
              , cities: newCities
              , cityCnt : this.state.cityCnt + 1
            });
          }
          console.log(city + " : " + it.dt_txt + " : " + it.weather[0].main);
        });
    }).catch(error => alert(error));
  }

  componentDidMount() {
    this.fetchCity('Beijing');
    this.fetchCity('London');
    this.fetchCity('Paris');
    this.fetchCity('Bangkok');
    this.fetchCity('Tokyo');
    this.fetchCity('Shanghai');
    this.fetchCity('Toronto');
    this.fetchCity('Singapore');
    this.fetchCity('Madrid');
    this.fetchCity('Milan');
  }

  handleClick(cityName) {
    console.log(cityName);
    localStorage.setItem('cityName', cityName);
    window.location = "page_3.html"
  }
  
  render() {
    return (
      <div className="container" id="app-cont">
        <div className="head">
          <div className="form-group">
            <h5>{this.state.weatherType}</h5>
          </div>
          <div className="form-group">
            <h5>{this.state.weatherDate}</h5>
          </div>
        </div>
         {/* use map to go through every cities */}
        {this.state.cities.map(
          city => (
            <div className="city">
              <div className="row" 
                   style={{cursor: 'pointer'}}
                   onClick={() => this.handleClick(city.name)}>
                <div className="card col-6" style={{border:0}}>
                  <div className="card-body">
                    <h4>{city.name}</h4>
                  </div>
                </div>
                <div className="card text-right col-6" style={{border:0}}>
                  <div className="card-body">
                    <h5 className="card-title">{city.temp}℃</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.state.weatherType}</h6>                  
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        
        <div className="form-group" className="foot">
          <h5>{this.state.cityCnt} cities {this.state.cityCnt == 1 ? "has": "have"} been searched</h5>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('example')
);
