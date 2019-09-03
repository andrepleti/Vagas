<template>
  <v-card max-width="344" class="mx-auto">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ TextoCurto }}</v-card-text>
    <v-card-actions>
      
      <router-link :to="'/Editar/' + id">
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
        title: String,
        text: String,
        id: String
    },
    data() {
        return {
            TextoCurto: this.text.substring(0, 50) + '...'
        }
    }
}
</script>

<style>
    
</style>