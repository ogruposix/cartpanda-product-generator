import { SKUData } from "@/types/sku";
import SKUHelp from "./SKUHelp";
import { MultiSelect } from "./ui/MultiSelect";
import { fieldLabels } from "@/utils/fieldLabels";
import { Dialog } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

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
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">
            Selecione os Parâmetros
          </h2>
          <p className="text-xs text-gray-600 mt-0.5 leading-tight">
            Kits e preços são combinados em ordem. Exemplo: kits [1,3,6] e
            preços [47,97,147] irá criar: 1/$47, 3/$97, 6/$147.
          </p>
        </div>

        <Dialog>
          <DialogTrigger
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center font-semibold transition-colors flex-shrink-0"
            title="Ajuda sobre a composição do SKU"
          >
            ?
          </DialogTrigger>

          <SKUHelp formValues={formValues} skuData={skuData} />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(skuData).map(([key, options]) => {
          const isMultiSelect =
            key === "vsl" || key === "rede" || key === "kit" || key === "preco";

          return (
            <MultiSelect
              key={key}
              id={key}
              label={fieldLabels[key] || key.replace("_", " ")}
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
    </div>
  );
}
