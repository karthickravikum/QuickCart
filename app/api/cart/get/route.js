import { connectDB } from "@/utils/db";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        await connectDB();
    } catch (error) {
        
    }
}