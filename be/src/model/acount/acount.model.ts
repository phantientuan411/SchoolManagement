import mongoose from 'mongoose';
const accountSchema = new mongoose.Schema({
    accountName: ({
        type: String,
        required: true
    }),
    accountEmail: ({
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }),
    accountPassword: ({
        type: String,
        required: true
    }),
    phone: ({
        type: String,
        sparse: true,
    }),
    isActive: ({
        type: Boolean,
        required: true
    }),
    role: ({
        type: String,
        required: true,
        enum: ["student", "teacher", "staff", "admin"]
    }),
    avatarUrl: ({
        type: String //url anh
    }),
    avatarId: ({
        type: String //cloudiary
    }),
    bio: ({
        type: String,
        maxlength: 200,
        trim: true
    })
},
    {
        timestamps: true
    })
const accountModel = mongoose.models.accounts || mongoose.model('accounts', accountSchema);
export default accountModel;