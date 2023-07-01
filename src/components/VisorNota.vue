<template>
    <div class="contenedores-fijos" ref="visor" @keydown.esc="$emit('cerrado')" tabindex="-1">
        <v-container>
            <v-row>
                <v-col>
                    <v-card class="mt-1">
                        <v-col align="end">
                        <v-btn color="primary" class="ml-2" @click="$emit('cerrado')">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn color="primary" class="ml-2" @click="$emit('edicion')">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn color="primary" class="ml-2" @click="alternarModal">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        </v-col>
                        <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{nota.ti}}</v-card-title>
                        <v-card-text>
                            {{nota.fe}} - {{nota.pr}}
                        </v-card-text>
                        <v-card-text>
                            {{nota.te}}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div class="text-center">
        <v-dialog
        v-model="modal"
        width="auto"
        >
        <v-card>
            <v-card-text class="pt-2">
                A punto de borrar una nota. ¿Continuar?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="sencondary" @click="alternarModal">Volver</v-btn>
                <v-btn color="error" @click="$emit('borrado')">Borrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'VisorNota',
        data:
            function() {
                return {
                    modal: false
                }
            },
        props: ["nota", "visor"],
        methods: {
            alternarModal(){
                this.modal ? this.modal = false : this.modal = true;
            }
        },
        mounted() {
            this.$refs.visor.focus();
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
</style>