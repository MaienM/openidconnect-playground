import React from 'react';
import _ from 'lodash';
import { sanitizeEndpoint } from '../utils';

class ServerURLs extends React.Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    if (this.refs[this.props.focus]) {
      this.refs[this.props.focus].select();
    }
  }
  update(event) {
    let changed = {
      server: sanitizeEndpoint(this.refs.server.value),
      authEndpoint: sanitizeEndpoint(this.refs.authEndpoint.value),
      tokenEndpoint: sanitizeEndpoint(this.refs.tokenEndpoint.value),
      domain: sanitizeEndpoint(this.refs.domain.value),
      discoveryURL: this.refs.discoveryURL.value
    };
    changed[event.target.name] = event.target.value;
    window.dispatchEvent(new CustomEvent('configChange', {
      detail: changed
    }));
  }
  updateDiscovery() {
    setTimeout(() => { window.dispatchEvent(new CustomEvent('discovery')); }, 250);
  }
  render() {
    return (
      <div className="form-horizontal">
        <div className="form-horizontal">
          <div className="form-group">
            <div style={{ display: this.props.server == 'Auth0' ? 'block' : 'none' }}>
              <label htmlFor="domain" className="col-md-3 col-xs-12 control-label">Auth0 domain</label>
              <div className="col-md-9 col-xs-12">
                <button
                  onClick={this.updateDiscovery}
                  className="btn btn-transparent btn-md button-float-right"
                >
                  Use Auth0 Discovery Document
                </button>
                <div style={ { overflow: 'hidden' } }>
                  <input className="form-control input-with-button" name="domain" onChange={this.update} ref="domain" value={this.props.domain} placeholder="mydomain.auth0.com" />
                </div>
              </div>
            </div>
            <div style={{ display: this.props.server != 'Auth0' ? 'block' : 'none' }}>
              <label htmlFor="discoveryURL" className="col-md-3 col-xs-12 control-label">Discovery Document URL</label>
              <div className="col-md-9 col-xs-12">
                <div style={ { overflow: 'hidden' } }>
                  <input
                    className={`form-control ${this.props.server != 'google' ? 'input-with-button' : ''}`}
                    name="discoveryURL"
                    disabled="disabled"
                    value={this.props.discoveryURL}
                    ref="discoveryURL"
                    placeholder="https://my-oidc.com/.well-known/openid-configuration"
    />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="authEndpoint" className="col-md-3 col-xs-12 control-label">Authorization Token Endpoint</label>
            <div className="col-md-9 col-xs-12">
              <input className="form-control" name="authEndpoint" disabled="disabled" value={this.props.authEndpoint} ref="authEndpoint" placeholder="https://my-oidc.com/authorize" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Token Endpoint" className="col-md-3 col-xs-12 control-label">Token Endpoint</label>
            <div className="col-md-9 col-xs-12">
              <input className="form-control" name="tokenEndpoint" disabled="disabled" value={this.props.tokenEndpoint} ref="tokenEndpoint" placeholder="https://my-oidc.com/oauth/token" />
            </div>
          </div>

          <div className="form-group" style={{ display: (this.props.tokenKeysEndpoint || this.props.server == 'custom') ? 'block' : 'none' }}>
            <label htmlFor="tokenKeysEndpoint" className="col-md-3 col-xs-12 control-label">Token Keys Endpoint</label>
            <div className="col-md-9 col-xs-12">
              <input className="form-control" name="tokenEndpoint" disabled="disabled" value={this.props.tokenKeysEndpoint} ref="tokenEndpoint" placeholder="https://my-oidc.com/oauth/token" />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ServerURLs;
