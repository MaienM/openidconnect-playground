import React from 'react';
import Ajax from 'simple-ajax';

const parseJWTWithoutValidating = (token) => {
  // Based on https://stackoverflow.com/a/38552302.
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonData = decodeURIComponent(window.atob(base64).split('').map((c) => (
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  )).join(''))
  return JSON.parse(jsonData);
};

class ShowToken extends React.Component {
  render() {
    if (!this.props.token) {
      return null;
    }

    const parsedToken = parseJWTWithoutValidating(this.props.token);
    return (
      <div>
        <div className="code-box-title">{this.props.name} Token Payload</div>
        <div className="code-box-content">
          <div className="code-block">
            <pre>
              {JSON.stringify(parsedToken, null, 3)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

class StepFour extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className={`playground-step ${this.props.isActive ? 'active' : '' } ${this.props.idTokenDecoded ? ' last-step' : ' last-step is-invalid'}`}>
        <span className="step-number">
          <i className={this.props.idTokenDecoded ? 'icon-budicon-470' : 'icon-budicon-471'}></i>
        </span>
        <div className="step-content">
          <a id="step4"></a>
          <h2 className="step-title">{this.props.idTokenDecoded ? 'The ID token is valid!' : 'The ID token is invalid. Check your parameters and try verifying again.'}</h2>
          {this.props.idTokenDecoded ? (
            <div className="decoded-code-box">
              <ShowToken name="ID" token={this.props.idToken} />
              <ShowToken name="Access" token={this.props.accessToken} />
              <ShowToken name="Refresh" token={this.props.refreshToken} />
            </div>
          ) : null}
          <br />
          <div className="code-box-btn-group">
            <button onClick={this.props.startOver}  className="code-box-btn is-alt">Start Over</button>
            <button onClick={this.props.logOut}  className="code-box-btn is-subtle">Log Out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default StepFour;
