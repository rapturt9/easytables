import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import socketIOClient from "socket.io-client";
import DataTable from "./Table";
import DataRow from "./DataRow";
import DataInput from "./DataInput";
import DataAdd from "./DataAdd";
import HomepageLayout from "./HomepageLayout";

import ReactWidgetsForm from "./Test";
const ENDPOINT = "http://127.0.0.1:4001";

class App extends Component {
  componentDidMount() {
    this.props.fetchData("","");
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
          <Route exact path="/" component={HomepageLayout} />
          <Route exact path="/table" component={DataInput} />
            <Route exact path="/table" component={DataTable} />
            <Route exact path="/row" component={DataRow} />
            <Route exact path="/add" component={DataAdd} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
