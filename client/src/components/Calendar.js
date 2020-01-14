import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

/*
  Make sure you have setup semantic-ui-react properly:
  https://react.semantic-ui.com/usage
*/


class Calendar extends React.Component {
  state = {
    date: null,
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  render() {
    const { date, } = this.state;

    return (
      <div className="App">
        <h1 />
        <h2>Basic datepicker</h2>
        <SemanticDatepicker onDateChange={this.handleDateChange} />

        <pre>
          Selected date:
          <br />
          {date ? date.toString() : "None"}
        </pre>
      </div>
    );
  }
}

export default Calendar;
