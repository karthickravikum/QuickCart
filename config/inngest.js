import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

export const syncUserCreation = inngest.createFunction(
    {
    id: "sync-user-from-clerk",
    },
    {event: "clerk/user.created",},
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userDate = {
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userDate)
    }
)

export const syncUserUpdate = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {event: "clerk/user.updated"},
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userDate = {
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userDate)
    }
)

export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerk'
    },
    {event: "clerk/user.deleted"},
    async ({ event }) => {
        const { id } = event.data;
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)

