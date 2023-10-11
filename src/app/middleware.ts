import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import { SECRET } from "@/lib/utils";

export type AuthenticatedRequest = NextRequest & {
	user: string | JwtPayload;
};

export function middleware(
	request: NextRequest & {
		user: string | JwtPayload;
	},
) {
	const authHeader = request.headers.get("authorization");
	if (!authHeader)
		return NextResponse.json(
			{
				status: "fail",
				message: "Unauthorized!",
			},
			{ status: 401 },
		);
	const token = authHeader.split(" ")[1];
	try {
		const user = verify(token, SECRET);
		request.user = user;
		return NextResponse.next();
	} catch {
		return NextResponse.json(
			{
				message: "Unauthorized",
			},
			{
				status: 401,
			},
		);
	}
}

export const config = {
	matcher: "/api/app/*",
};
