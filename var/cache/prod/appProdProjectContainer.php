<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerHqnu9uw\appProdProjectContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerHqnu9uw/appProdProjectContainer.php') {
    touch(__DIR__.'/ContainerHqnu9uw.legacy');

    return;
}

if (!\class_exists(appProdProjectContainer::class, false)) {
    \class_alias(\ContainerHqnu9uw\appProdProjectContainer::class, appProdProjectContainer::class, false);
}

return new \ContainerHqnu9uw\appProdProjectContainer([
    'container.build_hash' => 'Hqnu9uw',
    'container.build_id' => 'a7139979',
    'container.build_time' => 1636485821,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerHqnu9uw');
