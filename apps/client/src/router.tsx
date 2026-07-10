import { createBrowserRouter } from "react-router";

import { AppLayout } from "./AppLayout";

import { EmptyState } from "./EmptyState";

import { ChatPage } from "@/features/chat/chat.page";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <AppLayout />,

    children: [
      {
        index: true,

        element: <EmptyState />,
      },

      {
        path: "chat/:chatId",

        element: <ChatPage />,
      },
    ],
  },
]);
