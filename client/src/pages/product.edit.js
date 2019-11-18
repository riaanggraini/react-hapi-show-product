import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ProductForm from '../components/form'

@inject('store')
@observer

class ProducEditPage extends Component {
    render(){
        return (
            <div>
                <h1>
                    Update Product
                    <hr></hr>
                    <ProductForm store={this.props.store} />
                </h1>
            </div>
        )
    }
}
export default ProducEditPage