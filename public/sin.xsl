<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xalan="http://xml.apache.org/xslt"
  xmlns:trig="http://www.ora.com/XSLTCookbook/extend/trig"
>
  <xsl:output method="text"/>

  <xalan:component prefix="trig" functions="sin">
    <xalan:script lang="javascript">
      function sin (arg) { return Math.sin(arg);} 
    </xalan:script>
  </xalan:component>

  <xsl:template match="/">
    The sin of 45 degrees is <xsl:text/>
    <xsl:value-of select="trig:sin(3.14159265 div 4)"/>
  </xsl:template>
</xsl:stylesheet>