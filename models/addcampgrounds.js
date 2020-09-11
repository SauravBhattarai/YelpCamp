// Immport Mongoose
const mongoose = require('mongoose');

// Create a schema for the database and save it in a variable.
const addCampgroundSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true 
    }
});

// Export the schema as the variable created above and give it a name ('AddCampground' in this case) 
module.exports = mongoose.model('AddCampground', addCampgroundSchema);