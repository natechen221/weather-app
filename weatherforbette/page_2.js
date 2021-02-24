var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlavorForm = function (_React$Component) {
  _inherits(FlavorForm, _React$Component);

  function FlavorForm(props) {
    _classCallCheck(this, FlavorForm);

    var _this = _possibleConstructorReturn(this, (FlavorForm.__proto__ || Object.getPrototypeOf(FlavorForm)).call(this, props));

    _this.state = {
      weatherType: localStorage.getItem('weatherType'),
      weatherDate: localStorage.getItem('weatherDate'),
      cities: [],
      cityCnt: 0
    };

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(FlavorForm, [{
    key: 'fetchCity',
    value: function fetchCity(city) {
      var _this2 = this;

      // 
      // check city's weather on specified day, if it matchs the query condition, add it to city list for show.
      //
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=6285bfd2714a308c4fdd1e0c0616f3b9', {
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        response.list.forEach(function (it) {
          // Take the 9pm's data weather as a whole day data
          if (it.dt_txt == _this2.state.weatherDate + " 21:00:00") {
            console.log("test weather on specified day");
            var isMatch = false;
            if (it.weather[0].main == "Clear" && _this2.state.weatherType == "Sunny") {
              isMatch = true;
            }

            if (it.weather[0].main == "Clouds" && _this2.state.weatherType == "Cloudy") {
              isMatch = true;
            }

            if (it.weather[0].main == "Rain" && _this2.state.weatherType == "Rainy") {
              isMatch = true;
            }

            if (it.weather[0].main == "Snow" && _this2.state.weatherType == "Snowy") {
              isMatch = true;
            }

            var newCities = _this2.state.cities;
            if (isMatch) {
              newCities = _this2.state.cities.concat({ name: city, temp: it.main.temp });
            }

            _this2.setState({ weatherType: localStorage.getItem('weatherType'),
              weatherDate: localStorage.getItem('weatherDate'),
              cities: newCities,
              cityCnt: _this2.state.cityCnt + 1
            });
          }
          console.log(city + " : " + it.dt_txt + " : " + it.weather[0].main);
        });
      }).catch(function (error) {
        return alert(error);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
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
  }, {
    key: 'handleClick',
    value: function handleClick(cityName) {
      console.log(cityName);
      localStorage.setItem('cityName', cityName);
      window.location = "page_3.html";
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { className: 'container', id: 'app-cont' },
        React.createElement(
          'div',
          { className: 'head' },
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'h5',
              null,
              this.state.weatherType
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'h5',
              null,
              this.state.weatherDate
            )
          )
        ),
        this.state.cities.map(function (city) {
          return React.createElement(
            'div',
            { className: 'city' },
            React.createElement(
              'div',
              { className: 'row',
                style: { cursor: 'pointer' },
                onClick: function onClick() {
                  return _this3.handleClick(city.name);
                } },
              React.createElement(
                'div',
                { className: 'card col-6', style: { border: 0 } },
                React.createElement(
                  'div',
                  { className: 'card-body' },
                  React.createElement(
                    'h4',
                    null,
                    city.name
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'card text-right col-6', style: { border: 0 } },
                React.createElement(
                  'div',
                  { className: 'card-body' },
                  React.createElement(
                    'h5',
                    { className: 'card-title' },
                    city.temp,
                    '\u2103'
                  ),
                  React.createElement(
                    'h6',
                    { className: 'card-subtitle mb-2 text-muted' },
                    _this3.state.weatherType
                  )
                )
              )
            )
          );
        }),
        React.createElement(
          'div',
          _defineProperty({ className: 'form-group' }, 'className', 'foot'),
          React.createElement(
            'h5',
            null,
            this.state.cityCnt,
            ' cities ',
            this.state.cityCnt == 1 ? "has" : "have",
            ' been searched'
          )
        )
      );
    }
  }]);

  return FlavorForm;
}(React.Component);

ReactDOM.render(React.createElement(FlavorForm, null), document.getElementById('example'));