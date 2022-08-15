<template>
  <div class="container">

    <form>

      <div class="well">
        <h4> Add Product</h4>
        <div class="form-group">
          <label class="pull-left"> Product Name </label>
          <v-text-field :rules="rules" v-model="products.productName" placeholder="ProductName"></v-text-field>

        </div>
        <div class="form-group">
          <label class="pull-left"> Price</label>
          <v-text-field :rules="rules" v-model="products.price" placeholder="Price"></v-text-field>
        </div>
        <div class="form-group">
          <label class="pull-left"> Description </label>
          <v-text-field :rules="rules" v-model="products.description" placeholder="Description"></v-text-field>
        </div>
      </div>

      <router-link to="/users">
        <v-btn type="submit" @click="addToAPI()">
          Submit
        </v-btn>

      </router-link>
      <v-btn>
        go
      </v-btn>
    </form>

  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'hello',
  data() {
    return {
      msg: '',
      products: { productName: '', price: '', description: '' },

    }
  },

  methods: {
    addToAPI() {

      let newProduct = {
        productName: this.products.productName,
        price:this.products.price,
        description: this.products.description


      }
      console.log(newProduct);
      axios.post('http://localhost:8090/api/v1/Products/insert',newProduct)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);

          });

    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>