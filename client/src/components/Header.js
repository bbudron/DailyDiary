import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href={'/auth/google'}>Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="3" className="myDays">
            <Link to="/days">My Days</Link>
          </li>,
          <li key="2">
            <Link to="/days/new">
              Add Entry
            </Link>
          </li>,
          <li key="1">
            <a href={'/auth/logout'}>Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="header">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/days' : '/'}
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
          >
            Daily Diary
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
