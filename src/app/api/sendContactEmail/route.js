export const dynamic = 'force-dynamic'; 
const postmark = require('postmark');

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export async function POST(request) {
    const { email, name, message, honey } = await request.json();

    if (honey) {
        console.error("Honey pot field was filled out");
        return new Response(JSON.stringify({ error: "Honey pot field was filled out" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const templateModel = {
        email: email,
        name: name,
        message: message
    };

    try {
        const result = await client.sendEmailWithTemplate({
            "From": "aldoportillo@neatonthe.rocks",
            "To": "admin@aldoportillo.com",
            "TemplateId": "36017366",
            "TemplateModel": templateModel
        });

        console.info("Sent to postmark for delivery", result);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Unable to send via postmark: " + error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
