import { z } from 'zod';

const signupBodySchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export { signupBodySchema, loginBodySchema };
