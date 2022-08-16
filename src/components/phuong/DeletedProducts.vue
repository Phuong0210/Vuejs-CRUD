<template>
  <v-table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="product in products" :key="product.productName">
      <th scope="row">{{ product.productName }}</th>
      <td>{{ product.price }}</td>
      <td>{{ product.description }}</td>
      <td>
        <v-btn color="primary" @click="restore(product.id)">
          Restore
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  name: "DeletedProducts",
  data() {
    return {
      products: []
    }
  },
  async mounted() {
    try {
      this.products = (await axios.get("http://localhost:8090/api/v1/Products/Deleted")).data
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async restore(id) {
      try {
        if (confirm("Do you want to restore?")) {
          const res = await axios.post(`http://localhost:8090/api/v1/Products/Restore/${id}`)
          console.log(res)
          await this.$router.push("/ListProducts")
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  v-table thead {
    padding: 30%;
  }

  v-table thead th {
    padding: 30px;
  }

  v-table tbody td {
    padding: 30px;
  }
</style>