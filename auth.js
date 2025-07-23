import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";

// Create MongoDB client for NextAuth adapter
const client = new MongoClient(process.env.MONGODB_URI);

export const { handlers, auth, signIn, signOut } = NextAuth({
  // MongoDB adapter - handles storing sessions, users, accounts in your database
  adapter: MongoDBAdapter(client),
  
  // Authentication providers - different ways users can sign in
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    
    // Custom credentials provider for email/password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "Enter your email" 
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "Enter your password" 
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectDB();
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          });

          if (!user) {
            throw new Error("No account found with this email");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password, 
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user",
            image: user.image || null
          };

        } catch (error) {
          console.error("Auth error:", error);
          throw new Error(error.message);
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      if (account?.provider === "google") {
        token.googleId = profile?.sub;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.googleId = token.googleId;
      }
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    }
  },

  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },

  events: {
    async signIn(message) {
      console.log("User signed in:", message.user.email);
    },
    async signOut(message) {
      console.log("User signed out");
    }
  },

  debug: process.env.NODE_ENV === "development",
});