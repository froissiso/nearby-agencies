import React from 'react';
import './css/Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="component-header">
        <img
          src="//cdn.jsdelivr.net/emojione/assets/png/1F3E1.png"
          role="presentation"
          width="32"
          height="32"
        />
        Nearby Agencies
        <img
          src="//cdn.jsdelivr.net/emojione/assets/png/1F3E2.png"
          role="presentation"
          width="32"
          height="32"
        />
      </header>
    );
  }
}
export default Header;