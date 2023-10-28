import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="Navbar navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navContainer">
  <Link to="/" style={{ textDecoration: 'none' }}>
    <ul className="navbar-nav container">
      <li className="nav-item container-star">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7.12249 0.605726C7.50171 -0.0882041 8.49829 -0.088204 8.87751 0.605726L9.96022 2.58693C10.1657 2.96292 10.5879 3.16622 11.0099 3.09244L13.234 2.70368C14.0129 2.56751 14.6343 3.34666 14.3282 4.07581L13.4543 6.15757C13.2884 6.55264 13.3927 7.00946 13.7135 7.29344L15.4041 8.78987C15.9963 9.314 15.7745 10.2856 15.0136 10.5009L12.8412 11.1156C12.4289 11.2323 12.1367 11.5986 12.1147 12.0265L11.9989 14.2813C11.9583 15.071 11.0604 15.5034 10.4176 15.0427L8.58254 13.7275C8.23429 13.4779 7.76571 13.4779 7.41746 13.7275L5.58236 15.0427C4.9396 15.5034 4.04172 15.071 4.00113 14.2813L3.88526 12.0265C3.86327 11.5986 3.57112 11.2323 3.15884 11.1156L0.986381 10.5009C0.225463 10.2856 0.00370479 9.314 0.595851 8.78987L2.28646 7.29344C2.6073 7.00946 2.71156 6.55264 2.54571 6.15757L1.6718 4.07581C1.36571 3.34666 1.98706 2.56751 2.76604 2.70368L4.99007 3.09244C5.41214 3.16622 5.83431 2.96292 6.03978 2.58693L7.12249 0.605726Z" fill="#149BFC"/>
        </svg>
      </li>
      <li className="nav-item container-logo">
        <span>Comin</span>
      </li>
    </ul>
  </Link>
</div>

  <div className="collapse navbar-collapse" id="navLink">
    <ul className="navbar-nav navLink">
      <li className="nav-item navLink-part">
      <Link to="/reserve" style={{ textDecoration: 'none', color: 'black' }}>시설 예약</Link>
      </li>
      <li className="nav-item navLink-part">
        <Link to="/Search" style={{ textDecoration: 'none', color: 'black' }}>빠른찾기</Link>
      </li>
      <li className="nav-item navLink-part">
        <a className="nav-link" href="#">이용안내</a>
      </li>
      <li className="nav-item navLink-part">
        <Link to="/Suggest" style={{ textDecoration: 'none', color: 'black' }}>건의하기</Link>
      </li>
      <li className="nav-item navLink-part">
      <Link to="/Inquire" style={{ textDecoration: 'none', color: 'black' }}>내역조회</Link>
     </li>
    </ul>
  </div>

  <div className="collapse navbar-collapse" id="navLogin">
  <ul className="navbar-nav Log">
    <li className="nav-item login">
      <a>로그인</a>
    </li>
    <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#D9D9D9"/>
    </svg></li>
  </ul>
  </div>
</nav>
    );
};

export default Navbar;