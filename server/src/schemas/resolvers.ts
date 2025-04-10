import { User, Plant, SeedBox } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username })
    },

    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },

    plants: async (_parent: any, { limit }: any) => {
      return Plant.find().limit(limit).populate('varieties');
    },

    searchPlants: async (_parent: any, { searchQuery }: { searchQuery: string }) => {
      // If no searchQuery is provided, return all plants
      if (!searchQuery) {
        return Plant.find();
      }

      // Build query with $or to search both name and varieties.variety
      const query = {
        $or: [
          { name: { $regex: new RegExp(searchQuery, 'i') } }, // Search plant name
          { varieties: { $elemMatch: { variety: { $regex: new RegExp(searchQuery, 'i') } } } }  // Search variety name
        ]
      };

      return Plant.find(query);
    },

    seedBoxes: async () => {
      return SeedBox.find();
    },

    mySeedBox: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        const seedBox = await SeedBox.findOne({ user: context.user._id })
          .populate('entries.plant')
          .populate('entries.variety')

        if (seedBox) {
          return seedBox
        }
        return null;
      }
      throw new AuthenticationError('Could not authenticate user.');
    }
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
  },
};

export default resolvers;
