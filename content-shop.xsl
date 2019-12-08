<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
                <table id="shopTable" class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/catalogue/section">
                            <xsl:for-each select="product">
                            <tr id="{position()}">
                                <td align="center">
                                    <img src="{image}" class="image-fluid image-product"/>
                                </td>
                                <td align="left">
                                    <h5><xsl:value-of select="title" /></h5>
                                    <p><xsl:value-of select="description" /></p>
                                    
                                </td>
                                <td align="right">
                                    <xsl:value-of select="price" />
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary add-to-cart" data-product-title="{ title }" data-product-price="{ price }">Add to cart</button>
                                </td>
                            </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table><br/>
    </xsl:template>
</xsl:stylesheet>