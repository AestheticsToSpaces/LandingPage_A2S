# Azure Cosmos DB Setup Guide for A2S Waitlist

This guide walks you through setting up Azure Cosmos DB (free tier) for the A2S waitlist backend.

## Prerequisites
- Microsoft Azure account with Student subscription (free)
- Azure CLI or Azure Portal access

---

## Step 1: Create Azure Cosmos DB Account

### Via Azure Portal:
1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** → Search for **"Azure Cosmos DB"**
3. Click **Create** → Select **"Azure Cosmos DB for NoSQL"**
4. Fill in the details:
   - **Subscription**: Your student subscription
   - **Resource Group**: Create new → `a2s-resources`
   - **Account Name**: `a2s-waitlist-db` (must be globally unique)
   - **Location**: Choose closest to your users (e.g., `Central India`)
   - **Capacity mode**: Select **"Serverless"** (best for free tier)
5. Click **Review + Create** → **Create**
6. Wait for deployment (~2-5 minutes)

---

## Step 2: Create Database and Container

1. Go to your Cosmos DB account in Azure Portal
2. Click **"Data Explorer"** in the left menu
3. Click **"New Container"**
4. Fill in:
   - **Database id**: `a2s-waitlist` (check "Create new")
   - **Container id**: `entries`
   - **Partition key**: `/email`
5. Click **OK**

---

## Step 3: Get Connection String

1. In your Cosmos DB account, go to **"Keys"** in the left menu
2. Copy the **"PRIMARY CONNECTION STRING"**
3. Keep this safe — you'll need it for the Azure Function

---

## Step 4: Create Azure Function App

### Via Azure Portal:
1. Click **"Create a resource"** → Search for **"Function App"**
2. Click **Create**
3. Fill in:
   - **Subscription**: Your student subscription
   - **Resource Group**: `a2s-resources`
   - **Function App name**: `a2s-waitlist-api` (must be globally unique)
   - **Runtime stack**: `Node.js`
   - **Version**: `20 LTS`
   - **Region**: Same as your Cosmos DB
   - **Operating System**: `Windows`
   - **Plan type**: `Consumption (Serverless)` — this is free!
4. Click **Review + Create** → **Create**

---

## Step 5: Deploy the Azure Function

### Option A: Deploy via VS Code (Recommended)
1. Install [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
2. Sign in to Azure in VS Code
3. Open the `api` folder in VS Code
4. Press `F1` → **"Azure Functions: Deploy to Function App..."**
5. Select your function app (`a2s-waitlist-api`)
6. Confirm deployment

### Option B: Deploy via Azure CLI
```bash
cd api
func azure functionapp publish a2s-waitlist-api
```

---

## Step 6: Configure Environment Variables

1. In Azure Portal, go to your Function App
2. Click **"Configuration"** in the left menu
3. Under **"Application settings"**, click **"+ New application setting"**
4. Add:
   - **Name**: `COSMOS_CONNECTION_STRING`
   - **Value**: (paste your connection string from Step 3)
5. Click **OK** → **Save**

---

## Step 7: Get Function URL

1. In your Function App, click **"Functions"** in the left menu
2. Click on `submitWaitlist`
3. Click **"Get Function Url"**
4. Copy the URL (looks like: `https://a2s-waitlist-api.azurewebsites.net/api/submitWaitlist`)

---

## Step 8: Configure Frontend

1. Create a `.env` file in your project root:
```env
VITE_AZURE_FUNCTION_URL=https://your-function-app.azurewebsites.net/api/submitWaitlist
```

2. Or set it in your hosting platform's environment variables (Vercel, Netlify, etc.)

---

## Step 9: Enable CORS (if needed)

1. In your Function App, go to **"CORS"** in the left menu
2. Add your frontend URL (e.g., `https://yourdomain.com`)
3. For development, you can add `http://localhost:8080` and `http://localhost:5173`
4. Click **Save**

---

## Testing

1. Start your local dev server: `npm run dev`
2. Fill out the waitlist form
3. Check Azure Portal → Cosmos DB → Data Explorer → `entries` container
4. You should see your submission!

---

## Costs (Free Tier)

With Azure for Students, you get:
- **Azure Cosmos DB**: First 1000 RU/s free (Serverless mode)
- **Azure Functions**: 1 million executions/month free
- **Storage**: 5 GB free

For a waitlist, you'll likely never exceed free tier limits.

---

## Troubleshooting

### "CORS error"
- Add your frontend URL to Function App CORS settings
- Make sure to include the protocol (`https://`)

### "Connection string not found"
- Check that `COSMOS_CONNECTION_STRING` is set in Function App Configuration
- Restart the Function App after adding settings

### "Database/Container not found"
- Verify database name is `a2s-waitlist`
- Verify container name is `entries`
- Check partition key is `/email`

### "Function not responding"
- Check Function App logs: Functions → submitWaitlist → Monitor
- Ensure the function is deployed and running

---

## Support

For issues, email: aestheticstospaces2@gmail.com
