import { SKUData } from "@/types/sku";
import { fieldLabels } from "@/utils/fieldLabels";

type SKUHelpProps = {
  isOpen: boolean;
  onClose: () => void;
  formValues: Record<string, string | string[]>;
  skuData: SKUData;
};

export default function SKUHelp({
  isOpen,
  onClose,
  formValues,
  skuData,
}: SKUHelpProps) {
  if (!isOpen) return null;

  const getFieldKey = (prefix: string): keyof SKUData => {
    switch (prefix) {
      case "A":
        return "conta";
      case "B":
        return "squad";
      case "C":
        return "produto";
      case "D":
        return "vsl";
      case "E":
        return "rede";
      case "F":
        return "tipo_de_venda";
      case "G":
        return "kit";
      case "H":
        return "preco";
      default:
        return "conta"; // fallback
    }
  };

  const getSelectedOption = (
    prefix: string,
    value: string | string[],
    options: string[]
  ) => {
    if (prefix === "H") {
      return Array.isArray(value) ? value.map((v) => `$${v}`) : `$${value}`;
    }
    if (Array.isArray(value)) {
      return value.map((v) => {
        const selectedIndex = parseInt(v) - (prefix === "D" ? 0 : 1);
        return options[selectedIndex];
      });
    }
    const selectedIndex = parseInt(value) - (prefix === "D" ? 0 : 1);
    return options[selectedIndex];
  };

  const skuStructure = [
    {
      prefix: "A",
      name: fieldLabels.conta,
      description: "Identificador da conta",
    },
    {
      prefix: "B",
      name: fieldLabels.squad,
      description: "Identificador do squad",
    },
    {
      prefix: "C",
      name: fieldLabels.produto,
      description: "Identificador do produto",
    },
    {
      prefix: "D",
      name: fieldLabels.vsl,
      description: "Número da VSL ou CallCenter",
    },
    { prefix: "E", name: fieldLabels.rede, description: "Canal de venda" },
    {
      prefix: "F",
      name: fieldLabels.tipo_de_venda,
      description: "Modalidade da venda",
    },
    {
      prefix: "G",
      name: fieldLabels.kit,
      description: "Quantidade de produtos",
    },
    { prefix: "H", name: fieldLabels.preco, description: "Valor do produto" },
  ];

  // Gera todas as combinações possíveis de SKUs
  const generateAllSkus = () => {
    const vsls = Array.isArray(formValues.vsl)
      ? formValues.vsl
      : [formValues.vsl];
    const redes = Array.isArray(formValues.rede)
      ? formValues.rede
      : [formValues.rede];
    const kits = Array.isArray(formValues.kit)
      ? formValues.kit
      : [formValues.kit];
    const precos = Array.isArray(formValues.preco)
      ? formValues.preco
      : [formValues.preco];

    const skus: string[] = [];

    for (const vsl of vsls) {
      for (const rede of redes) {
        for (let i = 0; i < Math.min(kits.length, precos.length); i++) {
          const sku = `A${formValues.conta}B${formValues.squad}C${formValues.produto}D${vsl}E${rede}F${formValues.tipo_de_venda}G${kits[i]}H${precos[i]}`;
          skus.push(sku);
        }
      }
    }

    return skus;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Composição do SKU</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-gray-800">
            O SKU é composto por 8 partes, cada uma representada por uma letra
            seguida de um número:
          </p>

          <div className="space-y-4">
            {skuStructure.map(({ prefix, name, description }) => {
              const fieldKey = getFieldKey(prefix);
              const value = formValues[fieldKey];
              const options = skuData[fieldKey];
              const selectedOption = getSelectedOption(prefix, value, options);

              return (
                <div key={prefix} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">
                    {prefix}: {name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1">{description}</p>
                  <p className="text-sm text-gray-800">
                    <span className="font-mono bg-gray-100 px-1 rounded">
                      {prefix}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </span>
                    {" → "}
                    <span className="text-blue-700">
                      {Array.isArray(selectedOption)
                        ? selectedOption.join(", ")
                        : selectedOption}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2 text-gray-900">
              SKUs que serão gerados:
            </h3>
            <div className="space-y-2">
              {generateAllSkus().map((sku, index) => (
                <p key={index} className="font-mono text-gray-800">
                  {sku}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
