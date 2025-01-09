import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual"

def get_financial_data():
    try:
        response = requests.get(f"{BASE_URL}&apikey={API_KEY}")
        response.raise_for_status()  
        data = response.json()
        
        print("Fetched Financial Data from the endpoint:")
        for entry in data:
            print(entry)
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None