import { Component } from 'react';
import './Results.css';

class Results extends Component {
  render() {
    return (
      <section className="results-section">
        <div className="results-box">
          <img
            src="/images/results-appear.png"
            alt="Results placeholder"
            className="empty-state"
          />
        </div>
      </section>
    );
  }
}

export default Results;
