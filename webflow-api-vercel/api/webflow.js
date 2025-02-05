export default async function handler(req, res) {
    const apiToken = process.env.WEBFLOW_API_TOKEN;

    console.log("✅ API Token Loaded:", apiToken ? "Yes" : "No");  // Debugging log

    if (!apiToken) {
        return res.status(500).json({ error: "❌ Missing API Token in environment variables" });
    }

    const collectionId = "6755f813c56fd887724f21e7";
    const itemId = "6755f813c56fd887724f2225";
    const fieldKey = "property-photos";

    try {
        const response = await fetch(`https://api.webflow.com/v2/collections/${collectionId}/items/${itemId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiToken}`,
                "accept": "application/json"
            }
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        res.status(200).json(data.item[fieldKey]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

