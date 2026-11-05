import React from 'react';
import { Link } from '@inertiajs/react';

interface CollectionItemProps {
  label: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ label }) => {
  return (
    <div className='item'>
      <div className='card'>
        <Link href={route('search', { q: label, page: 1 })}>{label}</Link>
      </div>
    </div>
  );
};

export default CollectionItem;
