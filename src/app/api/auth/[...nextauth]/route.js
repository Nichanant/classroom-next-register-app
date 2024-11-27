import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                // Mock up test data user
                // const user = { id: '1' }
                // return user;

                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }

                    return user; // เมื่อมี Email และ Password ถูกต้อง จะส่ง Object User ออกไป (Schema ที่เราสร้าง)

                } catch (error) {
                    console.log(error);
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/login" },
    callbacks : {
        async jwt({ token, user, session }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role
                }
            }
            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
        }
    }
}

const handeler = NextAuth(authOptions);
export { handeler as GET, handeler as POST };