<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="1024">
        <v-card>
          <v-card-title>
            <span v-if="Item.id === 0" class="text-h5">Nuevo Cliente</span>
            <span v-else class="text-h5">Editar Cliente</span>
            <v-spacer></v-spacer>
            <span v-if="Item.id > 0"> ID: {{ Item.id }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nombre*"
                    v-model="Item.nombre"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Edad"
                    v-model="Item.edad"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Profesión"
                    v-model="Item.profesion"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>* Indica los campos obligatorios.</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="text"
              @click="cerrarDialogo()"
            >
              Cerrar
            </v-btn>
            <v-btn color="primary" variant="text" @click="agregar()">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["dialog", "Item"],

  data() {
    return {};
  },

  methods: {
    ...mapActions("Clientes", ["agregarClientes"]),

    agregar() {
      this.$alertify.confirm(
        this.Item.id === 0 ? "¿Desea guardar este nuevo cliente?" : "¿Desea editar este cliente?",
        () => {
          this.agregarClientes(this.Item);
          this.cerrarDialogo();
          this.$alertify.success(
            this.Item.id === 0 ? "Registro del cliente guardado." : "Registro del cliente actualizado."
          );
        },
        () => this.$alertify.error("No se guardará.")
      );
    },

    cerrarDialogo() {
      this.$emit("dialog", false);
    },
  },
};
</script>
