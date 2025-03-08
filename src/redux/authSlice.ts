import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    User,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';

interface AuthState {
    currentUser: {
        uid?: string;
        email?: string | null;
        displayName?: string | null;
        photoURL?: string | null;
        emailVerified?: boolean;
    } | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    currentUser: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

export const signUpUser = createAsyncThunk(
    'auth/signUp',
    async ({ email, password, displayName }: { email: string, password: string, displayName?: string }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);


            if (displayName && userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: displayName
                });
            }


            if (userCredential.user) {
                await sendEmailVerification(userCredential.user);
            }

            return {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
                emailVerified: userCredential.user.emailVerified,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
            return rejectWithValue(errorMessage);
        }
    }
);


export const signInUser = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
                emailVerified: userCredential.user.emailVerified,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
            return rejectWithValue(errorMessage);
        }
    }
);


export const signInWithGoogle = createAsyncThunk(
    'auth/signInWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            return {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
                emailVerified: userCredential.user.emailVerified,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google';
            return rejectWithValue(errorMessage);
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return null;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
            return rejectWithValue(errorMessage);
        }
    }
);


export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send password reset email';
            return rejectWithValue(errorMessage);
        }
    }
);


export const sendVerificationEmail = createAsyncThunk(
    'auth/sendVerificationEmail',
    async (_, { getState, rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                return true;
            } else {
                return rejectWithValue('No user is signed in');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send verification email';
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            if (action.payload) {
                state.currentUser = {
                    uid: action.payload.uid,
                    email: action.payload.email,
                    displayName: action.payload.displayName,
                    photoURL: action.payload.photoURL,
                    emailVerified: action.payload.emailVerified,
                };
                state.isAuthenticated = true;
            } else {
                state.currentUser = null;
                state.isAuthenticated = false;
            }
            state.isLoading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(signUpUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(signInUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(signInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(signInWithGoogle.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(signInWithGoogle.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null;
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(sendVerificationEmail.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(sendVerificationEmail.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(sendVerificationEmail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
