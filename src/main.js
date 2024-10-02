import { createApp } from 'vue'
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

// Components
import App from './App.vue'

const vuetify = createVuetify({
    components: {
        ...components,
        ...labsComponents
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    }
});


createApp(App).use(vuetify).mount('#app')
