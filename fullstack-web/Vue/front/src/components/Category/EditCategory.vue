<template>
<div class="editar">
<h2>Editar</h2>
<hr>
<template>
  <v-form ref="form">

    <v-alert type="error" v-show="Erro" v-text="ErrorMessage">
    </v-alert>

  <v-text-field id="txtDescription" v-model="description" label="Descrição" required></v-text-field>

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
      id: String,
      description: String,
      Erro: Boolean,
      ErrorMessage: String
    },
    methods: {
        GoToHome() {
            this.$router.push('/categorias');
        },
        ShowError(ErrorMessage) {
            this.ErrorMessage = ErrorMessage;
            this.Erro = true;

            let timerId= setInterval(() => this.Erro = false, 5000);
        },
        Save() {
            var category = {};
            category.description = this.description;

            if (this.id === "0") {
                this.$http.post('category', category).then(() => this.GoToHome())
                                            .catch((error) => this.ShowError(error.response.data[0].message)); 
            }
            else {
                category.id = this.id;
                this.$http.put('category', category).then(() => this.GoToHome())
                                            .catch((error) => this.ShowError(error.response.data[0].message)); 
            }
        },
        Delete() {
          this.$http.delete('category/' + this.id).then(() => this.GoToHome()); 
        }
    },
    created() {
        if (this.id !== "0") {
          this.$http.get('category/byId/' + this.id).then(res => {
            this.description = res.data.description;
          });
        }
    }
}

</script>

<style>
    
</style>