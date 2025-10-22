import React from 'react';

interface CollectionItemProps {
  label: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ label }) => {
  const baseURL = '';

  //   Single words have no encoding for double quotations
  const encodeLabel = (label: string): string => {
    return label.includes(' ')? `"${encodeURIComponent(label.toLowerCase())}"`: encodeURIComponent(label.toLowerCase());
  };

  const encodedLabel = encodeLabel(label);

  return (
    <div className='item'>
      <div className='card'>
        <a href={`${baseURL}/search/?q=${encodedLabel}&page=1`}>{label}</a>
      </div>
    </div>
  );
};

export default CollectionItem;
