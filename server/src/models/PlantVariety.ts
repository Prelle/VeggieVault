import { Schema, model, Document } from 'mongoose';

// Define an interface for the User document
interface IPlantVariety extends Document {
    variety: string;
    seedDepth: string;
    seedSpacing: string;
    waterRequirements: string;
    sunlightRequirements: string;
}

// Define the schema for the User document
const plantVarietySchema = new Schema<IPlantVariety>(
    {
        variety: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        seedDepth: {
            type: String,
            required: true,
        },
        seedSpacing: {
            type: String,
            required: true,
        },
        waterRequirements: {
            type: String,
            required: true,
        },
        sunlightRequirements: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);


const PlantVariety = model<IPlantVariety>('PlantVariety', plantVarietySchema);

export default PlantVariety;
