import { Schema, model } from 'mongoose';

interface TipInterface {
  index: number;
  title: string;
  text: string;
}

const tipSchema = new Schema<TipInterface>({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const Tip = model<TipInterface>('Tip', tipSchema);

export default Tip;