import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';


const serializeTimestamp = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp) return null;
    return {
        seconds: timestamp.seconds,
        nanoseconds: timestamp.nanoseconds
    };
};


const timestampToDate = (timestamp: { seconds: number; nanoseconds: number } | null) => {
    if (!timestamp) return null;
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
};

interface SerializedTimestamp {
    seconds: number;
    nanoseconds: number;
}

interface Message {
    id?: string;
    email: string;
    text: string;

    createdAt: SerializedTimestamp | null;
}

interface MessagesState {
    messages: Message[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MessagesState = {
    messages: [],
    status: 'idle',
    error: null
};

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async () => {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);

        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
                id: doc.id,
                email: data.email,
                text: data.text,

                createdAt: serializeTimestamp(data.createdAt as Timestamp)
            });
        });

        return messages;
    }
);

export const addMessage = createAsyncThunk(
    'messages/addMessage',
    async (messageData: { email: string; text: string }) => {
        const { email, text } = messageData;

        const docRef = await addDoc(collection(db, 'messages'), {
            email,
            text,
            createdAt: serverTimestamp()
        });

        const now = Timestamp.now();

        return {
            id: docRef.id,
            email,
            text,

            createdAt: serializeTimestamp(now)
        };
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        updateMessages: (state, action) => {

            state.messages = action.payload.map((msg: any) => ({
                ...msg,
                createdAt: msg.createdAt instanceof Timestamp
                    ? serializeTimestamp(msg.createdAt)
                    : msg.createdAt
            }));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch messages';
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            });
    }
});

export const { updateMessages } = messagesSlice.actions;
export { timestampToDate };
export default messagesSlice.reducer;
