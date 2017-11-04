import React from 'react';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value1: '',value2: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New address 1:
          <input type="text" value={this.state.value1} onChange={this.handleChange} />
          New address 2:
          <input type="text" value={this.state.value2} onChange={this.handleChange2} />
        </label>
        <input type="submit" value="Submit" />
        {this.state.value1}
        {this.state.value2}
      </form>
    );
  }
}

export default NameForm;