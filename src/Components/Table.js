import React, {useEffect} from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions";

import ids from "../ids";

const TableTop = ({ data }) => {
  /*const keys = !data[0] || Object.keys(data[0]);
  if (keys === true) {
    return [];
  }*/
  return ids.map((val) => {
    return <Table.HeaderCell key={val}>{val}</Table.HeaderCell>;
  });
};

let TableRow = ({ data, num, query,form}) => {
  const keys = !data[num] || Object.keys(data[num]);
  //console.log(form.data.values);
  //data[num][Object.keys(query)[0]] query[Object.keys(query)[0]]
  // || query && !data[num][Object.keys(query)[0]].startsWith(query[Object.keys(query)[0]])
  //console.log((!form.data.values));
  //console.log(data[num][form.data.values.key]);
  if (keys === true || (form.data&&form.data.values&&Object.keys(form.data.values).length>1&&(!((form.data.values.key in data[num])&&data[num][form.data.values.key])||!data[num][form.data.values.key].startsWith(form.data.values.value)))) {
    console.log(!(Object.keys(query).length===0) && data[num][Object.keys(query)[0]]);
    console.log(!(Object.keys(query).length===0) && query[Object.keys(query)[0]]);
    return [];
  }
  return ids.map((val) => {
    if (!(val in data[num])) {
      return <Table.Cell key={val}>N/A</Table.Cell>;
    }
    //console.log(data[num])
      return <Table.Cell key={val}>{data[num][val]}</Table.Cell>;
  });
};
function mapStateToProps2({form}) {
  return { form };
}
TableRow=connect(mapStateToProps2, actions)(TableRow);
let TableBody = (props) => {
  useEffect(() => {
    console.log(props);
    console.log("Mount item");
    return () => console.log("Unmount item");
  },props.query);
  console.log(props.query);
  const clickRow = (i) => {
    props.rowClick({ link: "/row", num: i });
  };
  console.log(props.data)
  let keys = props.data===[] || props.data.length===0 || props.data;
  console.log(keys);
  if (keys === true) {
    return <Table.Row></Table.Row>;
  }
  let arr = [];
  console.log(keys);
  for (let i = 0; i < keys.data.length; i++) {
    arr.push(
      <Table.Row
        key={i}
        onClick={() => clickRow(keys.data[i]["appci"])}
      >
        <TableRow data={keys.data} query={props.query} num={i} />
      </Table.Row>
    );
  }
  console.log(arr);
  return arr;
};
TableBody = connect(null, actions)(TableBody);

class DataTable extends React.Component {
    state = {data: this.props.data, query: this.props.query}

    componentDidMount () {
      this.setState({data: this.props.data});
    }
    shouldComponentUpdate = (nextProps, prevState) => {
      if(nextProps.query!==this.state.query){
        console.log(nextProps.query);
        this.setState({query:nextProps.query});
        console.log(this.state.query);
        return true;
      }
      if(JSON.stringify(nextProps.data)!==JSON.stringify(this.state.data)||nextProps.row.link!==this.props.row.link){
          this.setState({data: nextProps.data});
          console.log(this.state.data);
          console.log("change");
          return true;
      }
      return false;
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(JSON.stringify(prevProps.data)!==JSON.stringify(this.state.data)){
            this.setState({data: this.props.data});
            console.log(this.props.data);
            console.log("change");
        }
      }    

  render = () => {
    console.log(this.state.query);
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
            <TableBody data={this.state.data} query={this.state.query} key={this.state.query}/>
            </Table.Body>
        </Table>
        </div>
    );
  }
};

function mapStateToProps({ data, row, form, query}) {
  return { data, row, form, query };
}

export default connect(mapStateToProps, actions)(DataTable);
