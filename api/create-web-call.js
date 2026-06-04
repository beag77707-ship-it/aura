export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { agent_id } = req.body;

    if (!agent_id) {
      return res.status(400).json({ error: 'Missing agent_id' });
    }

    if (!process.env.RETELL_API_KEY) {
      return res.status(500).json({ error: 'Missing RETELL_API_KEY in environment variables' });
    }

    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agent_id,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Retell API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error creating web call:', error);
    return res.status(500).json({ error: 'Failed to create web call' });
  }
}
