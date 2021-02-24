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

    _this.state = { weatherType: 'Sunny', weatherDate: '' };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(FlavorForm, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      console.log(name + " = " + value);
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      // Check user's input
      if (this.state.weatherType == '') {
        alert('Please choose weather type');
        return;
      }

      if (this.state.weatherDate == '') {
        alert('Please choose weather date');
        return;
      }

      //Store weatherType and weatherDate into local storage
      localStorage.setItem('weatherType', this.state.weatherType);
      localStorage.setItem('weatherDate', this.state.weatherDate);
      event.preventDefault();

      //Convert to page2
      window.location = "page_2.html";
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'select',
            { className: 'form-control',
              name: 'weatherType',
              value: this.state.weatherType,
              onChange: this.handleChange
            },
            React.createElement(
              'option',
              { value: 'Sunny' },
              'Sunny'
            ),
            React.createElement(
              'option',
              { value: 'Rainy' },
              'Rainy'
            ),
            React.createElement(
              'option',
              { value: 'Snowy' },
              'Snowy'
            ),
            React.createElement(
              'option',
              { value: 'Cloudy' },
              'Cloudy'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { className: 'form-control',
            type: 'date',
            id: 'weatherDate',
            name: 'weatherDate',
            value: this.state.weatherDate,
            onChange: this.handleChange
          })
        ),
        React.createElement(
          'div',
          { className: 'row justify-content-center' },
          React.createElement('img', { src: 'pics/WechatIMG1192.png',
            style: { width: 60, height: 36 },
            onClick: this.handleSubmit })
        )
      );
    }
  }]);

  return FlavorForm;
}(React.Component);

ReactDOM.render(React.createElement(FlavorForm, null), document.getElementById('example'));