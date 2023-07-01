<template>
    <v-container>
        <v-row>
            <v-col class="mt-5 text-center">
                <h1>{{h1}}</h1>
                <h2>{{h2}}</h2>
                <p v-if="sinBorrado">{{p}}</p>
                <p v-else>{{pBorrado}}</p>
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
                    h1: "Anotame v2 - © 2023 Matías Godoy",
                    h2: "Creá notas sin descargar nada - V. 23.06.29",
                    sinBorrado: true,
                    p: "Para borrar todos los datos de la app, presioná el botón 2 veces.",
                    pBorrado: "Listo, borraste todos los datos locales de la app.",
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