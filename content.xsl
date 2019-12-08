<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
                <table id="adminTable" class="indent">
                    <thead>
                        <tr>
                            <th colspan="5">Los Viajes de Maura Shop</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Title</th>
                            <th>Descriptin</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/catalogue/section">
                            <xsl:for-each select="product">
                            <tr id="{position()}">
                                <td align="center">
                                    <button class="btn btn-sm btn-secondary edit-row" data-product-id="{ position() }">Edit</button>
                                </td>
                                <td>
                                    <xsl:value-of select="title" />
                                </td>
                                <td>
                                    <xsl:value-of select="description"/>
                                </td>
                                <td align="right">
                                    <xsl:value-of select="price" />
                                </td>
                            </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table><br/>
    </xsl:template>
</xsl:stylesheet>