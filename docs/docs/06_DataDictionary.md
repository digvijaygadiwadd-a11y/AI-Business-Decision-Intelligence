# Data Dictionary

# AI Business Decision Intelligence Platform

---

# Purpose

The Data Dictionary defines all major business entities, attributes, data types, owners, and business definitions used across the AI Business Decision Intelligence Platform.

It ensures consistency across Business Analysts, Data Engineers, AI Engineers, Developers, and Business Stakeholders.

---

# Entity 1 : Customer

| Field | Data Type | Description |
|--------|-----------|-------------|
| Customer_ID | Integer | Unique Customer Identifier |
| Customer_Name | String | Customer Full Name |
| Email | String | Registered Email |
| Phone | String | Contact Number |
| Country | String | Customer Country |
| State | String | Customer State |
| City | String | Customer City |
| Signup_Date | Date | Registration Date |
| Customer_Status | String | Active / Inactive |
| Customer_Segment | String | Premium / Standard / Enterprise |

---

# Entity 2 : Product

| Field | Data Type | Description |
|--------|-----------|-------------|
| Product_ID | Integer | Unique Product ID |
| Product_Name | String | Product Name |
| Category | String | Product Category |
| Brand | String | Product Brand |
| Unit_Price | Decimal | Selling Price |
| Product_Status | String | Active / Discontinued |

---

# Entity 3 : Sales Transaction

| Field | Data Type | Description |
|--------|-----------|-------------|
| Order_ID | Integer | Unique Order Number |
| Customer_ID | Integer | Customer Reference |
| Product_ID | Integer | Product Reference |
| Quantity | Integer | Quantity Purchased |
| Revenue | Decimal | Sales Revenue |
| Discount | Decimal | Discount Applied |
| Profit | Decimal | Profit Earned |
| Order_Date | Date | Purchase Date |
| Payment_Method | String | Card / UPI / Net Banking |
| Sales_Channel | String | Website / Mobile App / Store |

---

# Entity 4 : Marketing Campaign

| Field | Data Type | Description |
|--------|-----------|-------------|
| Campaign_ID | Integer | Campaign Identifier |
| Campaign_Name | String | Campaign Name |
| Marketing_Channel | String | Google / Facebook / Email |
| Budget | Decimal | Campaign Budget |
| Impressions | Integer | Number of Impressions |
| Clicks | Integer | Number of Clicks |
| Conversion_Rate | Decimal | Conversion Percentage |
| CAC | Decimal | Customer Acquisition Cost |

---

# Entity 5 : Customer Support

| Field | Data Type | Description |
|--------|-----------|-------------|
| Ticket_ID | Integer | Ticket Number |
| Customer_ID | Integer | Customer Reference |
| Issue_Type | String | Complaint Category |
| Ticket_Status | String | Open / Closed |
| Resolution_Time | Decimal | Resolution Hours |
| Satisfaction_Score | Decimal | Customer Rating |

---

# Entity 6 : Inventory

| Field | Data Type | Description |
|--------|-----------|-------------|
| Inventory_ID | Integer | Inventory Identifier |
| Product_ID | Integer | Product Reference |
| Stock_Available | Integer | Available Quantity |
| Warehouse | String | Warehouse Name |
| Reorder_Level | Integer | Minimum Stock Level |

---

# Entity Relationships

Customer

↓

Places

↓

Sales Transaction

↓

Contains

↓

Product

↓

Stored In

↓

Inventory

Marketing Campaign

↓

Generates

↓

Customer

↓

Places Order

↓

Sales Transaction

Customer

↓

Raises

↓

Support Ticket

---

# Data Owners

Sales Team → Sales Data

Marketing Team → Campaign Data

Finance Team → Revenue & Profit

Operations Team → Inventory

Support Team → Customer Tickets

Product Team → Product Information

Business Intelligence Team → KPI Layer

AI Agents → Business Decisions
