import React from 'react';
// get a new colour for x player

class Colour extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      randomColour : "blank",
      error: null,
    }
    this.handleClick = this.handleClick.bind(this);
  }
   
    handleClick() {
    var xhr = new XMLHttpRequest();
    let url = "http://www.colr.org/json/color/random";
    xhr.open('GET',url,true);
    xhr.onload = () => {
      if(xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);      
              
      } 
      console.log(data.new_color);
      this.setState({
        randomColour: "#"+data.new_color
      }) 
    } 
    xhr.send();
    }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Get random colour for X</button>
        
        <h3 style={{color: `${this.state.randomColour}`}}>change colour</h3>
        {/* render error */}
        {this.state.error &&  <h3>{this.state.error}</h3>}
      </div>
    )
  }
}


export default Colour;