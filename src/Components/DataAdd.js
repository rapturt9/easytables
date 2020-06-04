import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions";
import ids from "../ids";
import { render } from "@testing-library/react";
import { Redirect } from "react-router-dom";
import { Input, TextArea, Form } from "semantic-ui-react";
import AutosizeInput from "react-input-autosize";

class Input0 extends Component {
  state = { val: "" };

  handleChange = (event) => {
    this.setState({ val: event.target.value });
  };

  render = () => {
    return (
      <div>
        <input
          {...this.props.input}
          type={this.props.type}
          id={this.props.id}
          value={this.state.val}
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
      </div>
    );
  };
}

class DataAdd extends Component {
  componentDidMount() {
    //this.props.fetchData("applicationci", this.props.row.num);
  }

  handleSubmit = (event) => {
    let object = this.props.form.Adder.values || {};
    console.log(object);
    this.props.addData(object);
    this.props.fetchData("", "");
  };

  Helper = () => {
    return ids.map((id) => {
      return (
        <div className="field" style={{ width: "50%" }}>
            <label>{id}</label>
            <Field
              name={id}
              type="text"
              component={Input0}
              id={id}
              label={id}
            />
          </div>
      );
    });
  };

  render() {
    return (
      <div style={{ margin: "10px 10px 10px 10px" }}>
        <Redirect to={this.props.row.link} />
        <form
          className="ui form"
          onSubmit={(event) => {
            event.preventDefault();
            this.handleSubmit(event);
          }}
        >
          <this.Helper />
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
        <button
          className="ui button"
          type="submit"
          style={{ marginTop: "10px" }}
          onClick={() => {
            this.props.fetchData("", "");
            this.props.rowClick({ link: "/table", num: 0 });
          }}
        >
          Go Back
        </button>
      </div>
    );
  }
}

function mapStateToProps({ form, row, data }) {
  return { form, row, data };
}

DataAdd = connect(mapStateToProps, actions)(DataAdd);
Input0 = connect(mapStateToProps, actions)(Input0);

export default reduxForm({
  form: "Adder", // a unique identifier for this form
})(DataAdd);
