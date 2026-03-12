import { Box, Text } from '@gluestack-ui/themed';
import { ActivityIndicator, Alert, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductCard } from '@/src/components/Card/product-card';
import { Product } from '@/src/interfaces/product';
import { useProductStore } from '@/src/store/useProductStore';
import { HeaderCreateButton } from '@/src/utils/addNew';
import { RelativePathString, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect } from 'react';


export default function ProductsListScreen() {
    const navigation = useNavigation()

    const { storeId } = useLocalSearchParams()

    const router = useRouter();
    const { products, isLoading, fetchProducts, setSelectedProduct, deleteProduct } = useProductStore();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderCreateButton path="products/product-modal" label="Adicionar Produto" />
            ),
        });
    }, [navigation]);


    useEffect(() => {
        fetchProducts(storeId as string);
    }, [fetchProducts, storeId]);

    const handleEdit = React.useCallback((product: Product) => {
        setSelectedProduct(product);
        router.push('/products/product-modal' as RelativePathString);
    }, [router, setSelectedProduct]);

    const handleDelete = (id: string) => {
        Alert.alert(
            "Excluir Produto",
            "Tem certeza? Essa ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => deleteProduct(id) }
            ]
        );
    }

    const renderItem = React.useCallback(({ item }: { item: Product }) => (
        <ProductCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
    ), [handleEdit]);

    return (
        <SafeAreaView style={styles.container}>
            <Box
                bg="$white"
                p="$4"
                borderRadius="$xl"
                borderWidth={1}
                borderColor="$borderLight200"
            >
                <Text style={styles.title}>Produtos</Text>
                <Text style={styles.subtitle}>Gerencie seus produtos</Text>
            </Box>

            {isLoading ? (
                <ActivityIndicator size="large" color="#2563Eb" style={{ flex: 1 }} />
            ) : (
                <FlatList
                    data={products}
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
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 16
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPrimary: { backgroundColor: '#2563EB' },
    buttonPrimaryText: { color: '#FFF', fontWeight: '700' },
    buttonSecondary: { backgroundColor: '#F1F5F9' },
    buttonSecondaryText: { color: '#475569', fontWeight: '700' },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: '#2563EB',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabText: { color: '#FFF', fontSize: 32, fontWeight: '300' }
});

