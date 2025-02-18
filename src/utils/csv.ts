import { TableData } from "@/types/sku";

export const headersTXT = [
  "Handle",
  "Title",
  "Description",
  "Seo title",
  "Seo description",
  "Vendor",
  "Type",
  "Tags",
  "Active",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Qty",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Inventory Policy",
  "Variant Barcode",
  "Variant Weight Unit",
  "Cost per item",
  "Length",
  "Width",
  "Height",
  "Dimension Unit",
];

export const saveToCSV = (tableData: TableData[]) => {
  if (tableData.length === 0) {
    alert("A tabela está vazia. Adicione SKUs para gerar o CSV.");
    return;
  }

  const headers = headersTXT.join(",");
  const csvRows = tableData.map((row) => Object.values(row).join(","));
  const csvData = `data:text/csv;charset=utf-8,${headers}\n${csvRows.join(
    "\n"
  )}`;

  const link = document.createElement("a");
  link.href = encodeURI(csvData);
  link.download = "sku_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
