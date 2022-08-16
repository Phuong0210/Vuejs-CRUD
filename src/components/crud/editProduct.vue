<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>

        <div class="modal-body">

          <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <v-text-field type="text" class="form-control" v-model="productName"></v-text-field>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">price</span>
            <v-text-field type="text" class="form-control" v-model="price"></v-text-field>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">description</span>
            <v-text-field type="text" class="form-control" v-model="description"></v-text-field>
          </div>
          <v-btn
              class="show-button"
              flat color="yellow"
              type="button" @click="updateClick(id)"
              v-if="id==id" >
           update
          </v-btn>


        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "editProduct.vue",
  props: {
    updatingProduct: Object,
  },
  data(){
    return{
      products: [],
      productName: "",
      price: null,
      description: "",
      id:0
    }
  },
  watch: {
    updatingProduct(product) {
      if (product) {
        this.products = product;
      }
    }
  },

  methods:{
    refreshData(){
      axios.get('http://localhost:8090/api/v1/Products')
          .then((response)=>{
            this.products=response.data;
          });
    },
    editClick(product){
      this.modalTitle="Edit product";
      this.id=product.id;
      this.productName=product.productName;
      this.price=product.price;
      this.description=product.description
    },
    updateClick(id){
      axios.put(`http://localhost:8090/api/v1/Products/`+ id,{
        productName:this.productName,
        price:this.price,
        description:this.description

      })

          .then((response)=>{
            this.refreshData();
            alert(response.data='successfully updated a new product');
            window.location.reload();
          });
    },
  },
  mounted:function(){
    this.refreshData();
  }

}
</script>

<style scoped>
.modal-body{
  width: 50%;
  margin: 0 auto;
  position: relative;
}
</style>