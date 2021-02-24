var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlavorForm = function (_React$Component) {
  _inherits(FlavorForm, _React$Component);

  function FlavorForm(props) {
    _classCallCheck(this, FlavorForm);

    var _this = _possibleConstructorReturn(this, (FlavorForm.__proto__ || Object.getPrototypeOf(FlavorForm)).call(this, props));

    _this.state = {
      city: localStorage.getItem('cityName'),
      agreeCnt: 0,
      Rain: '',
      Humidity: '',
      AQI: '',
      Air_quality: ''
    };

    _this.handleAgree = _this.handleAgree.bind(_this);
    _this.handleDegree = _this.handleDegree.bind(_this);
    return _this;
  }

  _createClass(FlavorForm, [{
    key: 'handleAgree',
    value: function handleAgree(event) {
      if (this.state.agreeCnt == 0) {
        this.setState({ agreeCnt: this.state.agreeCnt + 1 });
      }
      if (this.state.agreeCnt < 0) {
        this.setState({ agreeCnt: this.state.agreeCnt + 2 });
      }

      event.preventDefault();
    }
  }, {
    key: 'handleDegree',
    value: function handleDegree(event) {
      if (this.state.agreeCnt == 0) {
        this.setState({ agreeCnt: this.state.agreeCnt - 1 });
      }
      if (this.state.agreeCnt > 0) {
        this.setState({ agreeCnt: this.state.agreeCnt - 2 });
      }
      event.preventDefault();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // 
      // get city's weather information for today. 
      //
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&units=metric&appid=6285bfd2714a308c4fdd1e0c0616f3b9', {
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log(response.weather[0].main);
        console.log(response.weather[0].description);
        console.log(response.main.temp);
        console.log(response.main.feels_like);

        var wMain = response.weather[0].main;
        var wDesc = response.weather[0].description;
        var Rain = '';
        var Humidity = '';
        var AQI = '';
        var Air_quality = '';

        //Check the weather and give the description
        if (wMain == "Clear") {
          wDesc = "Any lingering cloud and rain in the morning, quickly clear east to leave it clear throughout the day.";
          Rain = '10%';
          Humidity = '20%';
          AQI = '30';
          Air_quality = 'Good';
        }

        if (wMain == "Clouds") {
          wDesc = "Mostly cloudy throughout the day, clear in the evening.";
          Rain = '35%';
          Humidity = '35%';
          AQI = '15';
          Air_quality = 'Bad';
        }

        if (wMain == "Rain") {
          wDesc = "Light rain until tomorrow morning, starting again tomorrow afternoon.";
          Rain = '80%';
          Humidity = '50%';
          AQI = '25';
          Air_quality = 'Good';
        }

        if (wMain == "Snow") {
          wDesc = "Snow (2-5in) until tomorrow afternoon.";
          Rain = '25%';
          Humidity = '35%';
          AQI = '10';
          Air_quality = 'Medium';
        }

        _this2.setState({
          city: localStorage.getItem('cityName'),
          main: response.weather[0].main,
          description: wDesc,
          temp: response.main.temp,
          temp_min: response.main.temp_min,
          temp_max: response.main.temp_max,
          Rain: Rain,
          Humidity: Humidity,
          AQI: AQI,
          Air_quality: Air_quality

        });
      }).catch(function (error) {
        return alert(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'card mb-4', id: 'app-cont' },
        React.createElement(
          'div',
          { className: 'head' },
          React.createElement(
            'div',
            { className: 'card-body' },
            React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                null,
                React.createElement(
                  'center',
                  null,
                  React.createElement(
                    'h2',
                    { className: 'card-title' },
                    this.state.city
                  )
                ),
                React.createElement(
                  'center',
                  null,
                  React.createElement(
                    'h4',
                    { className: 'card-text' },
                    this.state.temp,
                    '\u2103'
                  )
                )
              ),
              React.createElement(
                'div',
                null,
                React.createElement('p', null),
                React.createElement(
                  'p',
                  { className: 'card-text', align: 'right' },
                  this.state.temp_max,
                  '\u2103'
                ),
                React.createElement(
                  'p',
                  { className: 'card-text', align: 'right' },
                  this.state.temp_min,
                  '\u2103'
                )
              )
            ),
            React.createElement(
              'div',
              null,
              React.createElement('p', null),
              React.createElement(
                'p',
                { className: 'card-text', style: { color: 'black' } },
                this.state.description
              )
            ),
            React.createElement(
              'p',
              { align: 'right' },
              React.createElement(
                'div',
                null,
                React.createElement('p', null)
              ),
              React.createElement(
                'div',
                null,
                'Is the weather reliable? \xA0',
                React.createElement(
                  'a',
                  { href: 'about:blank', onClick: this.handleAgree },
                  '\uD83D\uDC4D'
                ),
                '\xA0',
                React.createElement(
                  'a',
                  { href: 'about:blank', onClick: this.handleDegree },
                  '\uD83D\uDC4E'
                ),
                '\xA0',
                this.state.agreeCnt
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'card-body' },
          React.createElement(
            'div',
            { className: 'row row-cols-2' },
            React.createElement(
              'div',
              { className: 'col mb-4 data' },
              React.createElement(
                'div',
                { className: 'card' },
                React.createElement(
                  'div',
                  { className: 'card-body' },
                  React.createElement(
                    'h5',
                    { className: 'card-title' },
                    'Rain'
                  ),
                  React.createElement(
                    'p',
                    { className: 'card-text', style: { color: '#00BFFF' } },
                    this.state.Rain
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col mb-4 data' },
              React.createElement(
                'div',
                { className: 'card' },
                React.createElement(
                  'div',
                  { className: 'card-body' },
                  React.createElement(
                    'h5',
                    { className: 'card-title' },
                    'Humidity'
                  ),
                  React.createElement(
                    'p',
                    { className: 'card-text', style: { color: '#1E90FF' } },
                    this.state.Humidity
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col mb-4 data' },
              React.createElement(
                'div',
                { className: 'card' },
                React.createElement(
                  'div',
                  { className: 'card-body' },
                  React.createElement(
                    'h5',
                    { className: 'card-title' },
                    'AQI'
                  ),
                  React.createElement(
                    'p',
                    { className: 'card-text', style: { color: '#FFA500' } },
                    this.state.AQI
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col mb-4 data' },
              React.createElement(
                'div',
                { className: 'card' },
                React.createElement(
                  'div',
                  { className: 'card-body' },
                  React.createElement(
                    'h5',
                    { className: 'card-title' },
                    'Air quality'
                  ),
                  React.createElement(
                    'p',
                    { className: 'card-text', style: { color: '#32CD32' } },
                    this.state.Air_quality
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FlavorForm;
}(React.Component);

ReactDOM.render(React.createElement(FlavorForm, null), document.getElementById('example'));