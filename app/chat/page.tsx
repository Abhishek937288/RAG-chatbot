"use client";

import { Fragment, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";

const RAGChatbot = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh)">
      <div className="flex flex-col h-full"></div>
      <Conversation className="h-full">
        <ConversationContent>Message will go</ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput className="mt-4">
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
        <PromptInputToolbar>
          <PromptInputTools>
            {/* Model selector , web search icon */}
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};

export default RAGChatbot;
