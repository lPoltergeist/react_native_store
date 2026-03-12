import { Store } from '@/src/interfaces/store';
import { Box, Button, Text } from '@gluestack-ui/themed';
import { RelativePathString, router } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

interface StoreCardProps {
  item: Store;
  onEdit: (product: Store) => void;
  onDelete: (id: string) => void;
}

export const StoreCard = React.memo(
  ({ item, onEdit, onDelete }: StoreCardProps) => {
    return (
      <Box
        bg="$white"
        p="$4"
        borderRadius="$xl"
        borderWidth={1}
        borderColor="$borderLight200"
      >
        <Box style={cardStyles.cardHeader}>
          <Text style={cardStyles.storeName}>{item.name}</Text>
          <Text style={cardStyles.storeAddress}>{item.address}</Text>
          <Box style={cardStyles.productBadge}>
            <Text style={cardStyles.productBadgeText}>
              Total de produtos: {item.productCount}
            </Text>
          </Box>
        </Box>

        <Box style={cardStyles.cardActions}>
          <Button
            style={[cardStyles.button, , cardStyles.buttonSecondary]}
            onPress={() => onEdit(item)}
          >
            <Text
              style={[cardStyles.buttonSecondaryText, cardStyles.buttonText]}
            >
              Editar
            </Text>
          </Button>

          <Button
            style={[cardStyles.button, cardStyles.buttonPrimary]}
            onPress={() =>
              router.push(`/products/${item.id}` as RelativePathString)
            }
          >
            <Text style={[cardStyles.buttonPrimaryText, cardStyles.buttonText]}>
              Produtos
            </Text>
          </Button>

          <Button
            style={[cardStyles.button, cardStyles.buttonDelete]}
            onPress={() => onDelete(item.id)}
          >
            <Text style={[cardStyles.buttonDeleteText, cardStyles.buttonText]}>
              Deletar
            </Text>
          </Button>
        </Box>
      </Box>
    );
  },
);

StoreCard.displayName = 'StoreCard';

const cardStyles = StyleSheet.create({
  cardContainer: { marginBottom: 16 },
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
  cardHeader: { marginBottom: 16 },
  productBadgeText: { color: '#2563EB', fontSize: 12, fontWeight: '600' },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    gap: 8,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
    marginTop: 16,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  buttonPrimary: { backgroundColor: '#2563EB' },
  buttonPrimaryText: { color: '#FFF', fontWeight: '700' },
  buttonSecondary: { backgroundColor: '#F1F5F9' },
  buttonSecondaryText: { color: '#475569', fontWeight: '700' },

  buttonDelete: { backgroundColor: '#F1F5F9' },
  buttonDeleteText: { color: '#EF4444', fontWeight: '700' },
});
