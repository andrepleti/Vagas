<template>
  <v-card max-width="344" class="mx-auto">
    <v-card-title>{{ TextoCurto }}</v-card-title>
    <v-card-actions>
      
      <router-link :to="'/categorias/Editar/' + id">
        <v-btn text color="deep-purple accent-4">
        editar
      </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        description: String,
        id: String
    },
    data() {
        return {
            TextoCurto: this.description.substring(0, 50) + '...'
        }
    }
}
</script>

<style>
    
</style>