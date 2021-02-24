      class FlavorForm extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
            city: localStorage.getItem('cityName')
            , agreeCnt: 0
            , Rain:''
            , Humidity:''
            , AQI:''
            , Air_quality:''
          };

          this.handleAgree = this.handleAgree.bind(this);
          this.handleDegree = this.handleDegree.bind(this);
        }

        handleAgree(event) {
          if (this.state.agreeCnt == 0) {
            this.setState({agreeCnt: this.state.agreeCnt + 1});
          }
          if (this.state.agreeCnt < 0) {
            this.setState({agreeCnt: this.state.agreeCnt + 2});
          }

          event.preventDefault();
        }

        handleDegree(event) {
          if (this.state.agreeCnt == 0) {
            this.setState({agreeCnt: this.state.agreeCnt - 1});
          }
          if (this.state.agreeCnt > 0) {
            this.setState({agreeCnt: this.state.agreeCnt - 2});
          }
          event.preventDefault();
        }

        componentDidMount() {
          // 
          // get city's weather information for today. 
          //
          fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&units=metric&appid=6285bfd2714a308c4fdd1e0c0616f3b9', {
              method : 'get'
          }).then(response => response.json())
          .then(response => {
            console.log(response.weather[0].main);
            console.log(response.weather[0].description);
            console.log(response.main.temp);
            console.log(response.main.feels_like);

            var wMain = response.weather[0].main;
            var wDesc = response.weather[0].description;
            var Rain ='';
            var Humidity='';
            var AQI='';
            var Air_quality='';

            //Check the weather and give the description
            if(wMain == "Clear") {
              wDesc = "Any lingering cloud and rain in the morning, quickly clear east to leave it clear throughout the day.";
              Rain='10%';
              Humidity='20%';
              AQI='30';
              Air_quality='Good';
            }

            if(wMain == "Clouds") {
              wDesc = "Mostly cloudy throughout the day, clear in the evening.";
              Rain='35%';
              Humidity='35%';
              AQI='15';
              Air_quality='Bad'
            }

            if(wMain == "Rain") {
              wDesc = "Light rain until tomorrow morning, starting again tomorrow afternoon.";
              Rain='80%';
              Humidity='50%';
              AQI='25';
              Air_quality='Good'
            }

            if(wMain == "Snow") {
              wDesc = "Snow (2-5in) until tomorrow afternoon.";
              Rain='25%';
              Humidity='35%';
              AQI='10';
              Air_quality='Medium'
            }


            this.setState({
                city: localStorage.getItem('cityName')
              , main: response.weather[0].main
              , description: wDesc 
              , temp: response.main.temp
              , temp_min: response.main.temp_min
              , temp_max: response.main.temp_max
              , Rain: Rain
              , Humidity: Humidity
              , AQI: AQI
              , Air_quality: Air_quality

            });
          }).catch(error => alert(error));
        }

        render() {
          return (
            <div className="card mb-4"  id="app-cont">
              <div className="head">
                <div className="card-body">
                  <div>
                    <div>
                      <center><h2 className="card-title">{this.state.city}</h2></center>
                      <center><h4 className="card-text">{this.state.temp}℃</h4></center>
                    </div>
                    <div>
                      <p/>
                      <p className="card-text" align="right">{this.state.temp_max}℃</p>
                      <p className="card-text" align="right">{this.state.temp_min}℃</p>
                    </div>
                  </div>
                  <div><p/><p className="card-text" style={{color: 'black'}} >{this.state.description}</p></div>
                  <p align="right">
                    <div><p/></div>
                    <div>Is the weather reliable? 
                      &nbsp;<a href="about:blank" onClick={this.handleAgree}>👍</a>
                      &nbsp;<a href="about:blank" onClick={this.handleDegree}>👎</a>
                      &nbsp;{this.state.agreeCnt}
                    </div>
                    {/* <div>Past days voting?
                      &nbsp;<a href="about:blank" onClick={this.handleAgree}>📟</a> 
                    </div> */}
                  </p>
                </div>
              </div>

              <div className="card-body">
                <div className="row row-cols-2">
                  <div className="col mb-4 data">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Rain</h5>
                        <p className="card-text" style={{color:'#00BFFF'}}>{this.state.Rain}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4 data">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Humidity</h5>
                        <p className="card-text" style={{color:'#1E90FF'}}>{this.state.Humidity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4 data">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">AQI</h5>
                        <p className="card-text" style={{color:'#FFA500'}}>{this.state.AQI}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4 data">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Air quality</h5>
                        <p className="card-text" style={{color:'#32CD32'}}>{this.state.Air_quality}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

      }

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('example')
);