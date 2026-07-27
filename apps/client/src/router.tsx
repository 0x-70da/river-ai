import { createBrowserRouter } from "react-router";

import { App } from "./App";

import { EmptyState } from "./EmptyState";

import { ChatPage } from "@/features/chat/chat.page";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    errorElement: <ErrorPage />,

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
