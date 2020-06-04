import React from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions";

//const ids = ["applicationci", "portfolio", "director", "srManager", "contacts", "account", "applicationName"];
import ids from "../ids";

const TableTop = ({ data }) => {
  const keys = !data[0] || Object.keys(data[0]);
  if (keys === true) {
    return [];
  }
  return ids.map((val) => {
    return <Table.HeaderCell key={val}>{val}</Table.HeaderCell>;
  });
};

const TableRow = ({ data, num }) => {
  const keys = !data[num] || Object.keys(data[num]);
  if (keys === true) {
    return [];
  }
  return ids.map((val) => {
    if (!(val in data[num])) {
      return <Table.Cell key={val}>N/A</Table.Cell>;
    }
    if ("S" in data[num][val]) {
      return <Table.Cell key={val}>{data[num][val]["S"]}</Table.Cell>;
    }
    return <Table.Cell key={val}>Array</Table.Cell>;
  });
};
let TableBody = (props) => {
  const clickRow = (i) => {
    props.rowClick({ link: "/row", num: i });
  };

  const keys = !props.data[0] || Object.keys(props.data);
  if (keys === true) {
    return [<Table.Row></Table.Row>];
  }
  let arr = [];
  for (let i = 0; i < keys.length; i++) {
    arr.push(
      <Table.Row
        key={i}
        onClick={() => clickRow(props.data[i]["applicationci"]["S"])}
      >
        <TableRow data={props.data} num={i} />
      </Table.Row>
    );
  }
  return arr;
};
TableBody = connect(null, actions)(TableBody);

class DataTable extends React.Component {
    state = {data: this.props.data}

    componentDidUpdate () {
        if(this.props.data!==this.state.data){
            this.setState({data: this.props.data});
            console.log(this.props.data);
            console.log("change");
        }
      }    

  render = () => {
    return (
        <div>
        <Redirect to={this.props.row.link ? this.props.row.link : "/table"} />
        <Table celled>
            <Table.Header>
            <Table.Row>
                <TableTop data={this.state.data} />
            </Table.Row>
            </Table.Header>

            <Table.Body>
            <TableBody data={this.state.data} />
            </Table.Body>
        </Table>
        </div>
    );
  }
};

function mapStateToProps({ data, row, form }) {
  return { data, row, form };
}

export default connect(mapStateToProps, actions)(DataTable);
