
# Stalker

Mastering MACD: Your Gateway to Profitable Trading Signals

## Introduction

The MACD (Moving Average Convergence Divergence) indicator is explained, consisting of four components: MACD line, signal line, histogram, and zero line, which help identify market trends and momentum, `Stalker` provides shorter-term calculation and monitoring functions.

## Tech Stack

Framework: Next.js
CSS Framework: Tailwind CSS
Language: TypeScript

## Preview

[demo here](https://stalker.vercel.app/)

![截圖 2024-04-28 14 47 29](https://github.com/milletbard/stalker/assets/25094959/ae743a73-bfbf-4655-a82b-8cbef98d3229)

![截圖 2024-04-28 14 48 16](https://github.com/milletbard/stalker/assets/25094959/1511d066-8b05-4ecf-b5f9-d8b749bece0f)

![截圖 2024-04-28 14 53 08](https://github.com/milletbard/stalker/assets/25094959/2432ed80-b48c-4c14-bfd3-f396b82c83f6)

![截圖 2024-04-28 14 55 30](https://github.com/milletbard/stalker/assets/25094959/70c86044-9367-433e-bfd9-2d7c4b50c7bd)

<img width="503" alt="截圖 2024-04-27 00 10 58" src="https://github.com/milletbard/stalker/assets/25094959/bc1e6674-86cf-45a1-99cb-7f9ffc6732b5">

---

## Key Features

Calculate the moving average and obtain MACD through 5, 15, 30, and 60 minute K, and remind the user, Provide reminders in web pages and line notify tokens to remind users

- EMA
    - Introduction
Exponential Moving Average (EMA) is developed to address the shortcomings of simple moving averages. It reduces the lagging effect of traditional moving averages by reacting more quickly to price changes. EMA5, EMA10, EMA20, EMA60, EMA120, and EMA250 correspond to the exponential moving averages over 5 days, 10 days, 20 days, 60 days, 120 days, and 250 days respectively.

    - Calculation Formula
The initial value is calculated similarly to the simple moving average, which is the sum of closing prices over n days divided by n. From the second day onwards, it is calculated as the previous day's EMA plus the smoothing constant α times the difference between the current day's closing price and the previous day's EMA. The smoothing constant α is calculated as α = 2 / (n + 1).

- MACD
    - Introduction
MACD (Moving Average Convergence/Divergence) is a classic indicator used to predict trends.

    - The MACD indicator consists of three parts: DIF, DEA, and MACD histogram. The formulas are as follows:
        - MACD Line (DIF, Fast Line) = 12-day Exponential Moving Average (EMA) - 26-day Exponenｆtial Moving Average (EMA)
        - Signal Line (DEA, Slow Line) = 9-day Exponential Moving Average (EMA) of the MACD Line
        - Histogram (MACD Histogram) = MACD Line - Signal Line

![image](https://github.com/milletbard/stalker/assets/25094959/202ed584-e0cd-47d7-9c58-f0e6ba83226b)



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
