import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { userScheme } from "@/schemas";
import { hash, genSalt } from "bcrypt";

export async function POST(request: Request) {
	const body = await userScheme.parseAsync(await request.json());
	const salt = await genSalt();
	const hashedPassword = await hash(body.password, salt);
	const user = await prisma.user.create({
		data: {
			password: hashedPassword,
			username: body.username,
			salt,
			verified: false
		},
	});
	return NextResponse.json(
		{
			message: "Created Sucefully",
		},
		{ status: 200 },
	);
}
