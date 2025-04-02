import { Schema, model, Document, ObjectId } from 'mongoose';

interface ISeedBoxEntry extends Document {
    plantId: ObjectId;
    varietyId: string;
    frostHardy: boolean;
    sowDate: Date;
}

interface ISeedBox extends Document {
    userId: ObjectId;
    entries: ISeedBoxEntry[];
}

const seedBoxEntrySchema = new Schema<ISeedBoxEntry>(
    {
        plantId: {
            type: Schema.Types.ObjectId,
            ref: 'Plant',
            required: true
        },
        varietyId: {
            type: String,
            required: true,
        },
        frostHardy: {
            type: Boolean,
            required: true,
        },
        sowDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const seedBoxSchema = new Schema<ISeedBox>(
    {
        userId: {
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
