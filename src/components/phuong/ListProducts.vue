<template>
  <div class="search-wrapper">
    <v-switch
      v-model="shouldFilterOnlyDeleted"
      label="deleted"
      color="orange"
      hide-details
    >
    </v-switch>
  </div>
  <div class="container">
    <v-table>
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
          v-for="product in filteredProducts"
          :key="product.name"
      >
        <td>{{ product.productName }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.description }}</td>
        <td>
          <v-btn
              color="blue"
              plain
              @click="updateProduct(product.id)"
          >
            Update
          </v-btn>

          <v-btn
              color="error"
              plain
              @click="deleteProduct(product.id)"
          >
            Delete
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ListProducts",

  data() {
    return {
      updatingProduct:{},
      products: [],
      order: 0,
      search:"",

      shouldFilterOnlyDeleted: true,
    }
  },
  computed: {
    filteredProducts() {
      if (this.shouldFilterOnlyDeleted) {
        return this.products.filter(product => product.isDeleted);
      }

      return this.products;

      // if (!this.search) {
      //   return this.products;
      // } else {
      //   return this.products.filter(product => {
      //      return product.productName.toLowerCase().includes(this.search.toLowerCase())
      //   })
      // }
    },
    // filterDeleted(){
    //   if (!this.search) {
    //     return this.products;
    //   } else {
    //     return(
    //         axios.get("http://localhost:8090/api/v1/Products/Deleted"))
    //   }
    // }
  },
  methods: {
    async show() {
      await axios.get('http://localhost:8090/api/v1/Products')
          .then((response) => {
            console.log(response.data);
            this.products = response.data;
            console.log('products', this.products);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    updateProduct(id) {
      console.log('update')
      this.$router.push({
        name: 'HandleProduct',
        params: {
          id: id,
        }
      });
    },

    deleteProduct(id){
      if (window.confirm("Do you really want to delete?"))
        axios.delete(`http://localhost:8090/api/v1/Products/` +id)
          .then(response => {
            this.show(response);
          });

    },
  },
  ///
  updatingProduct(id) {
    this.$emit('update-product', id);
  },


  async mounted() {
    console.log('mounted');
    await this.show();
  },
}

</script>

<style scoped>
.container{
  display: flex;
  text-align: center;
  padding:0 5% 0 20%;

}
.switch{
  padding: 2% 10% 0 20%;
}
v-table thead {
  padding: 30%;
}

v-table thead th {
  padding: 30px;
}

v-table tbody td {
  padding: 30px;
}
search-wrapper{
  width: 50px;
  position: relative;
}
</style>
