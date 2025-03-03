import { SKUData } from "@/types/sku";
import { fieldLabels } from "@/utils/fieldLabels";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type SKUHelpProps = {
  formValues: Record<string, string | string[]>;
  skuData: SKUData;
};

export default function SKUHelp({ formValues, skuData }: SKUHelpProps) {
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
    <DialogContent className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-gray-900">Composição do SKU</p>
          <DialogClose className="text-gray-500 hover:text-gray-700" />
        </DialogTitle>
        <DialogDescription>
          O SKU é composto por 8 partes, cada uma representada por uma letra
          seguida de um número:
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Valores selecionados */}
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

        {/* SKUs gerados */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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

        {/* Lista de todas as possibilidades */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">
            Todas as possibilidades:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skuStructure.map(({ prefix, name }) => {
              const fieldKey = getFieldKey(prefix);
              const options = skuData[fieldKey];

              return (
                <div key={prefix} className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-800">
                    {prefix}: {name}
                  </h4>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    {options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="font-mono text-gray-800">
                          {prefix}
                          {prefix === "D"
                            ? index
                            : prefix === "H"
                            ? option
                            : index + 1}
                        </span>
                        <span>→</span>
                        <span>{prefix === "H" ? `$${option}` : option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
