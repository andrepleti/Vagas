<template>
<div>
  <v-card class="pa-4" flat>
  <v-row>
    <v-col cols="12" md="10" offset-sm="12">
     <v-text-field hide-details single-line id="txtSearch" v-model="description" label="Pesquisar"></v-text-field>
    
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
             <v-col v-for="ctg in categories" :key="ctg.id" class="d-flex child-flex" cols="4">
                <Category :description="ctg.description" :id="ctg._id"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import Category from './Category.vue'

export default {
    props: {
        categories: Array,
        description: String
    },
    components: { Category },
    methods: {
      New() {
        this.$router.push('/categorias/Editar/0');
      },
      Search() {
        var descricao = '';
        if (this.description === '' || this.description === undefined) {
          descricao = '0';
        } else {
          descricao = this.description;
        }

        this.$http.get('category/byDescripton/' + descricao).then(res => {
            this.categories = res.data;
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