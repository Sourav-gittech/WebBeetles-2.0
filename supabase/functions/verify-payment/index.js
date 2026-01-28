// import Razorpay from "https://esm.sh/razorpay@2.9.4";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// import crypto from "node:crypto"; // Only needed for verify-payment

// Deno.serve(async (req) => {
// try {
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

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       courseId,
//     } = await req.json();

//     const generatedSignature = crypto
//       .createHmac("sha256", Deno.env.get("RAZORPAY_KEY_SECRET"))
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       return new Response("Invalid signature", { status: 400 });
//     }

//     await supabase
//       .from("purchases")
//       .update({
//         payment_status: "paid",
//         razorpay_payment_id,
//       })
//       .eq("razorpay_order_id", razorpay_order_id);

//     // enroll student
//     await supabase.rpc("enroll_user", {
//       course_id: courseId,
//       user_id: user.id,
//     });

//     return Response.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return new Response("Verification failed", { status: 500 });
//   }
// })

// /* To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

//   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/verify-payment' \
//     --header 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImI4MTI2OWYxLTIxZDgtNGYyZS1iNzE5LWMyMjQwYTg0MGQ5MCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjIwODQ4NTA4MTV9.r4cHZHJSTjYcmPAK3CX5mcibMHBSEI9ZTJZwneKtnsMf3F8QbjQ_mReXiPXKyD9FIgI8ZBdcxHdlEWYLFET08w' \
//     --header 'Content-Type: application/json' \
//     --data '{"name":"Functions"}'

// */



import Razorpay from "https://esm.sh/razorpay@2.9.4";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import crypto from "node:crypto";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

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

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await req.json();

    const generatedSignature = crypto
      .createHmac("sha256", Deno.env.get("RAZORPAY_KEY_SECRET"))
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return new Response("Invalid signature", { status: 400, headers });
    }

    await supabase
      .from("purchases")
      .update({ payment_status: "paid", razorpay_payment_id })
      .eq("razorpay_order_id", razorpay_order_id);

    await supabase.rpc("enroll_user", { course_id: courseId, user_id: user.id });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response("Verification failed", { status: 500, headers });
  }
});
