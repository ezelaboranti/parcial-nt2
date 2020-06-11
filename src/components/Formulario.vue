<template>
  <section class="src-components-formulario">
    <div class="jumbotron">
      <h2>Tareas</h2>
      <hr />

      <vue-form :state="formState" @submit.prevent="enviar()">
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            class="form-control"
            autocomplete="off"
            name="nombre"
            v-model.trim="formData.nombre"
            required
            :minlength="charMin"
            :maxlength="charMax"
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">Campo nombre requerido</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >Se deben ingresar como mínimo {{charMin}} caracteres</div>
            <div
              v-if="formData.nombre.length == charMax"
              class="alert alert-danger my-1"
            >Máximo de caracteres alcanzados ({{charMax}})</div>
          </field-messages>
        </validate>
        <br />

        <validate tag="div">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            autocomplete="off"
            name="email"
            v-model="formData.email"
            required
            :minlength="charMin"
            :maxlength="charMax"
          />

          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">Campo email requerido</div>
            <div slot="email" class="alert alert-danger my-1">Email no válido</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >Se deben ingresar como mínimo {{charMin}} caracteres</div>
            <div
              v-if="formData.nombre.length == charMax"
              class="alert alert-danger my-1"
            >Máximo de caracteres alcanzados ({{charMax}})</div>
          </field-messages>
        </validate>
        <br />

        <validate tag="div">
          <label for="desc">Descripción</label>
          <input
            type="text"
            id="desc"
            class="form-control"
            autocomplete="off"
            name="desc"
            v-model.trim="formData.desc"
            required
            :minlength="charMin"
            :maxlength="charMax"
          />
          <field-messages name="desc" show="$dirty">
            <div slot="required" class="alert alert-danger my-1">Campo descripción requerido</div>
            <div
              slot="minlength"
              class="alert alert-danger my-1"
            >Se deben ingresar como mínimo {{charMin}} caracteres</div>
            <div
              v-if="formData.desc.length == charMax"
              class="alert alert-danger my-1"
            >Máximo de caracteres alcanzados ({{charMax}})</div>
          </field-messages>
        </validate>

        <button
          class="btn btn-success my-4"
          :disabled="formState.$invalid || enviando"
          type="submit"
        >Enviar</button>
      </vue-form>

      <!-- ******************************************************************** -->
      <!-- ********************** ACA EMPIEZA EL LISTADO ********************** -->
      <!-- ******************************************************************** -->

      <div v-if="this.tareas.length == 0">No hay contactos</div>
      <div v-else>
        <table class="table">
          <tr class="text-white bg-dark">
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>DESCRIPCIÓN</th>
            <th>FECHA</th>
          </tr>

          <tr v-for="(tarea,index) in this.tareas" :key="index">
            <td>{{ tarea.nombre }}</td>
            <td>{{ tarea.email }}</td>
            <td>{{ tarea.desc }}</td>
            <td>{{ tarea.createdAt | patronFecha }}</td>
          </tr>
        </table>
      </div>

      <!-- ************************************************************************ -->
      <!-- ********************** ACA EMPIEZAN LAS PREGUNTAS ********************** -->
      <!-- ************************************************************************ -->

      <p>
        1-d
        <br />2-c
        <br />3-c
        <br />4-b
        <br />5-a
        <br />6-b
        <br />7-d
        <br />8-d
        <br />9-d
        <br />10-e
      </p>
    </div>
  </section>
</template>

<script lang="js">

import { urlTareas } from '../urls'

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {
      this.recuperarTareas()
    },
    data () {
      return {
      formState : {},
      formData : this.getInitialData(),
      enviando: false,
      charMin: 10,
      charMax: 50,
      tareas: []
      }
    },
    methods: {
    recuperarTareas() {
      this.axios.get(urlTareas)
        .then(res => {
            this.tareas = res.data
            console.log('hice un get')
        })
        .catch(error => {
            console.log('ERROR GET HTTP', error)
        })
    },
    getInitialData() {
      return {
        nombre: '',
        email: '',
        desc: ''
      }
    },
    enviar() {
      this.enviando = true
      console.log(this.formData)

      this.axios.post(urlTareas, this.formData, {
        'content-type' : 'application/json'
      })
      .then( res => {
        console.log(res.data)
        this.formData = this.getInitialData()
        this.formState._reset()
        this.enviando = false
        console.log('hice un post')
        this.recuperarTareas()
      })
      .catch(error => {
        console.log('ERROR POST', error)
        this.enviando = false
      })
    }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-formulario {
}
.jumbotron {
  padding: 2rem;
}
</style>
