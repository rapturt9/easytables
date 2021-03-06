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
  state = { val: this.props.id, data: {}};

  handleChange = (event) => {
    this.setState({ val: event.target.value });
  };

  render = () => {
    console.log(this.props.data.data[this.props.id]);
    if(this.state.data!==this.props.data.data){
        if (!(this.props.label in this.props.data.data)) {
            this.setState({ val: "N/A" });
        } 
        this.setState({data: this.props.data.data, val:this.props.data.data[this.props.id]});
    }
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
    return <Input />;
  };
}

class Input1 extends Component {
  state = { val: this.props.label, data: this.props.data.data };

  handleChange = (event) => {
    this.setState({ val: event.target.value });
  };

  render = () => {

    return (
      <div>
        <TextArea
          {...this.props.input}
          type={this.props.type}
          id={this.props.id}
          style={{ height: "100px" }}
          value={this.state.val}
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
      </div>
    );
    return <TextArea style={{ height: "100px" }} />;
  };
}

class DataRow extends Component {
  componentDidMount() {
    //this.props.fetchData("applicationci", this.props.row.num);
    console.log(this.props.data.data);
  }

  handleSubmit = (event) => {
    let object=this.props.form.Changer.values || {};
    object[ids[0]]=this.props.row.num;
    this.props.changeData(object);
    this.props.fetchData("", "");
  };

  Helper = () => {
    return ids.map((id) => {
        if(id===ids[0]){
          console.log(this.props.data.data[id]);
            return (
                <div className="field" style={{ width: "50%" }}>
                  <label>{id}</label>
                  <input
                    disabled
                    name={id}
                    type="text"
                    id={id}
                    value={this.props.data.data[id]}
                  />
                </div>
            );
        }
        console.log(this.props.data.data[id]);
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
      console.log(this.props.row.link);
    return (
      <div style={{ margin: "10px 10px 10px 10px" }}>
        <Redirect to={this.props.row.link} />
        <form className="ui form" onSubmit={event => {
            event.preventDefault();
            this.props.rowClick({ link: "/table", num: 0 });
            this.handleSubmit(event);
            //this.props.rowClick({ link: "/", num: 0 });
            }}>
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
            this.props.rowClick({ link: "/table", num: 0 });
            this.props.fetchData("", "");
            //this.props.rowClick({ link: "/", num: 0 });
          }}
        >
          Go Back
        </button>
        <button
          className="ui button"
          type="submit"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            this.props.deleteData(this.props.row.num);
            this.props.rowClick({ link: "/table", num: 0 });
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

function mapStateToProps({ form, row, data }) {
  return { form, row, data };
}

DataRow = connect(mapStateToProps, actions)(DataRow);
Input0 = connect(mapStateToProps, actions)(Input0);
Input1 = connect(mapStateToProps, actions)(Input1);

export default reduxForm({
  form: "Changer" // a unique identifier for this form
})(DataRow);
