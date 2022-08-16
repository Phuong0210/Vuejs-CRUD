<template>
  <div>

    <v-btn type="button"
           class="show-button"
           flat color="blue"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="addClick()">
      Add product
  </v-btn>

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
          <button type="button"
                  class="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="editClick(product)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
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
                flat color="red"
                type="button" @click="createClick()"
                    v-if="id==0" >
              Create
            </v-btn>
            <v-btn
                class="show-button"
                flat color="yellow"
                type="button" @click="updateClick(id)"
                    v-if="id!=0" >
              Update
            </v-btn>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "listProducts",
  data(){
    return{
     products: [],
      productName: "",
      price: null,
      description: "",
      id:0
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
    editClick(product){
      this.modalTitle="Edit product";
      this.id=product.id;
      this.productName=product.productName;
      this.price=product.price;
      this.description=product.description
    },
    createClick(){
      axios.post('http://localhost:8090/api/v1/Products/insert',{
        productName:this.productName,
        price:this.price,
        description:this.description
      })
          .then((response)=>{
            this.refreshData();
            alert(response.data='successfully added a new product');
            window.location.reload();
          });
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
    deleteClick(id){
      if(!confirm("Are you sure?")){
        return;
      }
      axios.delete(`http://localhost:8090/api/v1/Products/`+id)
          .then(()=>{
            this.refreshData();

          })

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