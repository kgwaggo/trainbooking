import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getMessages from '@wasp/queries/getMessages';
import markMessageAsRead from '@wasp/actions/markMessageAsRead';

export function Message() {
  const { messageId } = useParams();
  const { data: messages, isLoading, error } = useQuery(getMessages, { userId: parseInt(messageId) });
  const markMessageAsReadFn = useAction(markMessageAsRead);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleMessageRead = () => {
    markMessageAsReadFn({ messageId: parseInt(messageId) });
  };

  return (
    <div className=''>
      {messages.map((message) => (
        <div key={message.id} className=''>
          <p>{message.content}</p>
          <button onClick={handleMessageRead} className=''>
            Mark as Read
          </button>
        </div>
      ))}
    </div>
  );
}