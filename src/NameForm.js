import React from 'react';
import './css/NameForm.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value1: this.props.add1,value2: this.props.add2};

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  handleChange(event) {
    this.setState({value1: event.target.value});
  }
  handleChange2(event) {
    this.setState({value2: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    this.props.handleSubmit2(this.state.value1,this.state.value2);
    event.preventDefault();
  }

  clearList(){
    this.setState({value1:'',value2:''});
    this.props.clearList();
    console.log("CLEAR");
  }

  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
        <div className="component-search-input">
          <label>
            Address 1:
            <input type="text" value={this.state.value1} onChange={this.handleChange} />
            
            Address 2:
            <input type="text" value={this.state.value2} onChange={this.handleChange2} />
          </label>
        </div>
        <div className="buttons-div">
          <button className="button button1" type="reset" onClick={this.clearList}>Clear</button>
          <button className="button button2" type="submit" ><span>Update Results </span></button>
        </div>
      </form>

    );
  }
}

export default NameForm;