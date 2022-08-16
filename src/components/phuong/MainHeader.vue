<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          floating
          permanent
      >
        <v-list
            density="compact"
            nav
        >
          <v-list-item>
            <router-link class="link" to="/ListProducts">
              <p class="item-menu">
                List Products
              </p>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link class="link" :to="{ name: 'HandleProduct', params: { id: 'new' } }">
              <p class="item-menu">
               Add Product
              </p>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link class="link" to="/DeletedProducts">
              <p class="item-menu">
                Deleted Product
              </p>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 200px"></v-main>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  name: 'MainHeader',

}
</script>

<style>
*{
  font-size:20px;
  font-family: Avenir;
}

.item-menu {
  margin: 10px;
  font-size: large;
  cursor: pointer;
  font-weight: 600;
}
.item-menu a{
  color: black;
  text-decoration: none;
}
.link {
  color: inherit;
  text-decoration: none;
}

</style>