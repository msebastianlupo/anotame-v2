<template>
    <v-container>
        <v-row>
            <v-col class="mt-5 text-center">
                <h1>{{h1}}</h1>
                <v-btn class="my-3" @click="obtenerIdeas" block>Obtener ideas</v-btn>
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col>
                <v-chip
                    v-for="(idea, index) in lista" :key="index"
                    class="ma-2"
                    color="primary"
                    >
                    {{idea}}
                </v-chip>
            </v-col>
        </v-row>
        <v-dialog
            v-model="modal"
            :scrim="false"
            persistent
            width="auto"
        >
            <v-card
                color="secondary"
            >
                <v-card-text class="pt-2 white--text">
                    Pidiendo ideas...
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: 'IdeasListado',
        data:
            function() {
                return {
                    h1: "Ideas para no aburrirte",
                    modal: false,
                    lista: []
                }
        },
        methods: {
            obtenerIdeas(){
                if(navigator.onLine){
                    this.crearCarga();
                    fetch(`https://mstest.webcindario.com/app-dis-mov/ideas.php`)
                    .then(res => {
                        return res.json();
                    })
                    .then(json => {
                        this.lista = json.ideas;
                        this.romperCarga();
                    })
                    .catch(() => {
                        console.warn("No se puede obtener el archivo");
                        this.h1 = "No se puede obtener ideas";
                        this.romperCarga();
                    })
                }
            },
            crearCarga(){
                this.modal = true;
                console.info("Se están pidiendo datos a un servidor remoto");
            },
            romperCarga(){
                this.modal = false;
                console.log("La operación finalizó");
            }
        }
    }
</script>