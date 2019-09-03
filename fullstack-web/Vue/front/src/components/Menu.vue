<template>
<v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span style="margin-right:2px">EZ</span>
        <span class="font-weight-light">Teste</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
      <span class="mr-2">Início</span>
      </router-link>
        <router-link to="/categorias" tag="a">
        <span class="mr-2">Categorias</span>
      </router-link>
    </v-app-bar>
</template>

<script>
export default {
    
}
</script>

<style>
    
</style>