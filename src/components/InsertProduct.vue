<template>
  <div class="container">

    <form class="form-input">

      <div class="well">

        <div class="form-group">

          <v-text-field :rules="rules" v-model="product.productName" placeholder="ProductName"></v-text-field>

        </div>
        <div class="form-group">

          <v-text-field :rules="rules" v-model="product.price" placeholder="Price"></v-text-field>
        </div>
        <div class="form-group">

          <v-text-field :rules="rules" v-model="product.description" placeholder="Description"></v-text-field>
        </div>
      </div>

      <router-link to="/">
        <v-btn
            class="show-button"
            flat color="blue"
            type="submit"
            @click="submitProduct()">

          Submit
        </v-btn>
      </router-link>

    </form>

  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'InsertProduct',

  props: {
    updatingProduct: Object,
  },

  data() {
    return {
      msg: '',
      product: { productName: '', price: '', description: '' },

    }
  },

  watch: {
    updatingProduct(product) {
      if (product) {
        this.product = product;
      }
    }
  },

  methods: {
  submitProduct() {

      let newProduct = {
        productName: this.product.productName,
        price:this.product.price,
        description: this.product.description


      }
      console.log(newProduct);
      axios.post('http://localhost:8090/api/v1/Products/insert',newProduct)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);

          });

    },
    updateProduct(id) {
      let apiURL = `http://localhost:8090/api/v1/Products/` + id;
      axios.get(apiURL).then(response => {
        console.log('res', response)
        this.updatingProduct = response.data;
        console.log(this.updatingProduct)
      })
          .catch(function (error) {
            console.log(error.response)
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-input{
  width: 50%;
  margin: 0 auto;
  position: relative;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.show-button{
  border: #0a0a0a solid 1px;
}
</style>