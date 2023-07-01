<template>
    <v-container>
        <div class="d-flex justify-center my-5" v-if="buscador"><h1>Filtro activado</h1></div>
        <div class="d-flex justify-center my-5 align-center" v-else-if="local"><h1>Notas</h1>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="ml-2" @click="editar">
                Nueva
                <v-icon class="ml-3">mdi-pencil</v-icon>
            </v-btn>
        </div>
        <div v-else class="d-flex justify-center my-5">
            <v-btn block  size="large" color="primary" @click="editar">{{btnText}}</v-btn>
        </div>
        <v-row>
            <v-col>
                <input type="search" class="elevation-2 py-4 px-8 rounded-pill mb-5" placeholder="Filtrá por título o prioridad" v-model.trim="buscador" @input="levantarTexto">
                <v-card class="mt-1" v-for="(nota, index) in arrNotas" :key="index" @click="capturar(nota)" v-show="buscador === '' || nota.ti.includes(buscador) || nota.pr === buscador">
                    <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{nota.ti}}</v-card-title>
                    <v-card-text>
                        {{nota.fe}} - {{nota.pr}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <VisorNota :nota="dataClick" @cerrado="cerrar" @edicion="editar" @borrado="borrar" v-if="visor"></VisorNota>
        <NuevaNota v-if="nueva" :arrNotas="arrNotas" :edicion="dataClick" @cancelado="cancelar" @guardado="resetear"></NuevaNota>
    </v-container>
</template>
<script>
    import VisorNota from './VisorNota.vue'
    import NuevaNota from './NuevaNota.vue'

    export default {
        name: 'AnotameNotas',
        components: {
            VisorNota,
            NuevaNota
        },   
        data:
            function(){
                return{
                    local: false,
                    h1: "",
                    btnText: "Sin notas. Agregá una",
                    arrNotas: [],
                    dataClick: {},
                    visor: false,
                    nueva: false,
                    buscador: "",
                    prClases: {"URGENTE": "pr-urgente", "IMPORTANTE": "pr-importante", "REGULAR": "pr-regular", "BAJA": "pr-baja"}

                }
            }
        ,
        methods: {
            capturar(nota){
                this.dataClick = nota;
                this.visor = true;
            },
            cancelar(){
                this.nueva = false;
                if(Object.keys(this.dataClick).length){
                    this.visor = true;
                }
            },
            cerrar(){
                this.dataClick = {};
                this.visor = false;
            },
            editar(){
                this.visor = false;
                this.nueva = true;
            },
            borrar(){
                for(let nro in this.arrNotas){
                    if(this.arrNotas[nro].id === this.dataClick.id){
                        this.arrNotas.splice(nro, 1);
                    }
                }
                if(this.arrNotas.length){
                    localStorage.setItem("anotame", JSON.stringify(this.arrNotas));
                }else{
                    localStorage.removeItem("anotame");
                    this.local = false;
                }
                this.resetear();
            },
            resetear(){
                this.nueva = false;
                this.cerrar();
                this.actualizar();
            },

            levantarTexto(){
                this.buscador = this.buscador.toUpperCase();
            },
            actualizar(){
                let almacenadas = localStorage.getItem("anotame");
                if(almacenadas){
                    this.arrNotas = JSON.parse(almacenadas);
                    this.local = true;
                }
            }
        },
        mounted: function() {
            this.actualizar();
        }
    }
</script>

<style scoped>
    input[type="search"]{
        display: block;
        width: 100%;
        border: none;
        outline: none;
    }
</style>