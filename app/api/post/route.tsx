import { NextResponse } from "next/server";
import { prisma } from "../client";

export async function PATCH(request: Request){
    try{
        const { category, title, content, author, image, snippet } = await request.json(); 
        const post = await prisma.post.create({
            data: {title, content, category, author, image, snippet},
        })

        return NextResponse.json(post, {status: 200})
    }
    catch(err){
        console.error("request error", err)
        NextResponse.json({ err: "error updating post"}, {status: 500});
    }
}