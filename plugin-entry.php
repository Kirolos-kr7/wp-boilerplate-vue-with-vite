<?php

/**
 * Plugin Name: Form Builder
 * Plugin URI: http://wpminers.com/
 * Description: A sample WordPress plugin to implement Vue with tailwind.
 * Author: Hasanuzzaman Shamim
 * Author URI: http://hasanuzzaman.com/
 * Version: 1.0.6
 * Text Domain: form-builder
 */
define('FORMBUILDER_URL', plugin_dir_url(__FILE__));
define('FORMBUILDER_DIR', plugin_dir_path(__FILE__));

define('FORMBUILDER_VERSION', '1.0.5');

// This will automatically update, when you run dev or production
define('FORMBUILDER_DEVELOPMENT', 'yes');

class formBuilder
{
    public function boot()
    {
        $this->loadClasses();
        $this->registerShortCodes();
        $this->ActivatePlugin();
        $this->renderMenu();
        $this->disableUpdateNag();
        $this->loadTextDomain();
    }

    public function loadClasses()
    {
        require FORMBUILDER_DIR . 'includes/autoload.php';
    }

    public function renderMenu()
    {
        add_action('admin_menu', function () {
            if (!current_user_can('manage_options')) {
                return;
            }
            // global $submenu;
            add_menu_page(
                'formBuilder',
                'Form Builder',
                'manage_options',
                'form-builder.php',
                array($this, 'renderAdminPage'),
                'dashicons-editor-code',
                25
            );
            // $submenu['form-builder.php']['dashboard'] = array(
            //     'Dashboard',
            //     'manage_options',
            //     'admin.php?page=form-builder.php#/',
            // );
            // $submenu['form-builder.php']['new'] = array(
            //     'New',
            //     'manage_options',
            //     'admin.php?page=form-builder.php#/new',
            // );
        });
    }

    /**
     * Main admin Page where the Vue app will be rendered
     * For translatable string localization you may use like this
     * 
     *      add_filter('formbuilder/frontend_translatable_strings', function($translatable){
     *          $translatable['world'] = __('World', 'form-builder');
     *          return $translatable;
     *      }, 10, 1);
     */
    public function renderAdminPage()
    {
        $loadAssets = new \formBuilder\Classes\LoadAssets();
        $loadAssets->admin();

        $translatable = apply_filters(
            'formbuilder/frontend_translatable_strings',
            array(
                'hello' => __('Hello', 'form-builder'),
            )
        );

        $formbuilder = apply_filters(
            'formbuilder/admin_app_vars',
            array(
                'assets_url' => FORMBUILDER_URL . 'assets/',
                'ajaxurl' => admin_url('admin-ajax.php'),
                'i18n' => $translatable
            )
        );

        wp_localize_script('formbuilder-script-boot', 'formbuilderAdmin', $formbuilder);

        echo '<div class="formbuilder-admin-page" id="formbuilder_app">
            <router-view></router-view>
        </div>';
    }

    /*
     * NB: text-domain should match exact same as plugin directory name (Plugin Name)
     * WordPress plugin convention: if plugin name is "My Plugin", then text-domain should be "my-plugin"
     * 
     * For PHP you can use __() or _e() function to translate text like this __('My Text', 'form-builder')
     * For Vue you can use $t('My Text') to translate text, You must have to localize "My Text" in PHP first
     * Check example in "renderAdminPage" function, how to localize text for Vue in i18n array
     */
    public function loadTextDomain()
    {
        load_plugin_textdomain('form-builder', false, basename(dirname(__FILE__)) . '/languages');
    }


    /**
     * Disable update nag for the dashboard area
     */
    public function disableUpdateNag()
    {
        add_action('admin_init', function () {
            $disablePages = [
                'form-builder.php',
            ];

            if (isset($_GET['page']) && in_array($_GET['page'], $disablePages)) {
                remove_all_actions('admin_notices');
            }
        }, 20);
    }


    /**
     * Activate plugin
     * Migrate DB tables if needed
     */
    public function ActivatePlugin()
    {
        register_activation_hook(__FILE__, function ($newWorkWide) {
            require_once(FORMBUILDER_DIR . 'includes/Classes/Activator.php');
            $activator = new \formBuilder\Classes\Activator();
            $activator->migrateDatabases($newWorkWide);
        });
    }


    /**
     * Register ShortCodes here
     */
    public function registerShortCodes()
    {
        // Use add_shortcode('shortcode_name', 'function_name') to register shortcode
    }
}

(new formBuilder())->boot();



