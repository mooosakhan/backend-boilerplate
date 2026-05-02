const mongoose = require("mongoose");
const schemaType = require("../../Types/index");

const studentSchema = new mongoose.Schema({
  date_of_birth: { type: schemaType.TypeDate, required: true },
  full_name: { type: schemaType.TypeString, required: true },
  father_name: { type: schemaType.TypeString, required: true },
  gender: { type: schemaType.TypeString, required: true },
  computer_profieciency: { type: schemaType.TypeString },
  email: { type: schemaType.TypeString, required: true },
  contact_number: { type: schemaType.TypeString, required: true },
  father_contact_number: { type: schemaType.TypeString },
  student_cnic: { type: schemaType.TypeString, required: true, unique: true },
  father_cnic: { type: schemaType.TypeString },
  full_address: { type: schemaType.TypeString, required: true },
  last_qualification: { type: schemaType.TypeString, required: true },
  image: { type: schemaType.TypeString, required: true },
  password: { type: schemaType.TypeString, required: true },
  alumni: {
    working_experience: [
      {
        company: schemaType.TypeString,
        role: schemaType.TypeString,
        start_date: schemaType.TypeString,
        end_date: schemaType.TypeString,
        is_current: schemaType.TypeBoolean,
      },
    ],
    projects: [
      {
        title: schemaType.TypeString,
        description: schemaType.TypeString,
        link: schemaType.TypeString,
      },
    ],
    skills: [
      {
        name: schemaType.TypeString,
        level: schemaType.TypeString,
      },
    ],
    links: [
      {
        platform: schemaType.TypeString,
        url: schemaType.TypeString,
      },
    ],
    education: [
      {
        degree: schemaType.TypeString,
        institute: schemaType.TypeString,
        year: schemaType.TypeString,
      },
    ],
    certifications: [
      {
        name: schemaType.TypeString,
        authority: schemaType.TypeString,
        date: schemaType.TypeDate,
        image: schemaType.TypeString,
      },
    ],
    is_public: {
      type: schemaType.TypeBoolean,
      default: false,
    },
    cover_picture: {
      type: schemaType.TypeString,
    },
    about: {
      type: schemaType.TypeString,
    },
  },
});

module.exports = studentSchema;
