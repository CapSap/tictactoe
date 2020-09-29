import React from 'react';
// get a new colour for x player


class Colour extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      randomColour : "",
      error: null,
      updatePlease: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {

    var xhr = new XMLHttpRequest();
    let url = "http://www.scolr.org/json/color/random";
    xhr.open('GET',url,true);
    xhr.onload = function() {
      if(this.status == 200) {
        var data = JSON.parse(xhr.responseText);
        console.log(data)                      
      } 
    }
    xhr.send();
    }   
  
    handleClick() {
      this.setState ({
        updatePlease: true
      })
      console.log('click')
    }

   
    // maybe onClick should set state value update true; then run api stuff in compDidUpdate?

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{this.state.randomColour}Get random colour for X</button>
        <h3>{this.state.randomColour}</h3>
        {/* render error */}
        {this.state.error &&  <h3>{this.state.error}</h3>}
      </div>
    )
  }
}


export default Colour;