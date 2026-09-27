const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const roleModel = require('../models/role.model');
const profileModel = require('../models/profile.model');
const { cclerkClient } = require('@clerk/express')


require('dotenv').config();

seedRootAdmin = async () => {
    try {

        let superAdminRole = await roleModel.findOne({ name: 'super-admin' });


        if (!superAdminRole) {
            superAdminRole = new roleModel({
                name: 'super-admin',
                description: 'Root system administrator',
                permissions: {
                    events: { read: true, write: true, delete: true },
                    users: { read: true, write: true, delete: true },
                    billing: { read: true, write: true, delete: true },
                    analytics: { read: true, write: true, delete: true }
                }
            });
            await superAdminRole.save();
            console.log('Super Admin Role created.');
        }

        // check admin if already exists
        const adminEmail = process.env.ADMIN_EMAIL;
        const existingAdmin = await profileModel.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin already exists!');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

        const user = await clerkClient.users.createUser({
            emailAddress: [adminEmail],
            password: hashedPassword,
        })

        const mainAdmin = await profileModel.create({
            clerkId: user.id,
            username: "Super Admin",
            role: superAdminRole._id,
            email: adminEmail,
        })


        await mainAdmin.save();
        console.log(' First Main Admin successfully created in Atlas!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};


module.exports = { seedRootAdmin }