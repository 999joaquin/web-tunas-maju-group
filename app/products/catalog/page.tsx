// src/app/products/catalog/page.tsx
import dynamic from 'next/dynamic';

const ProductCatalog = dynamic(() => import('../../components/Catalog'), {
  ssr: false
});

export default function CatalogPage() {
  return <ProductCatalog />;
}
