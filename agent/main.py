import os
from dotenv import load_dotenv
from textwrap import dedent

from agno.models.google import Gemini
from fastapi import FastAPI
from agno.agent import Agent
from agno.os import AgentOS
from agno.tools.yfinance import YFinanceTools

# yftool = YFinanceTools(
#     stock_price=True,
#     analyst_recommendations=True,
#     stock_fundamentals=True,
#     historical_prices=False,
#     company_info=False,
#     company_news=False,
# )

load_dotenv()

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
FIN_PROMPT = os.environ.get("FIN_PROMPT")

print("prompt", FIN_PROMPT)
print("API KEY", GOOGLE_API_KEY)

# Create your custom FastAPI app
app = FastAPI(title="Arc Server")


# Add your custom routes
@app.get("/status")
async def status_check():
    return {"status": "healthy"}


fin_agent = Agent(
    name="Agent Arc",
    model=Gemini(
        id="gemini-2.0-flash",
        grounding=True,
        # search=True,
        api_key=GOOGLE_API_KEY,
    ),
    system_message=dedent(FIN_PROMPT).replace("\n", " ").replace("\r", ""),
)

# Pass your app to AgentOS
agent_os = AgentOS(agents=[fin_agent], base_app=app)  # Your custom FastAPI app

# Get the combined app with both AgentOS and your routes
app = agent_os.get_app()
