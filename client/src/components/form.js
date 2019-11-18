import React ,{Component}from 'react'
import { Button, Segment, Form } from 'semantic-ui-react'
import { observer } from 'mobx-react';


@observer
class  ProductForm extends Component {
   
    render(){
        return <Segment inverted  color='grey'>
                <Form inverted color = "grey">
                <Form.Group widths='equal'>
                    <Form.Input fluid 
                    label='Name' 
                    placeholder='Name' 
                    />
                    <Form.Input fluid 
                    label='Price' 
                    placeholder='Price' 
                    />
                    <Form.Input 
                    label='Description' 
                    type="textarea"
                    placeholder='Description' 
                    />
                  
                </Form.Group>
                <Button type='submit'>Submit</Button>
                </Form>
            </Segment>
           
    }
}
export default ProductForm
