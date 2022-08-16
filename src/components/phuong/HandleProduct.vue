<template>
  <form class="form-input">
    <v-container fluid>
      <v-row>
        <v-col cols="8">
          <v-text-field
              label=" Name"
              v-model="formData.productName"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <v-text-field
              label="Price"
              v-model="formData.price"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <v-text-field
              label="Description"
              v-model="formData.description"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-btn
              flat
              color="error"
              @click="submit()"
          >
           Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: "HandleProduct",

  props: {
    updatingProduct: Object,
    id: String,
  },

  data(){
    return {
      formData: {
        productName: '',
        price: '',
        description: ''
      },
    }
  },

  async mounted() {
    if (this.isEditingProduct) {
      await this.$_getProductInformation();
    }
  },
  watch: {
    updatingProduct(formData) {
      if (formData) {
        this.formData = formData;
      }
    }
  },

  computed: {
    isEditingProduct() {
      return this.id !== 'new';
    },
  },

  methods:{
    submit() {
      console.log('submit');
      let formData = {
        id:this.formData.id,
        productName: this.formData.productName,
        price: this.formData.price,
        description: this.formData.description
      }
      if (!this.isEditingProduct) {
        this.createPost(formData);
      } else {
        console.log('update product', formData);
        this.updateProduct(formData);
        console.log(formData)
      }
    },

    createPost(newProduct){
      axios.post('http://localhost:8090/api/v1/Products/insert', newProduct )
          .then((response) => {
            this.products = response.data;
            this.$router.push({
              name: 'ListProducts',
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },

    async updateProduct(formData){
      axios.put(`http://localhost:8090/api/v1/Products/` + this.id, formData)
          .then(response => {
            console.log(response);
            this.$router.push({
              name: 'ListProducts',
            });
          })
          .catch(function (error) {
            console.log(error.response)
          })
    },

    async $_getProductInformation(){
      axios.get(`http://localhost:8090/api/v1/Products/` + this.id)
          .then(response => {
            this.formData = response.data.data;
          })
          .catch(function (error) {
            console.log(error.response)
          })
    },
  },
};
</script>

<style scoped>
.form-input{
  padding:2% 10% 0 30%;
}
</style>