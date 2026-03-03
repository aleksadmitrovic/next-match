import CardInnerWrapper from '@/components/CardInnerWrapper';
import React from 'react';
import ChatForm from './ChatForm';
import { getMessageThread } from '@/app/actions/messageActions';
import MessageBox from './MessageBox';
import { getAuthUserId } from '@/app/actions/authActions';
import MessageList from './MessageList';
import { createChatId } from '@/lib/util';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const messages = await getMessageThread(userId);
  const currentUserId = await getAuthUserId();
  const chatId = createChatId(currentUserId, userId);

  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={currentUserId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
}
