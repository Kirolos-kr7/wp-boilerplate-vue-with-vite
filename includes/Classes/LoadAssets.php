<?php

namespace formBuilder\Classes;

class LoadAssets
{
    public function admin()
    {
        Vite::enqueueScript('formbuilder-script-boot', 'admin/start.js', array('jquery'), FORMBUILDER_VERSION, true);
    }
  
}
