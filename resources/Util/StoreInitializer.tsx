import React, { useEffect } from 'react';
import { contentStore } from '../stores/contentStore';

interface StoreInitializerProps {
  initialData: any;
  children: React.ReactNode;
}

const StoreInitializer: React.FC<StoreInitializerProps> = ({ initialData, children }) => {
  useEffect(() => {
    contentStore.set(initialData);
  }, [initialData]);

  return <>{children}</>;
};

export default StoreInitializer;
