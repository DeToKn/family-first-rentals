import { createContext, useContext, useState, ReactNode } from "react";

type Ctx = {
  preselectedPackage: string;
  setPreselectedPackage: (v: string) => void;
  preselectedDate: string;
  setPreselectedDate: (v: string) => void;
};

const BookingCtx = createContext<Ctx | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [preselectedPackage, setPreselectedPackage] = useState("");
  const [preselectedDate, setPreselectedDate] = useState("");
  return (
    <BookingCtx.Provider value={{ preselectedPackage, setPreselectedPackage, preselectedDate, setPreselectedDate }}>
      {children}
    </BookingCtx.Provider>
  );
};

export const useBookingPrefill = () => {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBookingPrefill must be used within BookingProvider");
  return ctx;
};

export const scrollToBooking = () => {
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
};
