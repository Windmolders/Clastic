<?php

/**
 * This file is part of the Clastic package.
 *
 * (c) Dries De Peuter <dries@nousefreak.be>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Clastic\NodeBundle\Tests\Unit\Node;

use Clastic\NodeBundle\Entity\Node;
use Clastic\NodeBundle\Node\NodeReferenceTrait;
use Symfony\Component\Form\Test\TypeTestCase;

/**
 * @author Dries De Peuter <dries@nousefreak.be>
 */
class NodeReferenceTraitTest extends TypeTestCase
{
    public function testGetSetNode()
    {
        $trait = $this->getMockForTrait(NodeReferenceTrait::class);
        $node = $this->getMock(Node::class);

        $trait->setNode($node);

        $this->assertEquals($node, $trait->getNode());
    }
}
