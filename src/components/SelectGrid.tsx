import { SKUData } from "@/types/sku";
import { useState } from "react";
import SKUHelp from "./SKUHelp";
import { MultiSelect } from "./ui/MultiSelect";

type FormValues = {
  conta: string;
  squad: string;
  produto: string;
  vsl: string[];
  rede: string[];
  tipo_de_venda: string;
  kit: string[];
  preco: string[];
  [key: string]: string | string[];
};

type SelectGridProps = {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  skuData: SKUData;
};

export default function SelectGrid({
  formValues,
  setFormValues,
  skuData,
}: SelectGridProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Selecione os parâmetros
        </h2>
        <button
          onClick={() => setIsHelpOpen(true)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold transition-colors"
          title="Ajuda sobre a composição do SKU"
        >
          ?
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(skuData).map(([key, options]) => {
          const isMultiSelect =
            key === "vsl" || key === "rede" || key === "kit" || key === "preco";

          return (
            <MultiSelect
              key={key}
              id={key}
              label={key.replace("_", " ")}
              options={options.map((item, index) => ({
                value:
                  key === "preco"
                    ? item
                    : String(index + (key === "vsl" ? 0 : 1)),
                label: item,
              }))}
              selected={
                Array.isArray(formValues[key])
                  ? formValues[key]
                  : [formValues[key]]
              }
              onChange={(values) => {
                setFormValues((prev) => ({
                  ...prev,
                  [key]: isMultiSelect ? values : values[0],
                }));
              }}
              isMulti={isMultiSelect}
            />
          );
        })}
      </div>

      <SKUHelp
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        formValues={formValues}
        skuData={skuData}
      />
    </div>
  );
}
