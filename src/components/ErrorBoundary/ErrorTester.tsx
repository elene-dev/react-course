import { Component } from 'react';

type ErrorTesterState = {
  shouldThrow: boolean;
};

class ErrorTester extends Component<unknown, ErrorTesterState> {
  state: ErrorTesterState = {
    shouldThrow: false,
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test application error');
    }

    return (
      <button
        type="button"
        className="error-test-button"
        onClick={() => this.setState({ shouldThrow: true })}
      >
        Test Error
      </button>
    );
  }
}

export default ErrorTester;
