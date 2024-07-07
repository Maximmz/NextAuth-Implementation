import { NextResponse } from "next/server";
import { connectToDb } from "../../../../lib/server-helpers"
import prisma from "../../../../prisma";

export const GET = async () => {
    try {
        await connectToDb();
        const users = await prisma.user.findMany();  
        return NextResponse.json({users}, {status: 200})     
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}