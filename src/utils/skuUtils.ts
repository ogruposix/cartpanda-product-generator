import { SKUData, DecodedSKU } from "@/types/sku";

export function generateSKU(formValues: {
  conta: string;
  squad: string;
  produto: string;
  vsl: string;
  rede: string;
  tipo_de_venda: string;
  kit: string;
  preco: string;
}): string {
  return `A${formValues.conta}B${formValues.squad}C${formValues.produto}D${formValues.vsl}E${formValues.rede}F${formValues.tipo_de_venda}G${formValues.kit}H${formValues.preco}`;
}

export function decodeSKU(sku: string, skuData: SKUData): DecodedSKU {
  const pattern = /A(\d+)B(\d+)C(\d+)D(\d+)E(\d+)F(\d+)G(\d+)H(\d+)/;
  const matches = sku.match(pattern);

  if (!matches) {
    return {
      conta: "INVALID",
      squad: "INVALID",
      produto: "INVALID",
      vsl: "INVALID",
      rede: "INVALID",
      tipo_de_venda: "INVALID",
      kit: "INVALID",
      preco: "INVALID",
    };
  }

  return {
    conta: skuData.conta[parseInt(matches[1]) - 1],
    squad: skuData.squad[parseInt(matches[2]) - 1],
    produto: skuData.produto[parseInt(matches[3]) - 1],
    vsl: skuData.vsl[parseInt(matches[4])],
    rede: skuData.rede[parseInt(matches[5]) - 1],
    tipo_de_venda: skuData.tipo_de_venda[parseInt(matches[6]) - 1],
    kit: skuData.kit[parseInt(matches[7]) - 1],
    preco: matches[8],
  };
}
