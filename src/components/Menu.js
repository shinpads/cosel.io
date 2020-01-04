import React, { Component } from 'react';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ComputerIcon from '@material-ui/icons/Computer';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const isMobile = window.innerWidth < 800;
    return (
      <div className={'menu-container' + (isMobile ? ' mobile' : '')}>
        <h1 className="title noselect">Rob Farlow</h1>
        <button className="menu-button">
          <div className="menu-button-title noselect">About</div>
          <PersonIcon />
        </button>
        <button className="menu-button">
          <div className="menu-button-title noselect">Projects</div>
          <ComputerIcon />
        </button>
        <button className="menu-button">
          <div className="menu-button-title noselect">Games</div>
          <VideogameAssetIcon />
        </button>
        <button className="menu-button">
          <div className="menu-button-title noselect">Contact</div>
          <EmailIcon />
        </button>
      </div>
    )
  }
}

export default Menu;
