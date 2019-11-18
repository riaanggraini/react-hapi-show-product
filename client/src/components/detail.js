import React from 'react'
import { Icon, Header, Image, Modal } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'; 


export default function ProductCard({product}) {
  return (
    <Modal trigger={<Icon name="eye"></Icon>} centered={false}>
  <Modal.Header>{product.name}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={product.url} />
      <Modal.Description>
        <Header>{ReactHtmlParser(product.description)}</Header>   
      </Modal.Description>
    </Modal.Content>
  </Modal>
  )
}
