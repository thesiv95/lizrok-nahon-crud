import { Schema, model } from 'mongoose';

const ItemsCategoryList = [
  'orange',
  'purple'
];

interface ItemInterface {
  item: string;
  category: string;
}

const itemSchema = new Schema<ItemInterface>({
  item: { type: String, required: true },
  category: { type: String, required: true, enum: ItemsCategoryList },
});

const Item = model<ItemInterface>('Item', itemSchema);

export default Item;