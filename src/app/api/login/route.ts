import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { userScheme } from "@/schemas";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET } from "@/lib/utils";
import { withErrorHandling } from "@/lib/api/utils";

export const POST = withErrorHandling(async (request: Request) => {
	const body = await userScheme.parseAsync(await request.json());
	const user = await prisma.user.findFirst({
		where: {
			username: body.username,
		},
	});
	if (!user) return new NextResponse("User not found", { status: 400 });
	const hashedPassword = await hash(body.password, user.salt);
	if (hashedPassword != user.password)
		return NextResponse.json(
			{
				type: "Username",
				message: "Invalid password or username",
			},
			{
				status: 400,
			},
		);
	const tkn = sign(
		{
			id: user.id,
			username: user.username,
		},
		SECRET,
	);
	return NextResponse.json(
		{
			message: "Logged sucefully",
			token: tkn,
		},
		{ status: 200 },
	);
});
