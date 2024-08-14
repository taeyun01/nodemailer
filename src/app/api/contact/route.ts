// app/api/contact/route.ts
import { sendEmail } from "@/app/api/email";

export async function POST(req: Request) {
  const body = await req.json();
  return sendEmail(body)
    .then(
      () =>
        new Response(JSON.stringify({ message: "메일을 성공적으로 보냈음" }), {
          status: 200,
        })
    )
    .catch(() => {
      return new Response(JSON.stringify({ message: "메일 전송에 실패함" }), {
        status: 500,
      });
    });
}
