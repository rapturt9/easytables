import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions";
import ids from "../ids";
import { Dropdown } from 'semantic-ui-react';
import 'react-widgets/dist/css/react-widgets.css';

const idsObj = ids.map((id) => {
    return { key: id, value: id, text:id};
});

console.log(idsObj);

const DropdownExampleSearchSelection = props => (
    <Dropdown
      selection {...props.input}
      value={props.input.value}
      onChange={(param,data) => {props.input.onChange(data.value)}}
      placeholder={props.label} 
      options={idsObj}
    />
  )

let DataInput = (props) => {
  const { pristine, reset, submitting } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted!');
    props.fetchData(props.form.data.values.key,props.form.data.values.value);
  }

  return (
    <div style={{margin: "10px 10px 10px 10px"}}>
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="field" style={{width:"50%"}}>
            <Field
            name="key"
            component={DropdownExampleSearchSelection}
            label="key"
          />
            </div>

            <div className="field" style={{width:"50%"}}>
            <Field
            name="value"
            component="input"
            type="text"
            placeholder="value"
          />
            </div>
            <button className="ui button" type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button className="ui button" type="submit" onClick={() => {
            reset();
            props.fetchData("","");
            }} disabled={pristine || submitting}>
          Reset
        </button>
        <button className="ui button" type="reset" onClick={() => {
            //reset();
            //props.fetchData("","");
            reset();
            props.rowClick({ link: "/add", num: 0 });
            }}>
          Add item
        </button>
        </form>
    </div>
  );
};

function mapStateToProps({form}) {
    return {form};
  }

DataInput=connect(mapStateToProps, actions)(DataInput);

export default reduxForm({
    form: 'data' // a unique identifier for this form
  })(DataInput)