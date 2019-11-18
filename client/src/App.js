import React, {Component} from 'react';
import {  Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ProductListPage from './pages/product.list'
import ProducEditPage from './pages/product.edit'

class App extends Component {
  render() {
    return (
      <div>
        <div className="ui two item menu">
        </div>
        <Container>
          <Route exact path="/product/:id" component={ProducEditPage}/>
          <Route exact path="/" component={ProductListPage}/>
        </Container>
      </div>
    )
  }
}

export default App;