// components/HeaderCreateButton.tsx
import { RelativePathString, router } from 'expo-router';
import { Button } from 'react-native';
import { useProductStore } from '../store/useProductStore';
import { useStoreStore } from '../store/useStoreStore';

export const HeaderCreateButton = ({
  path,
  label,
  params,
}: {
  path: string;
  label: string;
  params?: any;
}) => {
  const handlePress = () => {
    if (path === 'stores/store-modal') {
      useStoreStore.getState().clearSelectedStore();
    } else {
      useProductStore.getState().clearSelectedProduct();
    }
    console.log('params', params, 'path', path);
    router.push({ pathname: path as RelativePathString, params: params });
  };

  return <Button title={label} onPress={handlePress} />;
};
