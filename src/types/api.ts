import type { ZodError } from "zod";

export type ErrorResponse = {
	message: string;
};

export type ZodResponse = {
	errors: ZodError;
};

export type SignupResponse =
	| {
			errors: ZodError;
			message: undefined;
	  }
	| {
			message: string;
			errors: undefined;
	  }
	| { message: "Logged Sucefully"; errors: undefined };

export type LoginResponse =
	| {
			errors: ZodError;
			message: undefined;
			token: undefined;
	  }
	| {
			message: string;
			errors: undefined;
			token: undefined;
	  }
	| { message: "Logged Sucefully"; token: string; errors: undefined };

export type ApiResponse = ErrorResponse;
