import type { ZodError } from "zod";

export type ErrorResponse = {
	message: string;
};

export type ZodResponse = {
	errors: ZodError;
};

export type SignupResponse =
	| ErrorResponse
	| ZodResponse
	| { message: "Created Sucefully" };

export type LoginResponse =
	| ErrorResponse
	| ZodResponse
	| { message: "Logged Sucefully"; token: string };

export type ApiResponse = ErrorResponse;
