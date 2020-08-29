import React from 'react';
// get a new colour for x player


class Colour extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      randomColour : "",
      error: null
    }
  }

  //function to setState to random colour
  randomColourSetState = (x) => {
    this.setState({
      randomColour: x
      
   })
  }
  
  getRandomColour(){
    var xhr = new XMLHttpRequest();
    let url = "http://www.colr.org/json/color/random";
    xhr.open('GET',url,true);
    xhr.onload = function() {
      if(this.status == 200) {
        
      }
    }
    xhr.send();
  }


  render() {
    console.log(this.state.randomColour)
    return (
      <div>
        <button onClick={this.getRandomColour}>Get random colour for X</button>
        <h3>{this.state.randomColour}</h3>
        {/* render error */}
        {this.state.error &&  <h3>{this.state.error}</h3>}
      </div>
    )
  }
}


export default Colour;