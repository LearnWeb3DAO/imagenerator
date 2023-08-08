import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
  const givenPrompt = await req.json()
  console.log(givenPrompt.prompt)

  const response = await fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
      headers: { Authorization: `Bearer ${process.env.HF_APIKEY}` },
      method: "POST",
      body: JSON.stringify(givenPrompt.prompt),
    }
  );

  const result = await response.blob();
  console.log(response)
  const finalResponse=new NextResponse(result)
  finalResponse.headers.set('content-type', 'image/png');
  

  return finalResponse
}
