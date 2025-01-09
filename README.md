# **Financial Data Filter App**

This is a full-stack financial data filtering app that displays annual income statements for Apple Inc. Users can sort the data by various financial metrics and reset it to the default order. The backend is built with **Flask (Python)**, and the frontend is built with **React (JavaScript)** and styled using **Tailwind CSS**.

---

## **Instructions to Run the Project Locally**

### **Source Code**

[Financial Data Filter App](https://github.com/Janakrish1/finance-filter-app.git)

### **Prerequisites**

Ensure you have the following installed:

- Python 3.x
- Node.js and npm
- Git

### **Clone the Repository**

```bash
git clone https://github.com/Janakrish1/finance-filter-app.git
cd finance-filter-app
```

---

### **Run the Backend**

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `backend` folder and add your API key obtained from [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements):

   ```
   API_KEY=your_api_key_here
   ```

4. Run the Flask backend:

   ```bash
   python main.py
   ```

The backend will be running at `http://127.0.0.1:5000`.

---

### **Run the Frontend**

1. Open a new terminal and navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. **Replace the backend URL in three occurrences**:  
   Open `App.js` in the `frontend/src` folder and replace the **Render backend public link** (`https://finance-filter-app.onrender.com`) with the local backend URL:

   ```jsx
   fetch("http://127.0.0.1:5000/api/");
   ```

4. Start the React development server:

   ```bash
   npm run start
   ```

The frontend will be running at `http://localhost:3000`.

---

## **Deployed Application**

- **Live App**: [https://finance-filter-app.vercel.app](https://finance-filter-app.vercel.app)
- **Backend Server** (hosted on Render in my login): [https://finance-filter-app.onrender.com](https://finance-filter-app.onrender.com)

