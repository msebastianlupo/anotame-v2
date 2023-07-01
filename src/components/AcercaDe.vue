<template>
    <v-container>
        <v-row>
            <v-col class="mt-5 text-center">
                <h1 class="text-h6">{{h1}}</h1>
                <h2 class="text-body-1">{{h2}}</h2>
                <p class="mt-5 text-body-2" v-if="sinBorrado">{{p}}</p>
                <p class="mt-5 text-body-2" v-else>{{pBorrado}}</p>
                <v-btn class="secondary" v-if="sinBorrado" @dblclick="borrarDatos">Borrar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'AcercaDe',
        data:
            function() {
                return {
                    h1: "© 2023 Matías Godoy",
                    h2: "Creá tus notas - V. 23.06.29",
                    sinBorrado: true,
                    p: "Doble clic para borrar los datos.",
                    pBorrado: "Listo, borraste todos los datos"
                }
            },
        methods: {
            borrarDatos(){
                localStorage.removeItem("anotame");
                this.sinBorrado = false;
                console.log("Datos borrados");
            }
        }
    }
</script>