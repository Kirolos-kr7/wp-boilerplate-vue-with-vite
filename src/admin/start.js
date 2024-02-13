import routes from './routes';
import { createWebHashHistory, createRouter } from 'vue-router'
import formBuilder from './Bits/AppMixins';

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


const framework = new formBuilder();

framework.app.config.globalProperties.appVars = window.formBuilderAdmin;

window.formBuilderApp = framework.app.use(router).mount('#formbuilder_app');

router.afterEach((to, from) => {
    jQuery('.formbuilder_menu_item').removeClass('active');
    let active = to.meta.active;
    if(active) {
        jQuery('.formbuilder_main-menu-items').find('li[data-key='+active+']').addClass('active');
    }
});

//update nag remove from admin, You can remove if you want to show notice on admin
jQuery('.update-nag,.notice, #wpbody-content > .updated, #wpbody-content > .error').remove();
