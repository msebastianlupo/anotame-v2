import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({


        theme: {
            themes: {
              light: {
                primary: '#673ab7',
                secondary: '#009688',
                accent: '#3f51b5',
                error: '#f44336',
                warning: '#ff9800',
                info: '#607d8b',
                success: '#8bc34a'
                },
            },
        }

});
