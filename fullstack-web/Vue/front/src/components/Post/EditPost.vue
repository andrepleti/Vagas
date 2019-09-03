<template>
<div class="editar">
<h2>Editar</h2>
<hr>
<template>
  <v-form ref="form">

  <v-alert type="error" v-show="Erro" v-text="ErrorMessage">
    </v-alert>

  <v-text-field id="txtTitle" v-model="title" label="Título" required></v-text-field>

  <v-text-field id="txtText" v-model="text" label="Texto" required></v-text-field>

    <v-select
      v-model="category"
      :items="Categorys"
      label="Categoria"
      item-text="description" item-value="_id"
      required
    ></v-select>

    <v-btn
      class="ma-2"
      color="success"
      @click="Save">
      Salvar
    </v-btn>
    <v-btn
      class="ma-2"
      color="warning"
      @click="GoToHome">
      Voltar
    </v-btn>
    <v-btn
      class="ma-2"
      color="error"
      v-show="this.id !== '0'"
      @click="Delete">
      Excluir
    </v-btn>

  </v-form>
</template>
<hr>
</div>
</template>

<script>
export default {
    props: {
      id: Number,
      title: String,
      text: String,
      category: Number,
      Categorys: Array,
      Erro: Boolean,
      ErrorMessage: String
    },
    methods: {
        GoToHome() {
            this.$router.push('/');
        },
        ShowError(ErrorMessage) {
            this.ErrorMessage = ErrorMessage;
            this.Erro = true;

            let timerId= setInterval(() => this.Erro = false, 5000);
        },
        Save() {
          var post = {};
          post.title = this.title;
          post.text = this.text;
          post.Category = this.category;

          if (this.id === "0") {
              this.$http.post('post', post).then(() => this.GoToHome())
                                     .catch((error) => this.ShowError(error.response.data[0].message)); 
          }
          else {
              post.id = this.id;
              this.$http.put('post', post).then(() => this.GoToHome())
                                     .catch((error) => this.ShowError(error.response.data[0].message));
          }
        },
        Delete() {
          this.$http.delete('post/' + this.id).then(() => this.GoToHome()); 
        }
    },
    created() {
      if (this.id !== "0") {
        this.$http.get('post/byId/' + this.id).then(res => {
            this.title = res.data.title;
            this.text = res.data.text;
            this.category = res.data.category;
        });
      }

        this.$http.get('category').then(res => {
            this.Categorys = res.data;
        })
    }
}

</script>

<style>
    
</style>