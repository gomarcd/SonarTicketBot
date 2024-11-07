// Define the WebhookPayload interface
interface WebhookPayload {
	event: string;
	object_id: number;
	current: {
	  id: number;
	  created_at: string;
	  updated_at: string;
	  description: string | null;
	  ip_pool_id: number;
	  ipassignmentable_id: number;
	  ipassignmentable_type: string;
	  reference: string | null;
	  soft: boolean;
	  subnet: string;
	  subnet_id: number;
	};
	triggered_at: string;
  }
  
  // Listen for webhook
  export default {
	async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
	  let payload: WebhookPayload;
	  try {
		payload = await request.json() as WebhookPayload;
	  } catch (error) {
		return new Response("Invalid JSON payload", { status: 400 });
	  }
  
	  // Get Account ID (ipassignmentable_id)
	  const ipassignmentableId = payload.current.ipassignmentable_id;
	  const subnet = payload.current.subnet;
  
	  // Set up GraphQL mutation to create ticket
	  const mutation = `
		mutation newTicket {
		  createPublicTicket(input: {
			subject: "New IP assignment on Account ID: ${ipassignmentableId}",
			description: "Assigned IP address: ${subnet}",
			status: OPEN,
			priority: LOW,
			inbound_mailbox_id: 15,
			ticket_group_id: 21
		  }) {
			id
		  }
		}
	  `;
  
	  // Send mutation to instance GraphQL API
	  const apiResponse = await fetch(env.INSTANCE, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  "Authorization": `Bearer ${env.API_TOKEN}`,
		},
		body: JSON.stringify({
		  query: mutation,
		}),
	  });
  
	  // Fail successfully
	  if (!apiResponse.ok) {
		const errorText = await apiResponse.text();
		return new Response(`Error in GraphQL API call: ${errorText}`, { status: 500 });
	  }
  
	  const responseData = await apiResponse.json();
  
	  // Show successful confirmation
	  return new Response(JSON.stringify({ status: "Webhook processed and ticket created", data: responseData }), {
		headers: { "Content-Type": "application/json" },
	  });
	}
  } satisfies ExportedHandler<Env>;
  