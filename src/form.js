/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/prop-types */
// eslint-disable-next-line max-classes-per-file
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit(event) {
    const { input } = this.state;
    event.preventDefault();
    this.setState(() => ({
      submit: input,
    }));
  }

  render() {
    const { input } = this.state;
    const { submit } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={input} onChange={this.handleChange} />
          <button type="submit">Submit!</button>
        </form>
        <h1>{submit}</h1>
      </div>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
