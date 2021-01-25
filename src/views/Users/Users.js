import React, { Component } from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {confirmDeleteFireToast, updateObject} from '../../services/helpers'
import UserManagement from '../../services/UserManagement'
import CustomTable from '../../components/CustomTable'
import Header from '../../components/Header'
import UserFom from './UserFom'

const initialSelectedUser = {
  id:"",
  name: "",
  username: "",
  email: "",
  password: "",
  phone_number: "",
  birth_date: ""
}

class Users extends Component {

  state = {
    user: {...initialSelectedUser}
  };

  tableRef = React.createRef();

  columns = [
    { field: 'id', hidden:true},
    { field: 'birth_date', hidden:true},
    { title: 'Nombre', field: 'name'},
    { title: 'Usuario', field: 'username', cellStyle:{textAlign:'center',padding:"8px", fontSize:"14px"}},
    { title: 'Correo eléctronico', field: 'email'},
    { title: 'Teléfono', field: 'phone_number', cellStyle:{textAlign:'center',padding:"8px", fontSize:"14px"}, width:75},
    { title: 'Fecha de nacimiento', field: 'birth_date_with_format', cellStyle:{textAlign:'center',padding:"8px", fontSize:"14px"}, width:75},
  ];

  data = query => new Promise(async (resolve, reject) => {
    const response = await UserManagement.getUsers(query, this.props.token);

    resolve({
      data: response.rows,
      page: response.page - 1,
      totalCount: response.records,
    })
  })

  refreshTableAction = () => {
    this.tableRef.current && this.tableRef.current.onQueryChange()
  };

  searchUser = (search) => {
    this.tableRef.current && this.tableRef.current.onQueryChange({search: search})
  }

  editStatusAction = (event, rowData) => {
    event.stopPropagation();
    let user = updateObject(initialSelectedUser, {...rowData})
    delete user.tableData;
    delete user.birth_date_with_format;
    
    this.setState({user: user})
  }

  cleanState = () => {
    this.setState({user: initialSelectedUser});
  }

  confirmDeleteAction = async (event, rowData) => {
    confirmDeleteFireToast(async () => {
      
      const response = await UserManagement.deleteOne(rowData.id, this.props.token);

      if(response.data)
      {
        this.refreshTableAction()
      }
    }, "El usuario se ha eliminado con exito.")
  }

  render() {
    return (
      <>
        <Header 
          name={this.props.name} 
          placeholder={"Buscar usuario"}
          onSearch={this.searchUser}
        />
        <Container fluid>
          <Row className="my-3 mx-0">
            <Col lg={4} className="mb-4">
              <UserFom
                token={this.props.token}
                user={this.state.user}
                onRefreshTableClicked={this.refreshTableAction}
                cleanState={this.cleanState}
              />
            </Col>
            <Col lg={8}>
              <CustomTable 
                title="Usuarios"
                columns={this.columns} 
                data={this.data}
                ref={this.tableRef}
                confirmDeleteAction={this.confirmDeleteAction}
                onEditClickedAction={this.editStatusAction}
                onRefreshTableClicked={this.refreshTableAction}
              />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(Users);
