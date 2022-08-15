<template>

  <div clas="container">
    <h1>Get Product</h1>


    <table class="table table-striped table-borderes">
      <thead>
      <tr>
        <th class="center">Product Name</th>
        <th class="center">Price</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
        <tr :v-for="pro in Product">
        <td class="text-left"> {{pro.productName }}</td>
        <td class="text-left"> {{pro.price }}</td>
        <td class="text-left"> {{ pro.description}}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/">
      <button class="brn btn-large btn-block btn-success full-width"> Add Prodcut </button>
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios';
export default {
  name:'user',
  data() {
    return {
      Product: [],

    }
  },

  mounted() {
    axios.get('http://localhost:8090/api/v1/Products')
        .then((response) => {
          console.log(response.data);
          this.Product = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },

}
</script>

<style>

</style>