import Vue from "vue";
import App from "./App.vue";
import "./assets/main.css";
import VueMq from "vue-mq";
import VueScrollactive from "vue-scrollactive";
import VueDragscroll from "vue-dragscroll";
import VueTippy from "vue-tippy";

import { VueMailchimpEmailSignupForm } from "vue-mailchimp-email-signup-form";
Vue.component("vue-mailchimp-email-signup-form", VueMailchimpEmailSignupForm);


Vue.use(VueMq, {
	breakpoints: {
		sm: 450,
		md: Infinity
	}
});

Vue.use(VueTippy);
Vue.use(VueScrollactive);
Vue.use(VueDragscroll);

Vue.config.productionTip = false;

new Vue({ render: h => h(App) }).$mount("#app");
