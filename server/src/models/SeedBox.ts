import { Schema, model, Document, ObjectId } from 'mongoose';

interface ISeedBoxEntry extends Document {    
    plant: ObjectId;
    variety: string;
    frostHardy: boolean;
    sowDate: Date;
    notes: string;
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
            type: String,
            required: true,
        },
        frostHardy: {
            type: Boolean,
            required: false,
        },
        sowDate: {
            type: Date,
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
