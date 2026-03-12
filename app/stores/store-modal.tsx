import { Store } from '@/src/interfaces/store';
import { useStoreStore } from '@/src/store/useStoreStore';
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
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function StoreModal() {
  const router = useRouter();
  const { selectedStore, createStore, updateStore, clearSelectedStore } =
    useStoreStore();

  const [name, setName] = useState(selectedStore?.name || '');
  const [address, setAddress] = useState(selectedStore?.address || '');

  const handleSave = async () => {
    if (!name || !address) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const storeData = { name, address: address };

    if (selectedStore) {
      await updateStore(selectedStore.id, storeData);
    } else {
      await createStore(storeData as Omit<Store, 'id'>);
    }

    clearSelectedStore();
    router.back();
  };

  const handleGoBack = () => {
    clearSelectedStore();
    router.back();
  };

  return (
    <Box flex={1} bg="$white" p="$6">
      <VStack space="lg">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Nome da Loja</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField value={name} onChangeText={setName} />
          </Input>
        </FormControl>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Endereço</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField value={address} onChangeText={setAddress} />
          </Input>
        </FormControl>

        <Button onPress={handleSave} mt="$4">
          <ButtonText>Salvar Loja</ButtonText>
        </Button>
        <Button onPress={handleGoBack} mt="$4">
          <ButtonText>Voltar</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
