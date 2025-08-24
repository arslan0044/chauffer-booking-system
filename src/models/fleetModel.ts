import mongoose from "mongoose";

const fleetSchema = new mongoose.Schema({
  // Basic Identification
  make: {
    type: String,
    required: [true, "Please provide the car manufacturer (e.g., Mercedes)"],
  },
  model: {
    type: String,
    required: [true, "Please provide the car model"],
    index: true,
  },
  year: {
    type: Number,
    required: [true, "Please provide the manufacturing year"],
  },
  licensePlate: {
    type: String,
    required: [true, "Please provide the license plate"],
    unique: true,
  },
  vin: {
    type: String,
    required: [true, "Please provide the VIN"],
    unique: true,
  },
  // Vehicle Specifications
  vehicleType: {
    type: String,
    required: [true, "Please specify vehicle type"],
    enum: ['Sedan', 'SUV', 'Limousine', 'Van', 'Convertible', 'Coupe'],
  },
  category: {
    type: String,
    required: [true, "Please specify luxury category"],
    enum: ['Premium', 'Business', 'Elite', 'Luxury', 'VIP'],
    index: true,
  },
  seats: {
    type: Number,
    required: [true, "Please provide passenger capacity"],
    min: 2,
  },
  doors: {
    type: Number,
    required: [true, "Please provide number of doors"],
    min: 2,
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    default: 'Automatic',
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
    required: true,
  },
  features: {
    type: [String],
    enum: [
      'WiFi', 'TV', 'MiniBar', 'Sunroof',
      'MassageSeats', 'PrivacyPartition', 'ClimateControl',
      'ChargingPorts', 'AirPurifier', 'LeatherSeats'
    ],
  },
  luggageCapacity: {
    type: Number, // in number of standard suitcases
    required: true,
  },

  // Operational Details
  basePricePerHour: {
    type: Number,
    required: [true, "Please provide base hourly rate"],
  },
  pricePerKm: {
    type: Number,
    required: [true, "Please provide price per kilometer"],
  },
  minimumBookingHours: {
    type: Number,
    default: 1,
  },
  available: {
    type: Boolean,
    default: true,
    index: true,
  },
  // Media
  images: {
    type: [
      {
        url: {
          type: String,
          required: true
        },
        isThumbnail: {
          type: Boolean,
          default: false
        }
      }
    ],
    validate: {
      validator: function (arr: Array<String>) {
        return arr.length >= 3 && arr.length <= 10;
      },
      message: 'Images must be between 3 and 10'
    }
  },
  // Metadata
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
}, {
  timestamps: true,
});

// Validator function for image arrays
function arrayLimit(val: Array<string>) {
  return val.length >= 3 && val.length <= 10;
}

// Indexes for frequently queried fields
fleetSchema.index({ vehicleType: 1, category: 1, available: 1 });
fleetSchema.index({ make: 1, model: 1 });

const Fleet = mongoose.models.Fleet || mongoose.model('Fleet', fleetSchema);
export default Fleet;