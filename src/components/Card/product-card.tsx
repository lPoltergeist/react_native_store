import { Product } from '@/src/interfaces/product';
import { Box, Button, Text } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';

interface ProductCardProps {
  item: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = React.memo(
  ({ item, onEdit, onDelete }: ProductCardProps) => {
    return (
      <Box
        bg="$white"
        p="$4"
        borderRadius="$xl"
        borderWidth={1}
        borderColor="$borderLight200"
        style={cardStyles.cardContainer}
      >
        <Box>
          <Text style={cardStyles.storeName}>{item.name}</Text>
          <Text style={cardStyles.storeAddress}>{item.category}</Text>
          <Box style={cardStyles.productBadge}>
            <Text style={cardStyles.productBadgeText}>
              Preço: R$ {item.price}
            </Text>
          </Box>
        </Box>

        <Box style={cardStyles.cardActions}>
          <Button
            style={[cardStyles.button, cardStyles.buttonDelete]}
            onPress={() => onDelete(item.id)}
          >
            <Text style={[cardStyles.buttonDeleteText, cardStyles.buttonText]}>
              Deletar
            </Text>
          </Button>

          <Button
            style={[cardStyles.button, cardStyles.buttonPrimary]}
            onPress={() => onEdit(item)}
          >
            <Text style={[cardStyles.buttonPrimaryText, cardStyles.buttonText]}>
              Editar Produto
            </Text>
          </Button>
        </Box>
      </Box>
    );
  },
);

ProductCard.displayName = 'ProductCard';

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
    flexDirection: 'row-reverse',
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
