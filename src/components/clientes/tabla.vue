<template>
  <div>
    <nuevo :dialog="dialog" @dialog="dialog = $event" :Item="itemSelected" />
    <v-card>
      <v-card-title>
        {{ Titulo }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="nuevoItem()">
          Nuevo
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="Cabecera"
        :items="Items"
        :items-per-page="5"
        class="elevation-1"
        dense
      >
        <template v-slot:item.edad="{ item }">
          <v-chip :color="getColor(item.edad)" dark>
            {{ item.edad }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                @click="editarItem(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small @click="eliminar(item)" v-bind="attrs" v-on="on">
                mdi-delete
              </v-icon>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import nuevo from "./nuevo.vue";

export default {
  props: ["Titulo", "Cabecera", "Items"],

  components: {
    nuevo,
  },

  data() {
    return {
      search: "",
      dialog: false,
      itemSelected: {},
    };
  },

  methods: {
    ...mapActions("Clientes", ["eliminarClientes"]),

    nuevoItem() {
      this.itemSelected = {
        id: 0,
        nombre: "",
        edad: 0,
        profesion: "",
      };
      this.dialog = true;
    },

    editarItem(item) {
        this.itemSelected = item;
        this.dialog = true;
    },

    eliminar(item) {
      this.$alertify.confirm(
        "¿Desea eliminar este registro de " + item.nombre + "?",
        () => {
          this.eliminarClientes(item);
          this.$alertify.success(
            "Registro del cliente " + item.nombre + "eliminado"
          );
        },
        () => this.$alertify.error("No se eliminará el registro")
      );
    },

    getColor(edad) {
      if (edad > 40) return "red";
      else if (edad > 29) return "info";
      else return "green";
    },
  },
};
</script>
