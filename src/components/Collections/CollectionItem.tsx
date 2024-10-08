import React from 'react';

interface CollectionItemProps {
}

const CollectionItem: React.FC<CollectionItemProps> = () => {
  const baseURL: string = import.meta.env.BASE_URL;

  return (
    <div className="item">
      <div className="card">
        <a href={`${baseURL}search/?q=%22ancient%20judaism%22`}>
          Ancient Judaism
        </a>
      </div>
    </div>
  );
};

export default CollectionItem;
