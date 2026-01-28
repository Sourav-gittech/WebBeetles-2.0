// import Razorpay from "https://esm.sh/razorpay@2.9.4";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// import crypto from "node:crypto"; // Only needed for verify-payment

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   try {
//     const supabase = createClient(
//       Deno.env.get("SUPABASE_URL"),
//       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
//     );

//     const authHeader = req.headers.get("Authorization");
//     if (!authHeader) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const {
//       data: { user },
//     } = await supabase.auth.getUser(authHeader);

//     if (!user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const { courseId } = await req.json();

//     const { data: course, error } = await supabase
//       .from("courses")
//       .select("price")
//       .eq("id", courseId)
//       .single();

//     if (error || !course) {
//       return new Response("Course not found", { status: 404 });
//     }

//     const razorpay = new Razorpay({
//       key_id: Deno.env.get("RAZORPAY_KEY_ID"),
//       key_secret: Deno.env.get("RAZORPAY_KEY_SECRET"),
//     });

//     const order = await razorpay.orders.create({
//       amount: course.price * 100,
//       currency: "INR",
//     });

//     await supabase.from("purchases").insert({
//       user_id: user.id,
//       course_id: courseId,
//       razorpay_order_id: order.id,
//       amount: course.price,
//       payment_status: "created",
//     });

//     return Response.json({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response("Server error", { status: 500 });
//   }
// })

// /* To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

//   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-order' \
//     --header 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImI4MTI2OWYxLTIxZDgtNGYyZS1iNzE5LWMyMjQwYTg0MGQ5MCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjIwODQ4NTA3NDF9._M4s78vh44vUbr7jcOTjFWW8nlewOVOyQlt3GmMBQv-RkHB2hZit7KUBSWL1kgSJ595QEsNjZcd7s0BD0wB87w' \
//     --header 'Content-Type: application/json' \
//     --data '{"name":"Functions"}'

// */




import Razorpay from "https://esm.sh/razorpay@2.9.4";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const headers = {
  "Access-Control-Allow-Origin": "*", // Or your frontend URL
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

Deno.serve(async (req) => {
  // 1️⃣ Handle CORS preflight immediately
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  // 2️⃣ Only POST requests allowed
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Unauthorized", { status: 401, headers });
    }

    const { data: { user } } = await supabase.auth.getUser(authHeader);
    if (!user) {
      return new Response("Unauthorized", { status: 401, headers });
    }

    const { courseId } = await req.json();
    const { data: course, error } = await supabase
      .from("courses")
      .select("price")
      .eq("id", courseId)
      .single();

    if (error || !course) {
      return new Response("Course not found", { status: 404, headers });
    }

    const razorpay = new Razorpay({
      key_id: Deno.env.get("RAZORPAY_KEY_ID"),
      key_secret: Deno.env.get("RAZORPAY_KEY_SECRET"),
    });

    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: "INR",
    });

    await supabase.from("purchases").insert({
      user_id: user.id,
      course_id: courseId,
      razorpay_order_id: order.id,
      amount: course.price,
      payment_status: "created",
    });

    return new Response(JSON.stringify({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500, headers });
  }
});

