import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../lib/server-helpers";
import bcrypt from "bcrypt";
import prisma from "../../../../../prisma";

export const POST = async (req: Request) => {
try {
    const {name,email,password} = await req.json();
    if(!name || !email || !password) return NextResponse.json({message:"Invalid Data"}, {status: 422});
    const hashedPassword = await bcrypt.hash(password,10)
    await connectToDb()
    const user = await prisma.user.create({
        data:{email,name,hashedPassword}
    });
    return NextResponse.json({user}, {status: 201})
}
catch(error) {
    console.log(error);
    return NextResponse.json({message: "Server Error"}, {status: 500})
}
finally {
    await prisma.$disconnect();
}
};