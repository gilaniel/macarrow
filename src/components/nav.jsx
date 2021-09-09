import { Link } from 'gatsby';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import useOutsideAlerter from '../hooks/outside';

import Anchor from './anchor';

import Insta from '../images/insta.svg'

const NavBar = () => {
  const { formatMessage } = useIntl()
  const [isOpen, setOpen] = useState(false);

  const menuRef = React.useRef(null);
  useOutsideAlerter(menuRef, setOpen.bind(this, false))

  return (
    <div className="navbar-container" ref={menuRef}>
      <div
        className={`menu__toggler ${isOpen ? 'active' : ''}`}
        onClick={() => setOpen(!isOpen)}><span></span></div>

      <div className={`navbar ${isOpen ? 'open' : ''}`}>
        <ul className="nav-list navbar-list df ai-center tt-uc">
          <li className="nav-item" onClick={() => setOpen(!isOpen)}><Anchor className="anchor" anchor={'#work'} text={formatMessage({ id: 'work' })} /></li>
          <li className="nav-item" onClick={() => setOpen(!isOpen)}><Anchor className="anchor" anchor={'#video'} text={formatMessage({ id: 'video' })} /></li>
          <li className="nav-item" onClick={() => setOpen(!isOpen)}><Anchor className="anchor" anchor={'#contacts'} text={formatMessage({ id: 'contacts' })} /></li>
          <li className="nav-item"><Link to="/insta" className="social-link insta" ><img src={Insta} alt="Maccarow" width="16" /></Link></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar;