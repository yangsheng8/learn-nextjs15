import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import { createGIF } from 'gifshot';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  // 定义 progress 状态
  const [progress, setProgress] = useState(0);
  const [gifSrc, setGifSrc] = useState(null);

  const handleClick = () => {
    const images = ['1.png', '2.png', '3.png'];

    const options = {
      images: images,
      gifWidth: 500,
      gifHeight: 300,
      numWorkers: 5,
      frameDuration: 0.2,
      sampleInterval: 10,
      progressCallback: (e) => setProgress(parseInt(e * 100)),
    };

    createGIF(options, (obj) => {
      if (!obj.error) {
        setGifSrc(obj.image); // 设置 GIF 图片的 src
        setProgress(0); // 重置进度
      }
    });
  };

  const handleDownload = () => {
    if (gifSrc) {
      const link = document.createElement('a');
      link.download = 'sample.gif';
      link.href = gifSrc;
      link.click();
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol>
            <li>
              Get started by editing <code>pages/index.js</code>.
            </li>
            <li>Create a GIF from images.</li>
          </ol>
          <div> 
          <button onClick={handleClick}>Click to create a GIF</button>
      {progress > 0 && <p>Creating GIF... {progress}%</p>}
      {gifSrc && (
        <>
          <img src={gifSrc} alt="Generated GIF" style={{ width: '500px', height: '300px', margin: '20px 0' }} />
          <button onClick={handleDownload}>Download GIF</button>
        </>
      )}
          </div>
        </main>
      </div>
    </>
  );
}
