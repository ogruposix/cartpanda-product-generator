import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { decodeSKU } from "@/utils/skuUtils";
import { skuData } from "@/data/skuData";
import { SearchCodeIcon } from "lucide-react";

interface DecodedSKU {
  conta: string;
  squad: string;
  produto: string;
  vsl: string;
  rede: string;
  tipo_de_venda: string;
  kit: string;
  preco: string;
}

export default function SKUDecoder() {
  const [sku, setSku] = useState("");
  const [decodedSku, setDecodedSku] = useState<DecodedSKU | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [open, setOpen] = useState(false);

  const handleDecode = () => {
    const result = decodeSKU(sku, skuData);
    setDecodedSku(result);
    setIsValid(!Object.values(result).includes("INVALID"));
  };

  // const getStatusColor = (isValid: boolean) => {
  //   return isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  // };

  const getBadgeVariant = (isValid: boolean) => {
    return isValid ? "outline" : "destructive";
  };

  const formatPrice = (price: string) => {
    return `$${parseInt(price)}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SearchCodeIcon />
          Decodificar SKU
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Decodificador de SKU
          </DialogTitle>
          <DialogDescription>
            Insira o código SKU no formato A1B2C3D4E5F6G7H123
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="sku" className="text-left">
              Código SKU
            </Label>
            <div className="flex gap-2">
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Ex: A1B2C3D0E1F2G3H999"
                className="flex-1"
              />
              <Button onClick={handleDecode}>Decodificar</Button>
            </div>
          </div>

          {decodedSku && (
            <Card
              className={`mt-4 border-2 ${
                isValid ? "border-green-200" : "border-red-200"
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Resultado da Decodificação
                  </h3>
                  <Badge variant={getBadgeVariant(isValid)}>
                    {isValid ? "Válido" : "Inválido"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  <div>
                    <p className="text-sm text-gray-500">Conta</p>
                    <p className="font-medium">{decodedSku.conta}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Squad</p>
                    <p className="font-medium">{decodedSku.squad}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Produto</p>
                    <p className="font-medium">{decodedSku.produto}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">VSL</p>
                    <p className="font-medium">{decodedSku.vsl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rede</p>
                    <p className="font-medium">{decodedSku.rede}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tipo de Venda</p>
                    <p className="font-medium">{decodedSku.tipo_de_venda}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kit</p>
                    <p className="font-medium">{decodedSku.kit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preço</p>
                    <p className="font-medium font-mono text-lg">
                      {isValid
                        ? formatPrice(decodedSku.preco)
                        : decodedSku.preco}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
