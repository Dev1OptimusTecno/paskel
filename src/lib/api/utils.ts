import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const withErrorHandling = (func: (req: Request) => Promise<any>) => {
	const handler = async (request: Request) => {
		return await func(request).catch((error) => {
			if (error instanceof ZodError) {
				return NextResponse.json(
					{
						errors: error.errors,
					},
					{ status: 400 },
				);
			} else {
				return NextResponse.json(
					{
						error: error.message,
					},
					{ status: 500 },
				);
			}
		});
	};
	return handler;
};
