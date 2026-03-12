// components/HeaderCreateButton.tsx
import { RelativePathString, router } from 'expo-router';
import { Button } from 'react-native';
import { useProductStore } from '../store/useProductStore';
import { useStoreStore } from '../store/useStoreStore';

export const HeaderCreateButton = ({ path, label }: { path: string, label: string }) => {
  const handlePress = () => {
    if (path === 'stores/store-modal') {
      useStoreStore.getState().clearSelectedStore();
    } else {
      useProductStore.getState().clearSelectedProduct();
    }
    router.push(path as RelativePathString);
  };

  return (
    <Button title={label} onPress={handlePress} />
  );
};