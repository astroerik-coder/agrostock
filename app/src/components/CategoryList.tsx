import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProductItem } from '../../types';

interface CategoryListProps {
  items: ProductItem[];
  title: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ items, title }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Text style={styles.iconLeaf}>🌿</Text>
                <View style={styles.iconLines}>
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                </View>
              </View>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>
                {item.name} {item.icon} - {item.amount} {item.unit} {item.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7F6',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  iconBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D0EFEE',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeaf: {
    fontSize: 16,
    position: 'absolute',
  },
  iconLines: {
    position: 'absolute',
    bottom: 8,
  },
  line: {
    width: 16,
    height: 1,
    backgroundColor: '#40BFBA',
    marginVertical: 1,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CategoryList;