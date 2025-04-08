import { Schema, model, Document, ObjectId } from 'mongoose';

interface IPlant extends Document {
    name: string;
    varieties: ObjectId[];
}

const plantSchema = new Schema<IPlant>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        varieties: [{
            type: Schema.Types.ObjectId,
            ref: 'PlantVariety'
        }]
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Plant = model<IPlant>('Plant', plantSchema);

export default Plant;
