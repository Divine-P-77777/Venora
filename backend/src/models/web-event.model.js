const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
    heroContent : {
        type: String,
    },
    heroImage : {
        type: String,
    },
    intro :{
        type: String
    },
    introImage:{
        type : String
    },
    gallery :{
        type : [String],
    },
    contact :{
        type : String
    }
})

const speakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    image: { type: String },
    bio: { type: String }
})

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
})

const websiteEventSchema = new mongoose.Schema({
    event_id: {
        ref: "events",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    template: {
        type: templateSchema,
    },
    schedule: {
        type: String,
    },
    speakers: {
        type: [speakerSchema],
        default: []
    },
    gallery: {
        type: [String],
        default: []
    },
    faqs: {
        type: [faqSchema],
        default: []
    },
    contact: {
        type: String,
    },
    settings: {
        type: Object,
        default: {}
    },
    published: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const webEventModel = mongoose.model("web-events", websiteEventSchema)
module.exports = webEventModel;
