import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Chat = model("Chat", chatSchema);
