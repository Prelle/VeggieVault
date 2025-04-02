import { Schema, model, Document } from 'mongoose';

interface IPlantVariety extends Document {
    variety: string;
    seedDepth: string;
    seedSpacing: string;
    waterRequirements: string;
    sunlightRequirements: string;
}

interface IPlant extends Document {
    name: string;
    varieties: IPlantVariety[];
}

const plantVarietySchema = new Schema<IPlantVariety>(
    {
        variety: {
            type: String,
            required: true,
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

const plantSchema = new Schema<IPlant>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        varieties: [plantVarietySchema]
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);


const PlantVariety = model<IPlantVariety>('PlantVariety', plantVarietySchema);
const Plant = model<IPlant>('Plant', plantSchema);

export { Plant, PlantVariety };
