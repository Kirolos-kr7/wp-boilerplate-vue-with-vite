<?php

namespace formBuilder\Classes;

class LoadAssets
{
    public function admin()
    {
        Vite::enqueueScript('formbuilder-script-boot', '/main.ts');
    }

}
