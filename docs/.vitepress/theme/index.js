import DefaultTheme from 'vitepress/theme'
import CollapsibleAnswer from "./components/CollapsibleAnswer.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("CollapsibleAnswer", CollapsibleAnswer);
  },
};