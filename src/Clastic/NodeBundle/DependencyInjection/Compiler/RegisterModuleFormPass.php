<?php

/**
 * This file is part of the Clastic package.
 *
 * (c) Dries De Peuter <dries@nousefreak.be>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Clastic\NodeBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Registers Clastic modules.
 *
 * @author Dries De Peuter <dries@nousefreak.be>
 */
class RegisterModuleFormPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('clastic.node.form.extension.node')) {
            return;
        }

        foreach ($container->findTaggedServiceIds('clastic.node_form') as $id => $attributes) {
            $tag = $container->getDefinition($id)->getTag('clastic.module');
            $type = $tag[0]['alias'];
            $extension = $attributes[0]['build_service'];

            $container->getDefinition('clastic.node.form.extension.node')
                ->addMethodCall('registerNodeFormExtension', array($type, new Reference($extension)));
        }
    }
}
