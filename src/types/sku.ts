export type SKUData = {
  conta: string[];
  squad: string[];
  produto: string[];
  vsl: string[];
  rede: string[];
  tipo_de_venda: string[];
  kit: string[];
  preco: string[];
};

export type DecodedSKU = {
  conta: string;
  squad: string;
  produto: string;
  vsl: string;
  rede: string;
  tipo_de_venda: string;
  kit: string;
  preco: string;
};

export type TableData = {
  handle: string;
  title: string;
  description: string;
  seo_title: string;
  seo_description: string;
  vendor: string;
  type: string;
  tags: string;
  active: string;
  option_1_name: string;
  option_1_value: string;
  option_2_name: string;
  option_2_value: string;
  option_3_name: string;
  option_3_value: string;
  variant_sku: string;
  variant_grams: string;
  variant_inventory_qty: string;
  variant_price: string;
  variant_compare_at_price: string;
  variant_requires_shipping: string;
  variant_taxable: string;
  inventory_policy: string;
  variant_barcode: string;
  variant_weight_unit: string;
  cost_per_item: string;
  length: string;
  width: string;
  height: string;
  dimension_unit: string;
};
