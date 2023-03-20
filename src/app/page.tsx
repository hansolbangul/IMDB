import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

export const metadata = {
  title: "IMDB Clone",
  description: "The IMDB Clone coding",
};

export default function Home() {
  return <h1 className="text-red-400">Home</h1>;
}
