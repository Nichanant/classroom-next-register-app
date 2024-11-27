import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id");
        console.log("User: ", user);

        return NextResponse.json({ user });

    } catch (error) {
        console.log(error);
    }
}

// findOne({xx}) --> คือการ ค้นหา ค่าในชื่อตัวแปร ที่ระบุ ในที่นี้คือ ค่าในชื่อตัวแปร email --> findOne({ email })
// select("xx") --> หมายถือ เลือก ค่าในชื่อตัวแปรนั้นๆ ในที่นี้คือ คือการ เลือกเอาค่าภายในชื่อตัวแปร "_id" มาใช้ --> select("_id")
      //   ซึ่งค่าตัวแปรที่ใช้ ต้องระบุใน ""  เพราะเป็น String (มันคือชื่อตัวแปรของ Schema ที่อยู่ใน Database MongoCB )