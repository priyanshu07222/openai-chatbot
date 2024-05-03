import axios from 'axios';
export const loginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post("/user/login", { email, password });
        if (res.status !== 200) {
            throw new Error("Unable to login")
        }
        const data = await res.data;
        return data;
    } catch (error) {
        console.log("thisis",error)
    }
}

export const signupUser = async (name:string, email: string, password: string) => {
    try {
        const res = await axios.post("/user/signup", {name, email, password });
        if (res.status !== 201) {
            throw new Error("Unable to signup")
        }
        const data = await res.data;
        return data;
    } catch (error) {
        console.log("thisis",error)
    }
}

export const checkAuthStatus = async () => {
    try {
        const res = await axios.get("/user/auth-status");
        if (res.status !== 200) {
            throw new Error("Unable to authenticate")
        }
        const data = await res.data;
        return data;
    } catch (error) {
        console.log("thisis",error)
    }
}

export const sendChatRequest = async (message:string) => {
    console.log("priy",[message])
    try {
        const res = await axios.post("/chat/new", { text: message } );
        if (res.status !== 200) {
            throw new Error("Unable to send chat")
        }
        const data = await res.data;
        console.log("the only data u r looking for", data)
        return data;
    } catch (error) {
        console.log("this is more precise",error)
    }
}

export const getUserChats = async () => {
    try {
        const res = await axios.get("/chat/all-chats");
        if (res.status !== 200) {
            throw new Error("Unable to send chat")
        }
        const data = await res.data;
        return data;
    } catch (error) {
        console.log("this is get all chat error",error)
    }
}
export const deleteUserChats = async () => {
    try {
        const res = await axios.delete("/chat/delete");
        if (res.status !== 200) {
            throw new Error("Unable to delete chat")
        }
        const data = await res.data;
        return data;
    } catch (error) {
        console.log("this is delete all chat error",error)
    }
}


export const logoutUser = async () => {
    try {
        const res = await axios.delete("/user/logout");
        if (res.status !== 200) {
            throw new Error("Unable to logout user")
        }
        const data = await res.data;
        return data;
    } catch (error) {
        console.log("this is delete all chat error",error)
    }
}

// import axios from 'axios';

// export const loginUser = async (email: string, password: string) => {
//     try {
//         const res = await axios.post("/user/login", { email, password });
//         const data = await res.data;
//         return data;
//     } catch (error:any) {
//         if (error.response) {
//             // The request was made and the server responded with a non-2xx status code
//             console.error("Server responded with error:", error.response.data);
//         } else if (error.request) {
//             // The request was made but no response was received
//             console.error("No response received:", error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error("Error:", error.message);
//         }
//         // Throw the error again to propagate it up the call stack
//         throw error;
//     }
// };
