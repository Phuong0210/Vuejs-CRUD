<template>
    <div>
      <router-link class="link" to="/handleProduct">
      <v-btn type="button"
             class="show-button"
             flat color="blue"
             data-bs-toggle="modal"
             data-bs-target="#exampleModal"
             @click="addClick()">
        Add product
      </v-btn>
      </router-link>
      <div class="d-flex flex-row" >
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
      <table class="table table-striped">
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
        <tr v-for="(product, index) in products"
            :key="index">
          <td>{{product.productName}}</td>
          <td>{{product.price}}</td>
          <td>{{product.description}}</td>
          <td>
            <router-link class="link" to="/editProduct" >
            <button type="button"
                    class="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="updateProduct(product.id)" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </button>
            </router-link>
            <button type="button" @click="deleteClick(product.id)"
                    class="btn btn-light mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <br>
    </div>
  </template>

<script>
import axios from "axios";

export default {
  name: "allProducts.vue",
  data(){
    return{
      products: [],
      productName: "",
      price: null,
      description: "",
      id:0,
      ProductNameFilter:"",
      productsWithoutFilter:[],
      updatingProduct: {},
    }
  },
  methods:{
    refreshData(){
      axios.get('http://localhost:8090/api/v1/Products')
          .then((response)=>{
            this.products=response.data;
          });
    },
    addClick(){
      this.modalTitle="Add product";
      this.id=0;
      this.productName="";
      this.price="";
      this.description=""
    },
    // editClick(product){
    //   this.modalTitle="Edit product";
    //   this.id=product.id;
    //   this.productName=product.productName;
    //   this.price=product.price;
    //   this.description=product.description
    // },
    updateProduct(id) {
      this.$emit('update-product', id);
    },

    deleteClick(id){
      if(!confirm("Are you sure?")){
        return;
      }
      axios.delete(`http://localhost:8090/api/v1/Products/`+id)
          .then(()=>{
            this.refreshData();

          })
    },
    FilterFn(){

      var ProductNameFilter=this.ProductNameFilter;

      this.products=this.productsWithoutFilter.filter(
          function(el){
            return el.ProductNameFilter.toString().toLowerCase().includes(
                ProductNameFilter.toString().trim().toLowerCase()
                )
          });
    },
    sortResult(prop,asc){
      this.products=this.productsWithoutFilter.sort(function(a,b){
        if(asc){
          return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
        }
        else{
          return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
        }
      })
    }

  },
  mounted:function(){
    this.refreshData();
  }

}
</script>1` <q></q>

<style scoped>
.d-flex{
  width: 710px;
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
</style>