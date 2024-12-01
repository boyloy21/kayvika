import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const user = await Users.findById(id);
    return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(request, { params }) {
    const { id } = params;
    const { username} = await request.json();
    await connectMongoDB();
    await Users.findByIdAndUpdate(id, { username});
    return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
}
