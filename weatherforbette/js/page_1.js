class FlavorForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {weatherType: 'Sunny', weatherDate: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target; 
    const value = target.type === 'checkbox' ? target.checked : target.value; 
    const name = target.name; 
    console.log(name + " = " + value);
    this.setState({
      [name]: value 
    });
  }

  handleSubmit(event) {
    // Check user's input
    if( this.state.weatherType == '' ) {
      alert('Please choose weather type');
      return;
    }

    if( this.state.weatherDate == '' ) {
      alert('Please choose weather date');
      return;
    }

    //Store weatherType and weatherDate into local storage
    localStorage.setItem('weatherType', this.state.weatherType);
    localStorage.setItem('weatherDate', this.state.weatherDate);
    event.preventDefault();

    //Convert to page2
    window.location = "page_2.html"
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group"> 
          <select className="form-control" 
                  name="weatherType"
                  value={this.state.weatherType} 
                  onChange={this.handleChange}
          >
            <option value="Sunny">Sunny</option>
            <option value="Rainy">Rainy</option>
            <option value="Snowy">Snowy</option>
            <option value="Cloudy">Cloudy</option>
          </select>
        </div>

        <div className="form-group">
          <input className="form-control" 
                 type="date" 
                 id="weatherDate" 
                 name="weatherDate"
                 value={this.state.weatherDate} 
                 onChange={this.handleChange}
          />
        </div>

        <div className="row justify-content-center">
          <img src="pics/WechatIMG1192.png" 
               style={{width:60, height:36}} 
               onClick={this.handleSubmit}>
          </img>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('example')
);
