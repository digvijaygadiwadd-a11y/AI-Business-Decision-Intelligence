import streamlit as st
import requests
import pandas as pd
import pypdf
import sqlite3
import io

st.set_page_config(page_title="AI Business Decision Intelligence", page_icon="📊", layout="wide")

st.title("📊 AI Business Decision Intelligence Dashboard")
st.markdown("Interact with your FastAPI backend, import external datasets, and export structured business reports.")

API_URL = "http://127.0.0.1:8000"

# Initialize session state variables explicitly
if "token" not in st.session_state:
    st.session_state.token = None
if "username" not in st.session_state:
    st.session_state.username = ""
if "imported_data_context" not in st.session_state:
    st.session_state.imported_data_context = ""
if "last_answer" not in st.session_state:
    st.session_state.last_answer = ""
if "last_question" not in st.session_state:
    st.session_state.last_question = ""
if "history_logs" not in st.session_state:
    st.session_state.history_logs = []

st.sidebar.header("🔐 Authentication")
username_input = st.sidebar.text_input("Username", value="admin", key="auth_username")
password_input = st.sidebar.text_input("Password", type="password", value="admin123", key="auth_password")

if st.sidebar.button("Login"):
    try:
        response = requests.post(f"{API_URL}/api/auth/login", data={"username": username_input, "password": password_input})
        if response.status_code == 200:
            data = response.json()
            st.session_state.token = data.get("access_token")
            st.session_state.username = username_input
            st.sidebar.success(f"Logged in successfully as {username_input}!")
            st.rerun()
        else:
            try:
                err_msg = response.json().get('detail', 'Invalid credentials')
            except Exception:
                err_msg = response.text
            st.sidebar.error(f"Login failed: {err_msg}")
    except Exception as e:
        st.sidebar.error(f"Connection error to backend at {API_URL}: {e}")

# If token exists, display main app interface
if st.session_state.token:
    st.sidebar.markdown(f"**Connected User:** `{st.session_state.username}`")
    if st.sidebar.button("Logout"):
        st.session_state.token = None
        st.session_state.username = ""
        st.rerun()

    tabs = st.tabs(["💬 Ask AI Query", "📁 File Importer", "📜 Query History & Reports"])
    
    with tabs[0]:
        st.subheader("Business Intelligence NLP Query")
        
        if st.session_state.imported_data_context:
            st.info("📁 Active file context loaded and will be included in the AI query analysis.")
            if st.button("Clear File Context"):
                st.session_state.imported_data_context = ""
                st.rerun()

        question = st.text_input("Enter your business question:", "What are our core business metrics?")
        
        if st.button("Submit Query"):
            headers = {"Authorization": f"Bearer {st.session_state.token}"}
            final_question = question
            if st.session_state.imported_data_context:
                final_question = f"Context from imported file:\n{st.session_state.imported_data_context}\n\nQuestion: {question}"

            payload = {"payload": {"question": final_question}}
            try:
                res = requests.post(f"{API_URL}/api/nlp-query", json=payload, headers=headers)
                if res.status_code == 200:
                    result = res.json()
                    st.session_state.last_answer = result.get('answer')
                    st.session_state.last_question = question
                    st.success("Analysis Complete:")
                    st.markdown(f"### Answer:\n> {result.get('answer')}")
                else:
                    st.error(f"Error {res.status_code}: {res.text}")
            except Exception as e:
                st.error(f"Request failed: {e}")

        if st.session_state.last_answer:
            st.divider()
            st.subheader("📥 Export Latest Response")
            export_df = pd.DataFrame([{"Question": st.session_state.last_question, "Answer": st.session_state.last_answer}])
            buffer = io.BytesIO()
            with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
                export_df.to_excel(writer, index=False, sheet_name='AI Insight')
            buffer.seek(0)
            st.download_button(
                label="Download Insight as Excel (.xlsx)",
                data=buffer,
                file_name="ai_business_insight.xlsx",
                mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )

    with tabs[1]:
        st.subheader("Import External Files (Excel, CSV, SQL, PDF)")
        uploaded_file = st.file_uploader("Upload your data file", type=["csv", "xlsx", "xls", "sqlite", "db", "pdf"])

        if uploaded_file is not None:
            file_extension = uploaded_file.name.split(".")[-1].lower()
            try:
                if file_extension in ["csv"]:
                    df = pd.read_csv(uploaded_file)
                    st.success(f"Successfully loaded CSV: {uploaded_file.name}")
                    st.dataframe(df.head(10))
                    st.session_state.imported_data_context = df.to_string(index=False)
                elif file_extension in ["xlsx", "xls"]:
                    df = pd.read_excel(uploaded_file)
                    st.success(f"Successfully loaded Excel: {uploaded_file.name}")
                    st.dataframe(df.head(10))
                    st.session_state.imported_data_context = df.to_string(index=False)
                elif file_extension in ["sqlite", "db"]:
                    bytes_data = uploaded_file.read()
                    temp_path = "temp_uploaded.db"
                    with open(temp_path, "wb") as f:
                        f.write(bytes_data)
                    conn = sqlite3.connect(temp_path)
                    cursor = conn.cursor()
                    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
                    tables = cursor.fetchall()
                    table_names = [t[0] for t in tables]
                    st.success(f"Successfully connected to SQLite DB: {uploaded_file.name}. Tables found: {table_names}")
                    
                    db_summary = []
                    for t in table_names:
                        tdf = pd.read_sql_query(f"SELECT * FROM {t} LIMIT 10", conn)
                        db_summary.append(f"Table: {t}\n{tdf.to_string(index=False)}")
                    conn.close()
                    st.session_state.imported_data_context = "\n\n".join(db_summary)
                elif file_extension == "pdf":
                    reader = pypdf.PdfReader(uploaded_file)
                    pdf_text = ""
                    for page in reader.pages:
                        extracted = page.extract_text()
                        if extracted:
                            pdf_text += extracted + "\n"
                    st.success(f"Successfully extracted text from PDF: {uploaded_file.name} ({len(reader.pages)} pages)")
                    st.text_area("Extracted PDF Content Preview:", pdf_text[:2000], height=200)
                    st.session_state.imported_data_context = pdf_text[:8000]
                
                st.info("✅ File content loaded into session context! Switch to the 'Ask AI Query' tab to query questions about this data.")
            except Exception as e:
                st.error(f"Error processing file: {e}")

    with tabs[2]:
        st.subheader("Persistent Database Query History & Full Reports")
        col1, col2 = st.columns(2)
        with col1:
            if st.button("Refresh History Logs"):
                headers = {"Authorization": f"Bearer {st.session_state.token}"}
                try:
                    res = requests.get(f"{API_URL}/api/history", headers=headers)
                    if res.status_code == 200:
                        st.session_state.history_logs = res.json()
                    else:
                        st.error(f"Failed to fetch history: {res.text}")
                except Exception as e:
                    st.error(f"Connection error: {e}")
        
        with col2:
            if st.button("📥 Download Full History Excel Report"):
                headers = {"Authorization": f"Bearer {st.session_state.token}"}
                try:
                    res = requests.get(f"{API_URL}/api/export/excel", headers=headers)
                    if res.status_code == 200:
                        st.download_button(
                            label="Click to save Excel Report",
                            data=res.content,
                            file_name="complete_business_intelligence_report.xlsx",
                            mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                except Exception as e:
                    st.error(f"Export failed: {e}")

        if st.session_state.history_logs:
            for log in st.session_state.history_logs:
                st.markdown(f"**[{log['timestamp']}] Q:** {log['question']}")
                st.markdown(f"**A:** {log['answer']}")
                st.divider()
        else:
            st.info("Click 'Refresh History Logs' to load past queries.")
else:
    st.info("👈 Please log in via the sidebar using your credentials to access the dashboard.")
