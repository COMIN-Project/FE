import logo from './logo.svg';
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import Reservation from './reservation';


function SpaceDetail1() {
  return (
    <div className="SpaceDetail1">
      <h6>60주년 기념관</h6>
      <p>강당, 창업지원단 강의실, 컴퓨터 있는 곳 등등 세부사항 기재예정</p>
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
      <h6>5호관</h6>
      <p>소강당(공연용), 1층 강의실</p>
    </div>
  )
}
function SpaceDetail4() {
  return (
    <div className="SpaceDetail4">
      <h6>60주년 기념관</h6>
      <p>강당, 창업지원단 강의실, 컴퓨터 있는 곳 등등 세부사항 기재예정</p>
    </div>
  )
}
function SpaceDetail5() {
  return (
    <div className="SpaceDetail5">
      <h6>60주년 기념관</h6>
      <p>강당, 창업지원단 강의실, 컴퓨터 있는 곳 등등 세부사항 기재예정</p>
    </div>
  )
}
function SpaceDetail6() {
  return (
    <div className="SpaceDetail6">
      <h6>5호관</h6>
      <p>소강당(공연용), 1층 강의실</p>
    </div>
  )
}

function App() {
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

export default App;
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
