<template>
  <v-simple-table dense>

    <template v-slot:default>
      <router-link class="link" to="/InsertProduct">
        <v-btn
            class="show-button"
            type=text>
          Add Product
        </v-btn>
      </router-link>

      <div class="d-flex flex-row" >
        <input
            type="text"
            placeholder="search"
            class="search-input"
            v-model="searchValue"
        />
        <v-text-field
            class="filter-input"
            v-model="ProductNameFilter"
            v-on:keyup="FilterFn()"
            placeholder="Filter"></v-text-field>

        <v-btn @click="sortResult('productName',true)">
          Filter
        </v-btn>
        <v-btn @click="sortResult('productName',false)">

        </v-btn>
      </div>
      <thead>

      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Price
        </th>
        <th class="text-left">
          Description
        </th>
        <th class="text-left">
          Action
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(product, index) in products"
          :key="index"
      >
        <td>{{ product.productName}}</td>
        <td>{{ product.price}}</td>
        <td>{{ product.description}}</td>
        <td>
          <v-btn
              class="show-button"
              flat color="red"
              @click="deleteProduct(product.id)">
            Delete
          </v-btn>
          <router-link class="link" to="/InsertProduct" >
          <v-btn
              class="show-button"
              @click="updateProduct(product.id)">
            Edit
          </v-btn>
          </router-link>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>




<script>
/* eslint-disable */

import axios from 'axios';
export default {
  name:'Product',
  data() {
    return {
      updatingProduct: {},
      products: [
        {productName:'',
        price:'',
        description:''}
      ],
      productName:"",
      searchValue:''


    }
  },
computed:{
    productsList(){
      if(searchValue.trim().leght > 0){
        return this.products.filter((product) => product.productName.toLowerCase().include(this.searchValue.trim().toLowerCase()))
      }
      return this.products
    }
},
  mounted() {
    axios.get('http://localhost:8090/api/v1/Products')
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },

  methods: {
    deleteProduct(id) {
      let apiURL = `http://localhost:8090/api/v1/Products/` + id;
      if (window.confirm("Do you really want to delete?")) {
        axios.delete(apiURL).then(response => {
          window.location.reload()
        })
            .catch(function (error) {
              console.log(error.response)
            })
      }
    },
    updateProduct(id) {
      this.$emit('update-product', id);
    },
    FilterFn() {

      var productName = this.productName;

      this.products = this.products.filter(
          function (el) {
            return el.productName.toString().toLowerCase().includes(
                productName.toString().trim().toLowerCase()
            )
          });
    },
    sortResult(prop, asc) {
      this.products = this.products.sort(function (a, b) {
        if (asc) {
          return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
          return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
      })
    }
  }
};
</script>

<style>
v-simple-table{
  width: 50%;
  margin: 550px;
  position: relative;
}
th{
  border-radius: 4px;
  border: 2px solid black ;
  padding: 55px;
  padding-top: 12px;
  padding-bottom:12px ;
}
td{
  padding-left: 55px;
  padding-top: 10px;
}
.d-flex{
  width: 710px;
}
.search-input{
  width: 280px;
  height: 30px;
  border-radius: 2px;
}
</style>