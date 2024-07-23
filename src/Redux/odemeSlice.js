import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = createAsyncThunk(
  "odeme/signIn",
  async ({ email, password }) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;
      const userData = {
        user: user,
        token: token,
      };
      AsyncStorage.setItem("token", token);
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

export const signUp = createAsyncThunk(
  "odeme/signUp",
  async ({ email, password }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;
      const userData = {
        user: user,
        token: token,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

export const autoLogin = createAsyncThunk("auth/autoLogin", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      return token;
    } else {
      throw new Error("User is not defined");
    }
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk("odeme/logout", async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    return null;
  } catch (error) {
    return error;
  }
});

export const newPayment = createAsyncThunk(
  "odeme/newPayment",
  async ({ title, cost, lastDate }) => {
    try {
      const auth = getAuth();
      const date = lastDate.getDate();
      const month = lastDate.getMonth() + 1;
      const year = lastDate.getFullYear();
      const hours = lastDate.getHours();
      const minutes = lastDate.getMinutes();

      // Tarih ve saat formatını düzgün ayarlayalım
      const formattedDate = `${String(date).padStart(2, "0")}/${String(
        month
      ).padStart(2, "0")}/${year} ${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;

      await addDoc(collection(db, "payments"), {
        user: auth.currentUser.email,
        content: title,
        price: `${cost} TL`,
        payment_due_date: formattedDate,
        is_paid: false,
      });

      return "Ödeme eklendi";
    } catch (error) {
      console.error("Ödeme eklenirken hata oluştu:", error);
      return error.message; // Hata mesajını döndür
    }
  }
);

export const deletePayment = createAsyncThunk(
  "odeme/deletePayment",
  async ({ id }) => {
    try {
      await deleteDoc(doc(db, "payments", id));
      return "Ödeme başarıyla temizlendi";
    } catch (error) {
      return error;
    }
  }
);

export const getPayments = createAsyncThunk("odeme/getPayments", async () => {
  try {
    const auth = getAuth();
    const datas = [];
    const querySnapshot = await getDocs(collection(db, "payments"));
    querySnapshot.forEach((payment) => {
      if (
        auth.currentUser.email == payment.data().user &&
        payment.data().is_paid === false
      ) {
        datas.push({ ...payment.data(), id: payment.id });
      }
    });

    return datas;
  } catch (error) {
    return error;
  }
});

export const editPayment = createAsyncThunk("odeme/edit", async ({ id }) => {
  try {
    const paymentRef = doc(db, "payments", id);
    await updateDoc(paymentRef, {
      price: 1453,
    });
    return "Ödeme düzenlendi";
  } catch (error) {
    return error;
  }
});

export const paid = createAsyncThunk("odeme/paid", async ({ id }) => {
  try {
    const paymentRef = doc(db, "payments", id);
    await updateDoc(paymentRef, {
      is_paid: true,
    });
    return "Ödeme yapıldı";
  } catch (error) {
    return error;
  }
});

const initialState = {
  odemeyapanKisi: null,
  odemeTutarı: null,
  odemeTarihi: null,
  isLoading: false,
  isAuth: false,
  token: null,
  message: null,
  payments: [],
  state: false,
};
export const OdemeSlice = createSlice({
  name: "odeme",
  initialState,
  reducers: {
    setState: (state) => {
      state.state = !state.state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
      })

      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
      })

      .addCase(newPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(newPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })

      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })

      .addCase(getPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
      })
      .addCase(getPayments.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(editPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })

      .addCase(paid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paid.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(paid.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.message = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(autoLogin.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
      });
  },
});
export const { setState } = OdemeSlice.actions;
export default OdemeSlice.reducer;
