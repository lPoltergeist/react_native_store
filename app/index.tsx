import { Box, Text } from '@gluestack-ui/themed';
import { ActivityIndicator, Alert, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StoreCard } from '@/src/components/Card/store-card';
import { Store } from '@/src/interfaces/store';
import { useStoreStore } from '@/src/store/useStoreStore';
import { RelativePathString, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { HeaderCreateButton } from '@/src/utils/addNew';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function StoreListScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderCreateButton path="stores/store-modal" label="Adicionar Loja" />
      ),
    });
  }, [navigation]);

  const router = useRouter();
  const { stores, isLoading, fetchStores, setSelectedStore, deleteStore } = useStoreStore();

  useEffect(() => {
    fetchStores();
  }, [fetchStores])

  const handleEdit = React.useCallback((store: Store) => {
    setSelectedStore(store);
    router.push('/stores/store-modal' as RelativePathString);
  }, [router, setSelectedStore]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Excluir Loja",
      "Tem certeza? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => deleteStore(id) }
      ]
    );
  }

  const renderItem = React.useCallback(({ item }: { item: Store }) => (
    <StoreCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
  ), [handleEdit]);

  return (
    <SafeAreaView style={styles.container}>
      <Box
        bg="$white"
        p="$6"
        borderRadius="$xl"
        borderWidth={1}
        borderColor="$borderLight200"
      >
        <Text style={styles.title}>Lojas</Text>
        <Text style={styles.subtitle}>Gerencie suas lojas</Text>
      </Box>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2563Eb" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={stores}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#1E293B' },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 4 },
  listContent: { padding: 20, paddingBottom: 100 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: { marginBottom: 16 },
  storeName: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  storeAddress: { fontSize: 14, color: '#64748B', marginTop: 4 },
  productBadge: {
    backgroundColor: '#EFF6FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 10,
  },
  productBadgeText: { color: '#2563EB', fontSize: 12, fontWeight: '600' },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16
  },
});
