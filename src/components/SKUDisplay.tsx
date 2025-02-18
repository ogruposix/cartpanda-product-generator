import { DecodedSKU } from "@/types/sku";

type SKUDisplayProps = {
  generatedSKU: string;
  decodedSKU: DecodedSKU | null;
};

export default function SKUDisplay({
  generatedSKU,
  decodedSKU,
}: SKUDisplayProps) {
  if (!generatedSKU) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          SKU Gerado:
        </h2>
        <p className="text-lg font-mono bg-gray-100 p-2 rounded">
          {generatedSKU}
        </p>
      </div>

      {decodedSKU && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            SKU Decodificado:
          </h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(decodedSKU, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
