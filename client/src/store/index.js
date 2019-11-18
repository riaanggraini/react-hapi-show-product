import { observable, action ,runInAction, computed} from 'mobx';
import axios from 'axios';
const baseUrl = 'http://localhost:4000'

class Store {
    @observable errors = {};
    @observable products = {};
    @observable product = {};
    @observable id = 0;
    
    @observable values = {
        price: '',
        name: '',
        description: '',
      };

    @action 
    setId(id) {
        this.id = id
    }

    @action 
    setPrice(price) {
        this.values.price = price;
    }

    @action 
    setName(name) {
        this.values.name = name;
    }

    @action 
    setDescription(description) {
        this.values.description = description;
    }
    // console.log(this.id)

    @action
    handleErrors = (err) => {
      if( err.code === 400) {
        this.errors = {global: err.message,}
      } else {
        this.errors = {global: err.message}
      }
    }

    @action
    getProducts=async(page, size) => {
       try{
        const response = await axios({
		    method: 'GET',
		    timeout: 10000,
		    url : `${baseUrl}/api/products?page=${page}&size=${size}`,
        });
        runInAction('populate entities', () => {
            this.products = response.data;
          });
       
       } catch(err){
            this.handleErrors(err);
       }
    }
    @action
    getProductById = async(id) => {
       try{
        const response = await axios({
		    method: 'GET',
		    timeout: 10000,
		    url : `${baseUrl}/api/product/${id}`,
        });
        runInAction('populate entities', () => {
            this.product = response.data;
          });
       
       } catch(err){
            this.handleErrors(err);
       }
    }
    @action
    deleteProduct = async(id) => {
       try{
        const response = await axios({
		    method: 'DELETE',
		    timeout: 10000,
		    url : `${baseUrl}/api/product/${id}`,
        });
        runInAction('populate entities', () => {
            this.product = response.data;
          });
       
       } catch(err){
            this.handleErrors(err);
       }
    }
    @action
    updateProduct = async() => { 
        try{
         const response = await axios({
             method: 'PATCH',
             timeout: 10000,
             data : {
                 price :this.values.price,
                 name : this.values.name,
                 description :this.values.description
             },
             url : `${baseUrl}/api/product/${this.id}`,
         });
       
         runInAction('populate entities', () => {
             this.product = response.data;
           });
           
        
        } catch(err){
             this.handleErrors(err);
        }
     }
     @computed 
     get selected() {
        return this.id
      }

}

export default Store