import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getDocuments from '@wasp/queries/getDocuments';

export function DocumentPage() {
  const { documentId } = useParams();
  const { data: document, isLoading, error } = useQuery(getDocuments, { documentId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{document.name}</h1>
      <div className='border border-gray-300 p-4 rounded-lg'>
        <p>{document.file}</p>
      </div>
      <Link to={`/document/${document.id}/edit`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Edit</Link>
      <Link to={`/document/${document.id}/delete`} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2'>Delete</Link>
    </div>
  );
}