import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    shortName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },

    technologies: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one technology is required",
      },
    },

    experience: {
      type: String,
      required: [true, "Experience is required"],
    },

    projects: [
      {
        title: {
          type: String,
          required: [true, "Project title required"],
        },
        description: String,
        github: String,
        image: String,
      },
    ],

    phone: String,
    contactEmail: String,
    linkedin: String,
    github: String,
    location: String,
    design: {
      type: String,
      default: "template1",
    },

    photo: String,

  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);