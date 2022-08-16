<template>
  <div class="menu">
    <router-link class="link" to="/">
    <p class="item-menu">
     List Products
    </p>
    </router-link>
    <router-link class="link" to="/InsertProduct">
    <p class="item-menu">
      HandleProduct
    </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'mainHeader.vue'
}
</script>

<style>
.menu {
  display: flex;
  justify-content: center;
}

.item-menu {
  margin: 10px;
  font-size: large;
  cursor: pointer;
  font-weight: 600;
}

.link {
  color: inherit;
  text-decoration: none;
}
</style>
