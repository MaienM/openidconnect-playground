import React from 'react';
import Hero from './hero';
import Footer from './footer';

class OpenIDPage extends React.Component {
  render() {
    return (
      <div className="openid-page">
        { this.props.children }
      </div>
    );
  }
}

export default OpenIDPage;
