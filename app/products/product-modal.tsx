import { Product } from '@/src/interfaces/product';
import { useProductStore } from '@/src/store/useProductStore';
import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  VStack,
} from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function ProductModal() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    selectedProduct,
    createProduct,
    updateProduct,
    clearSelectedProduct,
  } = useProductStore();

  const [name, setName] = useState(selectedProduct?.name || '');
  const [category, setCategory] = useState(selectedProduct?.category || '');
  const [price, setPrice] = useState(selectedProduct?.price.toString() || '');

  const handleSave = async () => {
    if (!name || !category || !price) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const productData = {
      name,
      category,
      price: parseFloat(price),
      storeId: (selectedProduct
        ? selectedProduct.storeId
        : params.storeId) as string,
    };

    if (selectedProduct) {
      await updateProduct(selectedProduct.id, productData);
    } else {
      await createProduct(productData as Omit<Product, 'id'>);
    }

    clearSelectedProduct();
    router.back();
  };

  const handleGoBack = () => {
    clearSelectedProduct();
    router.back();
  };

  return (
    <Box flex={1} bg="$white" p="$6">
      <VStack space="lg">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Nome do Produto</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField value={name} onChangeText={setName} />
          </Input>
        </FormControl>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Categoria</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField value={category} onChangeText={setCategory} />
          </Input>
        </FormControl>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Preço</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </Input>
        </FormControl>

        <Button onPress={handleSave} mt="$4">
          <ButtonText>Salvar Produto</ButtonText>
        </Button>
        <Button onPress={handleGoBack} mt="$4">
          <ButtonText>Voltar</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
