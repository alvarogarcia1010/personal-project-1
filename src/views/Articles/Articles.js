import React, { Component } from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {confirmDeleteFireToast, updateObject} from '../../services/helpers'
import ArticleManagement from '../../services/ArticleManagement'
import CustomTable from '../../components/CustomTable'
import Header from '../../components/Header'
import ArticleFom from './ArticleFom'


const initialSelectedArticle = {
  id:"",
  sku: "",
  name: "",
  quantity: "",
  price: "",
  remark: "",
  image_url: ""
}

class Articles extends Component {

  state = {
    article: {...initialSelectedArticle}
  };

  tableRef = React.createRef();

  columns = [
    { field: 'id', hidden:true},
    { field: 'price', hidden:true},
    { title: "Imagen", field: "image_url", width:60, render: rowData => <img src={rowData.image_url} style={{width: 100}} alt=""/> },
    { title: 'Sku', field: 'sku', cellStyle:{textAlign:'center',padding:"8px", fontSize:"14px"}, width:80},
    { title: 'Nombre', field: 'name'},
    { title: 'Cantidad', field: 'quantity', cellStyle:{textAlign:'center',padding:"8px", fontSize:"14px"}, width:35},
    { title: 'Precio', field: 'price_label', cellStyle:{textAlign:'right',padding:"8px", fontSize:"14px"}, width:55},
    { title: 'Descripción', field: 'remark'},
  ];

  data = query => new Promise(async (resolve, reject) => {
    const response = await ArticleManagement.getArticles(query, this.props.token);

    resolve({
      data: response.rows,
      page: response.page - 1,
      totalCount: response.records,
    })
  })

  refreshTableAction = () => {
    this.tableRef.current && this.tableRef.current.onQueryChange()
  };

  searchArticle = (search) => {
    this.tableRef.current && this.tableRef.current.onQueryChange({search: search})
  }

  editStatusAction = (event, rowData) => {
    event.stopPropagation();
    let article = updateObject(initialSelectedArticle, {...rowData})
    delete article.tableData;
    delete article.price_label;
    
    this.setState({article: article})
  }

  cleanState = () => {
    this.setState({article: initialSelectedArticle});
  }

  confirmDeleteAction = async (event, rowData) => {
    confirmDeleteFireToast(async () => {
      
      const response = await ArticleManagement.deleteOne(rowData.id, this.props.token);

      if(response.data)
      {
        this.refreshTableAction()
      }
    }, "El artículo se ha eliminado con exito.")
  }

  render() {
    return (
      <>
        <Header 
          name={this.props.name} 
          placeholder={"Buscar artículo"}
          onSearch={this.searchArticle}
        />
        <Container fluid>
          <Row className="my-3 mx-0">
            <Col lg={4} className="mb-4">
              <ArticleFom
                token={this.props.token}
                article={this.state.article}
                onRefreshTableClicked={this.refreshTableAction}
                cleanState={this.cleanState}
              />
            </Col>
            <Col lg={8}>
              <CustomTable 
                title="Artículos"
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

export default connect(mapStateToProps)(Articles);

