import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        //test shoot request
        // console.log("ชื่อ: ",name);
        // console.log("อีเมลล์: ",email);
        // console.log("รหัสผ่าน: ",password);

        
        const hashedPassword = await bcrypt.hash(password, 10); // Receive password and hash password (encode)
        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User Registered." }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "An error occured while registerating the user." }, { status: 500 });
    }
}