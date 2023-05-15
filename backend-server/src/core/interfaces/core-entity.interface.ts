import mongoose from "mongoose";

export interface ICoreEntity {
  _id: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date|null;
  deleted_status:Boolean;
}