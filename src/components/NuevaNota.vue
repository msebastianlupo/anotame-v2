<template>
    <div class="contenedores-fijos">
        <v-container>
        <v-row class="mx-auto">
            <v-col>
                <v-form ref="formulario" @submit.prevent>
                    <v-text-field :label="labelTi" v-model.trim="titulo" :rules="valTitulo" required @input="validar"></v-text-field>
                    <v-textarea :label="labelTe" v-model="texto" :rules="valTexto" required @input="validar"></v-textarea>
                    <v-select
                        @change="validar"
                        v-model="prioridad"
                        :items="arrPrioridad"
                        :label="labelPr"
                        required
                        item-value=""
                        :rules="[(v) => !!v || 'Tenés que seleccionar la prioridad']"
                    >
                    </v-select>
                    <v-btn class="mt-2 ml-2" @click="$emit('cancelado')">Cancelar</v-btn>
                    <v-btn type="submit" :class="['mt-2', 'ml-2', validado ? 'success' : 'error']" @click="guardar">Guardar</v-btn>
                </v-form>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script>
    export default{
        name: 'NuevaNota',
        data:
            function() {
                return {
                    nueva: true,
                    arrPrioridad: ["BAJA", "REGULAR", "IMPORTANTE", "URGENTE"],
                    validado: false,
                    identificacion: 0,
                    titulo: "",
                    texto: "",
                    prioridad: "",
                    fecha: "",
                    labelTi: "Colocale un título",
                    labelTe: "Describí la nota",
                    labelPr: "Elegí la prioridad",
                    arrNotasFix: this.arrNotas,
                    valTitulo: [
                        value => {
                        if (value?.length > 3) return true
                            return 'El título debe llevar 4 caracteres como mínimo'
                        }
                    ],
                    valTexto: [
                        value => {
                        if (value?.length > 19) return true
                            return 'La descripción debe tener al menos una longitud de 20 caracteres'
                        }
                    ]
                }
            },
        props: ["arrNotas", "edicion"],
        methods: {
            guardar(){
                if(this.validar()){
                    let nota = {};
                    nota.id = this.identificacion;
                    nota.ti = this.titulo.toUpperCase();
                    nota.te = this.texto;
                    nota.pr = this.prioridad;
                    nota.fe = this.fecha;
                    if(!this.nueva){
                        for(let nro in this.arrNotasFix){
                            if(this.arrNotasFix[nro].id === this.identificacion){
                                this.arrNotasFix.splice(nro, 1);
                            }
                        }
                    }
                    this.arrNotasFix.unshift(nota);
                    localStorage.setItem("anotame", JSON.stringify(this.arrNotasFix));
                    this.$emit("guardado");

                }
            },
            validar(){
                if(this.$refs.formulario.validate()){
                    this.validado = true;
                    return this.$refs.formulario.validate();
                }
                this.validado = false;
                return this.$refs.formulario.validate();
            },
            levantarTexto(){
                this.titulo = this.titulo.toUpperCase();
            }
        },

        mounted: function() {
            this.fecha = new Date().toLocaleDateString('en-CA');
            if(Object.keys(this.edicion).length){
                this.nueva = false;
                this.identificacion = this.edicion.id;
                this.titulo = this.edicion.ti;
                this.texto = this.edicion.te;
                this.prioridad = this.edicion.pr;
            }else{
                this.nueva = true;
                this.identificacion = Date.now();
            }
        }
    }
</script>

<style scoped>
    .contenedores-fijos{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: 100px;
        background: #fff;
    }
    form input{
        text-transform: uppercase !important;
    }
</style>