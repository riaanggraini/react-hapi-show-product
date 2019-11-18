import React, { Component } from 'react';
import Card from '../components/card';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer

class ProductListPage extends Component {
    render(){
        return (
            <div>
                <h1>
                    List Of Products
                    <hr></hr>
                    <Card store={this.props.store} />
                </h1>
            </div>
        )
    }
}
export default ProductListPage