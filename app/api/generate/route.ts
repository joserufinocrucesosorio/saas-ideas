import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const body = await request.json();
  const { nicho } = body;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
          role: "user",
          content: `
            Genera 5 ideas SaaS diferentes usando EXACTAMENTE esta estructura Markdown para cada una.
      
      Entre una idea y otra coloca exactamente este separador con espacios:
      
      ---
      
      ## 🧠 Nombre del Producto
      (nombre)
      
      **📌 Descripción**  
      (descripción corta)
      
      **⚙️ Características**  
      **.** **Característica 1** (Descripción corta)
      **.** **Característica 2** (Descripción corta)
      **.** **Característica 3** (Descripción corta)
      
      **🎯 Cliente Objetivo**  
      (descripción)
      
      **💰 Modelo de Monetización**  
      (descripción)
      
      Perfil: ${nicho}
      `
        }
      ]      

  });

  const idea = completion.choices[0].message.content;

  return NextResponse.json({ idea });
}
