import React, { Component ,Fragment} from 'react';
import { Card, Image , Icon, Pagination, Label} from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ProductCard from './detail'

@observer
class CardExampleImageCard extends Component {
    componentDidMount() {
        this.props.store.getProducts(1, 50)
      }
  
    render() {
        const { products } = this.props.store;
          return ( <div>
          <Card.Group itemsPerRow={3}>
            <Fragment>        
              {products.data
                ? products.data.map((product) => {
                    return <Card  key={product.id} >
                         <Image src={product.url} wrapped ui={false} size='tiny' />
                         <Card.Content>
                            <Card.Header>{product.name}</Card.Header>
                            <Card.Meta>{`Rp. ${product.price}`}</Card.Meta>
                            <Card.Content extra>
                            <Label>
                            <ProductCard product={product}/>
                            </Label>
                            <Label>
                            <Link to={`/product/${product.id}`}><Icon name="edit"></Icon></Link>
                            </Label>
                            <Label>
                            <Icon name='trash alternate' onClick={() => this.props.store.deleteProduct(product.id)
                                .then(()=>{ window.location.reload(); 
                                })}/>
                            </Label>
                         </Card.Content>
                        </Card.Content>
                    </Card>
                  })
                : "Loading..."}
            </Fragment>
            </Card.Group>
            <Pagination 
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={10}
            />
            </div>
            
          );
}
}

export default CardExampleImageCard