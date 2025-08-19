const mongoose = require('mongoose');
const Counsellor = require('./models/counsellor');

const seedCounsellors = [
  {
    name: 'Dr. Amina',
    specialization: 'Family Therapy',
    sessionPrice: 1500,
    bio: 'Experienced family counsellor with over 10 years of helping families thrive.',
    image: '/images/amina.jpg',
    experience: '10+',
    specialties: ['Marriage', 'Parenting', 'Conflict Resolution'],
    languages: ['English', 'Swahili'],
    availableHours: ['09:00', '10:00', '14:00']
  },
  {
    name: 'Mr. Brian',
    specialization: 'Mental Health',
    sessionPrice: 1200,
    bio: 'Certified mental health expert focused on youth and anxiety cases.',
    image: '/images/brian.jpg',
    experience: '6',
    specialties: ['Anxiety', 'Depression', 'Youth'],
    languages: ['English'],
    availableHours: ['11:00', '13:00', '16:00']
  },
  {
    name: 'Omar Busolo',
    specialization: 'Mental Health',
    sessionPrice: 1000,
    bio: 'Certified mental health expert focused on youth and anxiety cases.',
    image: '/images/brian.jpg',
    experience: '6',
    specialties: ['Anxiety', 'Depression', 'Youth'],
    languages: ['English'],
    availableHours: ['10:00', '12:00', '16:00']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/counselling');

    await Counsellor.deleteMany({});
    await Counsellor.insertMany(seedCounsellors);
    console.log("✅ Seeded counsellors");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from DB");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
};

seedDB();
