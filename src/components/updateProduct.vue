<template>
  <div class="container">

    <form class="form-input">

      <div class="well"
           v-for="(product, index) in products"
           :key="index">
        <h4> Edit Product</h4>
        <div class="form-group">
          <label class="pull-left"> Product Name </label>
          <v-text-field  v-model="product.productName" placeholder="ProductName"></v-text-field>

        </div>
        <div class="form-group">
          <label class="pull-left"> Price</label>
          <v-text-field v-model="product.price" placeholder="Price"></v-text-field>
        </div>
        <div class="form-group">
          <label class="pull-left"> Description </label>
          <v-text-field  v-model="product.description" placeholder="Description"></v-text-field>
        </div>
      </div>

      <router-link to="/users"
                   v-for="(product, index) in products"
                   :key="index">
        <v-btn type="submit" @click="editProduct(product.id)">
          Submit
        </v-btn>

      </router-link>
    </form>

  </div>
</template>

<script>
/* eslint-disable */
import {onMounted} from "vue";
import axios from 'axios';

export default {
  name: 'editProduct',
  data() {
    return {
      products: [],
      productName: "",
      price: null,
      description: ""

    };
  },
  methods: {
    editProduct(id) {
      let self = this;
      axios
          .put(`http://localhost:8090/api/v1/Products/`+id, {
            productName: self.productName,
            price: self.price,
            description: self.description
          })
          .then(function() {});
    }
    }
  }
</script>


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
</style>