"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/api/contact";

const generateUniqueRandomNumbers = (
  count: number,
  min: number,
  max: number
) => {
  // 1부터 45까지의 숫자를 배열에 담기
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  // Fisher-Yates Shuffle 알고리즘으로 배열 섞기
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap
  }

  // 섞인 배열에서 필요한 개수만큼 선택
  return numbers.slice(0, count);
};

export default function EmailForm() {
  const [otpNumbers, setOtpNumbers] = useState<string>("");
  const [otpInput, setOtpInput] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  //? 인증번호 발송
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpNumbers = generateUniqueRandomNumbers(6, 1, 9);
    const otpNumbersString = otpNumbers.join("");
    console.log("otpNumbersString : ", otpNumbersString);

    sendContactEmail({ otp: otpNumbersString, userEmail: userEmail });
    setOtpNumbers(otpNumbersString);
    alert("인증번호 발송 완료");
    setUserEmail("");
  };

  //? 인증번호 인증
  const onSubmitOtp = () => {
    console.log(otpNumbers);
    console.log(otpInput);

    if (otpNumbers === otpInput) {
      alert("인증 성공");
      setOtpInput("");
      return;
    }
    setOtpInput("");
    return alert("인증 실패");
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label className="flex gap-4 items-center justify-between font-bold">
          인증번호 발송
        </label>
        <input
          type="email"
          onChange={(e) => setUserEmail(e.target.value)}
          className="p-4 border-2 border-gray-300 rounded-md"
        />
        <button className="p-4 bg-[#28BAB5] text-white text-lg">
          발송하기
        </button>
      </form>
      <div className="flex flex-col gap-4">
        인증번호 입력
        <input
          type="text"
          className="p-4 border-2 border-gray-300 rounded-md"
          onChange={(e) => setOtpInput(e.target.value)}
        />
        <button
          onClick={onSubmitOtp}
          className="p-4 bg-[#28BAB5] text-white text-lg"
        >
          인증하기
        </button>
      </div>
    </>
  );
}
