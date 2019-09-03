<template>
<div>
  <v-card class="pa-4" flat>
  <v-row>
    <v-col cols="12" md="10" offset-sm="12">
     <v-text-field hide-details single-line id="txtSearch" v-model="title" label="Pesquisar"></v-text-field>
    
    </v-col>
    <v-col cols="12" md="1" offset-sm="12">
      <v-btn icon
            class="ma-2"
            color="primary"
            @click="Search">
            Pesquiar
          </v-btn>
    </v-col>
    <v-col cols="12" md="1" offset-sm="12">
      <v-btn icon
            class="ma-2"
            color="primary"
            @click="New">
            Novo
          </v-btn>
    </v-col>
  </v-row>
  </v-card>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card>
        <v-container fluid>
          <v-row>
             <v-col v-for="pst in posts" :key="pst.id" class="d-flex child-flex" cols="4">
                <Post :title="pst.title" :text="pst.text" :id="pst._id" :category="pst.Category"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
    props: {
        posts: Array,
        title: String
    },
    components: { Post },
    methods: {
      New() {
        this.$router.push('/Editar/0');
      },
      Search() {
        var texto = '';
        if (this.title === '' || this.title === undefined) {
          texto = '0';
        } else {
          texto = this.title;
        }
        this.$http.get('post/ByTitle/' + texto).then(res => {
            this.posts = res.data;
        })
      }
    },
    created() {
        this.Search();
    }
}
</script>

<style>
    
</style>