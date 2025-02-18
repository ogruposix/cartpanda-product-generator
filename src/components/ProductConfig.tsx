type ProductConfigProps = {
  productConfig: {
    handle: string;
    title: string;
    description: string;
    isParentProduct: boolean;
  };
  setProductConfig: (config: ProductConfigProps["productConfig"]) => void;
};

export default function ProductConfig({
  productConfig,
  setProductConfig,
}: ProductConfigProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Configuração do Produto
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="handle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Handle
          </label>
          <input
            type="text"
            id="handle"
            value={productConfig.handle}
            onChange={(e) =>
              setProductConfig({ ...productConfig, handle: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900"
            placeholder="Handle"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isParentProduct"
            checked={productConfig.isParentProduct}
            onChange={(e) =>
              setProductConfig({
                ...productConfig,
                isParentProduct: e.target.checked,
              })
            }
            className="rounded border-gray-300"
          />
          <label
            htmlFor="isParentProduct"
            className="text-sm font-medium text-gray-700"
          >
            Produto Pai?
          </label>
        </div>

        {productConfig.isParentProduct && (
          <>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Título do Produto Pai
              </label>
              <input
                type="text"
                id="title"
                value={productConfig.title}
                onChange={(e) =>
                  setProductConfig({ ...productConfig, title: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-gray-900"
                placeholder="Título Principal do Produto"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descrição do Produto Pai
              </label>
              <textarea
                id="description"
                value={productConfig.description}
                onChange={(e) =>
                  setProductConfig({
                    ...productConfig,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2 h-32 text-gray-900"
                placeholder="Descrição Detalhada do Produto"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
