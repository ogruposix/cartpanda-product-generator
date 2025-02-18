"use client";
import { useState, useEffect } from "react";
import { TableData } from "@/types/sku";
import { skuData } from "@/data/skuData";
import SelectGrid from "@/components/SelectGrid";
// import SKUDisplay from "@/components/SKUDisplay";
import SKUTable from "@/components/SKUTable";
import ProductConfig from "@/components/ProductConfig";
import { generateSKU, decodeSKU } from "@/utils/skuUtils";
import { saveToCSV } from "@/utils/csv";
import { Alert } from "@/components/ui/Alert";

export default function Home() {
  const [formValues, setFormValues] = useState({
    conta: "1",
    squad: "1",
    produto: "1",
    vsl: ["0"],
    rede: ["1"],
    tipo_de_venda: "1",
    kit: ["1"],
    preco: ["5"],
  });

  // const [generatedSKU, setGeneratedSKU] = useState("");
  // const [decodedSKU, setDecodedSKU] = useState<DecodedSKU | null>(null);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [productConfig, setProductConfig] = useState({
    handle: "",
    title: "",
    description: "",
    isParentProduct: false,
  });
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    // Load table data from localStorage on component mount
    const savedData = localStorage.getItem("tableData");
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
  }, []);

  // const generateAndDecodeSKU = () => {
  //   const sku = generateSKU(formValues);
  //   setGeneratedSKU(sku);
  //   const decoded = decodeSKU(sku, skuData);
  //   setDecodedSKU(decoded);
  //   return sku;
  // };

  const addToTable = () => {
    const vsls = formValues.vsl;
    const redes = formValues.rede;
    const kits = formValues.kit;
    const precos = formValues.preco;
    let isFirstEntry = true;
    const newRows: TableData[] = [];

    // Gera uma entrada para cada combinação de VSL, rede e kit/preço
    for (const vsl of vsls) {
      for (const rede of redes) {
        // Usa o menor comprimento entre kits e precos para garantir correspondência
        const combinationLength = Math.min(kits.length, precos.length);

        for (let i = 0; i < combinationLength; i++) {
          const kit = kits[i];
          const preco = precos[i];

          const currentFormValues = {
            ...formValues,
            vsl: vsl,
            rede: rede,
            kit: kit,
            preco: preco,
          } as {
            conta: string;
            squad: string;
            produto: string;
            vsl: string;
            rede: string;
            tipo_de_venda: string;
            kit: string;
            preco: string;
          };

          const sku = generateSKU(currentFormValues);
          if (!sku) continue;

          if (tableData.some((row) => row.variant_sku === sku)) {
            setAlertState({
              isOpen: true,
              message: `SKU ${sku} já existe na tabela!`,
            });
            continue;
          }

          const data = decodeSKU(sku, skuData);
          const vslNumber =
            data.vsl === "CALLCENTER" ? 0 : data.vsl.replace("VSL", "");

          const newRow: TableData = {
            handle: productConfig.handle,
            title:
              isFirstEntry && productConfig.isParentProduct
                ? productConfig.title
                : "",
            description:
              isFirstEntry && productConfig.isParentProduct
                ? productConfig.description
                : "",
            seo_title:
              isFirstEntry && productConfig.isParentProduct
                ? productConfig.title
                : "",
            seo_description:
              isFirstEntry && productConfig.isParentProduct
                ? productConfig.description.substring(0, 150)
                : "",
            vendor: "",
            type: "",
            tags: "",
            active: "TRUE",
            option_1_name: "Bottles",
            option_1_value: `${data.kit} ${
              data.kit === "1" ? "Bottle" : "Bottles"
            } - $${data.preco} - ${data.squad[0]}${vslNumber}${
              skuData.rede[parseInt(rede) - 1][0]
            }${data.tipo_de_venda[0]}`,
            option_2_name: "",
            option_2_value: "",
            option_3_name: "",
            option_3_value: "",
            variant_sku: sku,
            variant_grams: "",
            variant_inventory_qty: "20000",
            variant_price: data.preco,
            variant_compare_at_price: "",
            variant_requires_shipping:
              isFirstEntry && productConfig.isParentProduct ? "FALSE" : "TRUE",
            variant_taxable:
              isFirstEntry && productConfig.isParentProduct ? "FALSE" : "TRUE",
            inventory_policy: "",
            variant_barcode: "",
            variant_weight_unit: "",
            cost_per_item: "",
            length: "2",
            width: "2",
            height: "4",
            dimension_unit: "in",
          };

          newRows.push(newRow);
          isFirstEntry = false;
        }
      }
    }

    if (newRows.length > 0) {
      const updatedTableData = [...tableData, ...newRows];
      setTableData(updatedTableData);
      localStorage.setItem("tableData", JSON.stringify(updatedTableData));

      setProductConfig({
        handle: "",
        title: "",
        description: "",
        isParentProduct: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Gerador de SKU
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coluna da Esquerda - Formulário (1/3) */}
          <div className="lg:col-span-4 space-y-8">
            <SelectGrid
              formValues={formValues}
              setFormValues={setFormValues}
              skuData={skuData}
            />

            <ProductConfig
              productConfig={productConfig}
              setProductConfig={setProductConfig}
            />

            <div className="flex gap-4">
              <button
                onClick={addToTable}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Gerar SKU e Adicionar à Tabela
              </button>
              <button
                onClick={() => saveToCSV(tableData)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Gerar CSV
              </button>
            </div>
          </div>

          {/* Coluna da Direita - Tabela (2/3) */}
          <div className="lg:col-span-8 h-[calc(100vh-8rem)] overflow-auto">
            <SKUTable tableData={tableData} setTableData={setTableData} />
          </div>
        </div>

        <Alert
          isOpen={alertState.isOpen}
          onClose={() => setAlertState({ isOpen: false, message: "" })}
          title="Atenção"
          description={alertState.message}
        />
      </div>
    </div>
  );
}
