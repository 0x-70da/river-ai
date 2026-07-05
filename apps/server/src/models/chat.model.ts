import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: "New Chat",
    },
  },
  {
    timestamps: true,
  },
);

export const Chat = model("Chat", chatSchema);
