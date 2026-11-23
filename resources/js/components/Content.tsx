import React from 'react';
import ItemCard from './ItemCard';
import { type ItemCardProps } from '@/types';

const Content: React.FC<{ documents: ItemCardProps[] }> = ({ documents }) => {
  return (
    <>
      <div className='item-list flex-container'>
        {documents.map((document: any, index: number) => {
          return <ItemCard key={index} document={document} />;
        })}
        <article className='item'></article>
        <article className='item'></article>
      </div>
    </>
  );
};

export default Content;
