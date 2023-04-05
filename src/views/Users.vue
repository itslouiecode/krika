<template>
    <div>
        <h1 class="text-center mt-5">Alertas</h1>
        <v-btn class="mb-5" color="primary" @click="visible()">Mostrar</v-btn>
        <appAlerta v-if="success" type="success" mensaje="OMG THIS IS AN ALERT" @salir="success = $event"></appAlerta>
        <appAlerta v-if="error" type="error" mensaje="OMG THIS IS AN ALERT" @salir="error = $event"></appAlerta>
        <appAlerta v-if="warning" type="warning" mensaje="OMG THIS IS AN ALERT" @salir="warning = $event"></appAlerta>
    </div>
</template>

<script>
import appAlerta from '../components/alerts.vue'
  export default {

    name: "usuarios",

    components: {
        appAlerta
    },  

    data() {
        return {
            success: false,
            error: false, 
            warning: false
        }
    },

    methods: {
        visible(){
            this.success = true; 
            this.error = true;
            this.warning = true; 
        }
    },

    watch: {

    }
}
</script>