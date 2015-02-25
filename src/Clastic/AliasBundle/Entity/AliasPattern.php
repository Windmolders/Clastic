<?php

namespace Clastic\AliasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AliasPattern
 */
class AliasPattern
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $moduleIdentifier;

    /**
     * @var string
     */
    private $pattern;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set moduleIdentifier
     *
     * @param string $moduleIdentifier
     * @return AliasPattern
     */
    public function setModuleIdentifier($moduleIdentifier)
    {
        $this->moduleIdentifier = $moduleIdentifier;

        return $this;
    }

    /**
     * Get moduleIdentifier
     *
     * @return string 
     */
    public function getModuleIdentifier()
    {
        return $this->moduleIdentifier;
    }

    /**
     * Set pattern
     *
     * @param string $pattern
     * @return AliasPattern
     */
    public function setPattern($pattern)
    {
        $this->pattern = $pattern;

        return $this;
    }

    /**
     * Get pattern
     *
     * @return string 
     */
    public function getPattern()
    {
        return $this->pattern;
    }
}
