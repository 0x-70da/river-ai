import { createBrowserRouter } from "react-router";

import { App } from "./App";

import { EmptyState } from "./EmptyState";

import { ChatPage } from "@/features/chat/chat.page";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,

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
