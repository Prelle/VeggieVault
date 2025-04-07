import { Schema, model, Document, ObjectId } from 'mongoose';

interface ISeedBoxEntry extends Document {
    plant: ObjectId;
    variety: ObjectId;
    frostHardy?: boolean;
    sowDate?: string;
    notes?: string;
}

interface ISeedBox extends Document {
    user: ObjectId;
    entries: ISeedBoxEntry[];
}

const seedBoxEntrySchema = new Schema<ISeedBoxEntry>(
    {
        plant: {
            type: Schema.Types.ObjectId,
            ref: 'Plant',
            required: true
        },
        variety: {
            type: Schema.Types.ObjectId,
            ref: 'PlantVariety',
            required: true,
        },
        frostHardy: {
            type: Boolean,
            required: false,
        },
        sowDate: {
            type: String,
            required: false,
        },
        notes: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const seedBoxSchema = new Schema<ISeedBox>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        entries: [seedBoxEntrySchema]
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const SeedBox = model<ISeedBox>('SeedBox', seedBoxSchema);

export default SeedBox;
