import DefaultTheme from 'vitepress/theme'
import './theme.css'

import MyLayout from './MyLayout.vue'

export default {
    ...DefaultTheme,
    // override the Layout with a wrapper component that
    // injects the slots
    Layout: MyLayout,
    enhanceApp({ app, router, siteData }) {
      // app.use(VueCalendarHeatmap)
      // register global components=
    }
  }