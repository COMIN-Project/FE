import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Slider from 'react-slider';
import './main.css';
import './slider.css';
import Reservation from './reservation';

function SpaceDetail1() {
  return (
    <div className="SpaceDetail1">
      <h6>본관</h6>
      <p>중강강, 대강당</p>
    </div>
  )
}
function SpaceDetail2() {
  return (
    <div className="SpaceDetail2">
      <h6>5호관</h6>
      <p>소강당(공연용), 1층 강의실</p>
    </div>
  )
}
function SpaceDetail3() {
  return (
    <div className="SpaceDetail3">
      <h6>60주년 기념관</h6>
      <p>강당, 창업지원단 강의실, 컴퓨터 있는 곳 등등 세부사항 기재예정</p>
    </div>
  )
}
function SpaceDetail4() {
  return (
    <div className="SpaceDetail4">
      <h6>하이테크</h6>
      <p>중강당, 대강당, 강의실</p>
    </div>
  )
}
function SpaceDetail5() {
  return (
    <div className="SpaceDetail5">
      <h6>나빌레관</h6>
      <p>가무연습실</p>
    </div>
  )
}
function SpaceDetail6() {
  return (
    <div className="SpaceDetail6">
      <h6>6호관</h6>
      <p>강의실</p>
    </div>
  )
}

function MainApp() {
  return (
    <div className="App">
      <Reservation />

      <div className="maintitle">
        <p>인하대학교</p> <br></br>
        <b>시설예약시스템</b>
      </div>

      <div class="box-wrap1">
        <Router>
          <Link to='/60주년기념관1'><SpaceDetail1></SpaceDetail1></Link>
          <Link to='/5호관2'><SpaceDetail3></SpaceDetail3></Link>
          <Link to='/60주년기념관3'><SpaceDetail5></SpaceDetail5></Link>
          <Route exact path="/60주년기념관1"><SpaceDetail1></SpaceDetail1></Route> 
          <Route exact path="/5호관2"><SpaceDetail3></SpaceDetail3></Route> 
          <Route exact path="/60주년기념관3"><SpaceDetail5></SpaceDetail5></Route>
        </Router>
      </div>

      <div class="box-wrap2">
        <Router>
          <Link to='/5호관1'><SpaceDetail2></SpaceDetail2></Link>
          <Link to='/60주년기념관2'><SpaceDetail4></SpaceDetail4></Link>
          <Link to='/5호관3'><SpaceDetail6></SpaceDetail6></Link>
          <Route exact path="/5호관1"><SpaceDetail2></SpaceDetail2></Route> 
          <Route exact path="/60주년 기념관2"><SpaceDetail4></SpaceDetail4></Route> 
          <Route exact path="/5호관3"><SpaceDetail6></SpaceDetail6></Route>
        </Router>
      </div>

      <div className="notice">
        <hr className="hr1" />
        <p>공지사항</p>
        <hr className="hr2" />
        <div className="gray-box"></div>
      </div>
    </div>
    
  );
}

export default MainApp;
ReactDOM.render(<Router><MainApp /></Router>, document.getElementById('root'));