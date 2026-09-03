# Database Design

# AI Business Decision Intelligence Platform

Version 1.0

---

# Purpose

The purpose of this document is to define the complete enterprise database structure for the AI Business Decision Intelligence Platform.

The database is designed to support:

- Business Analytics
- Executive Dashboards
- AI Agents
- Forecasting
- Machine Learning
- Business Intelligence
- KPI Monitoring

---

# Database Technology

Primary Database

PostgreSQL

Future Support

- Snowflake
- BigQuery
- SQL Server
- Azure SQL
- Amazon Redshift

---

# Database Standards

Primary Keys

BIGINT

Foreign Keys

BIGINT

Money

DECIMAL(12,2)

Dates

DATE

Timestamp

TIMESTAMP

Text

VARCHAR

---

# TABLE 1

# Customers

## Purpose

Stores all customer information.

This table acts as the master table for every customer interacting with the business.

Every order, support ticket, payment and AI recommendation will reference this table.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Customer_ID | BIGINT | PK | No | Auto Increment | Unique Customer Identifier |
| First_Name | VARCHAR(100) | | No | | Customer First Name |
| Last_Name | VARCHAR(100) | | No | | Customer Last Name |
| Email | VARCHAR(255) | Unique | No | | Registered Email |
| Phone | VARCHAR(20) | Unique | No | | Mobile Number |
| Country | VARCHAR(50) | | No | | Country |
| State | VARCHAR(50) | | Yes | | State |
| City | VARCHAR(50) | | Yes | | City |
| Signup_Date | DATE | | No | Current Date | Registration Date |
| Customer_Segment | VARCHAR(30) | | No | Standard | Premium / Enterprise / Standard |
| Customer_Status | VARCHAR(20) | | No | Active | Active / Inactive |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Created Time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Last Updated Time |

---

## Primary Key

Customer_ID

---

## Foreign Keys

None

---

## Relationships

Customers (1)

↓

Orders (Many)

Customers (1)

↓

Support Tickets (Many)

Customers (1)

↓

Payments (Many)

Customers (1)

↓

AI Recommendations (Many)

---

## Business Rules

- Customer_ID must be unique.
- Email must be unique.
- Phone Number must be unique.
- Customer Status can only be Active or Inactive.
- Signup Date cannot be NULL.
- Customer Segment defaults to Standard.

---

## Indexes

Customer_ID

Email

Phone

Signup_Date

Customer_Status

Customer_Segment

---

## Used By

- Executive Dashboard
- Sales Dashboard
- Customer Dashboard
- AI Monitoring Agent
- Churn Prediction Model
- Recommendation Agent
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

10 Million+

# TABLE 2

# Categories

## Purpose

Stores all product categories used by the organization.

Every product belongs to exactly one category.

Categories help management analyze revenue, profit, inventory, and forecasts by business segment.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Category_ID | BIGINT | PK | No | Auto Increment | Unique Category Identifier |
| Category_Name | VARCHAR(100) | Unique | No | | Category Name |
| Parent_Category | VARCHAR(100) | | Yes | | Parent Category |
| Category_Status | VARCHAR(20) | | No | Active | Active / Inactive |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Record Update Time |

---

## Primary Key

Category_ID

---

## Foreign Keys

None

---

## Relationships

Categories (1)

↓

Products (Many)

---

## Business Rules

- Category Name must be unique.
- Every Product belongs to one Category.
- Category Status defaults to Active.

---

## Indexes

Category_ID

Category_Name

Category_Status

---

## Used By

- Sales Dashboard
- Product Dashboard
- Forecast Agent
- Recommendation Agent
- Executive Dashboard

---

## Estimated Records

500+
# TABLE 3

# Suppliers

## Purpose

Stores supplier information for every product sold by the organization.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Supplier_ID | BIGINT | PK | No | Auto Increment | Unique Supplier Identifier |
| Supplier_Name | VARCHAR(200) | | No | | Supplier Name |
| Contact_Email | VARCHAR(255) | | Yes | | Supplier Email |
| Contact_Number | VARCHAR(20) | | Yes | | Supplier Phone |
| Country | VARCHAR(50) | | Yes | | Supplier Country |
| Supplier_Status | VARCHAR(20) | | No | Active | Active / Inactive |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |

---

## Primary Key

Supplier_ID

---

## Foreign Keys

None

---

## Relationships

Suppliers (1)

↓

Products (Many)

---

## Business Rules

- Supplier Name must be unique.
- Supplier Status defaults to Active.

---

## Indexes

Supplier_ID

Supplier_Name

Supplier_Status

---

## Used By

- Procurement
- Inventory
- Product Dashboard
- AI Recommendation Engine

---

## Estimated Records

10,000+
# TABLE 4

# Products

## Purpose

Stores all product information sold by the organization.

This table acts as the master product catalog for Sales, Marketing, Inventory, AI Recommendation Engine, Forecasting Models, and Executive Dashboards.

Every order references this table using Product_ID.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Product_ID | BIGINT | PK | No | Auto Increment | Unique Product Identifier |
| Category_ID | BIGINT | FK | No | | Reference to Product Category |
| Supplier_ID | BIGINT | FK | No | | Reference to Product Supplier |
| Product_Name | VARCHAR(200) | | No | | Product Name |
| Product_Description | TEXT | | Yes | | Product Description |
| Brand | VARCHAR(100) | | No | | Brand Name |
| SKU | VARCHAR(50) | Unique | No | | Stock Keeping Unit |
| Unit_Price | DECIMAL(12,2) | | No | | Selling Price |
| Cost_Price | DECIMAL(12,2) | | No | | Purchase Cost |
| Profit_Margin | DECIMAL(5,2) | | Yes | | Profit Percentage |
| Product_Status | VARCHAR(20) | | No | Active | Active / Discontinued |
| Launch_Date | DATE | | Yes | | Product Launch Date |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Last Updated Time |

---

## Primary Key

Product_ID

---

## Foreign Keys

Category_ID → Categories.Category_ID

Supplier_ID → Suppliers.Supplier_ID

---

## Relationships

Categories (1)

↓

Products (Many)

Products (1)

↓

Order_Items (Many)

Products (1)

↓

Inventory (Many)

Products (1)

↓

AI_Recommendations (Many)

Products (1)

↓

Forecasts (Many)

Suppliers (1)

↓

Products (Many)

---

## Business Rules

- Product_ID must be unique.
- SKU must be unique.
- Product Name cannot be NULL.
- Selling Price cannot be negative.
- Cost Price cannot be negative.
- Selling Price must always be greater than or equal to Cost Price.
- Every Product must belong to one Category.
- Every Product must belong to one Supplier.
- Product Status can only be Active or Discontinued.
- Profit Margin is automatically calculated from Selling Price and Cost Price.

---

## Indexes

Product_ID

Category_ID

Supplier_ID

SKU

Brand

Product_Name

Product_Status

Launch_Date

---

## Used By

- Executive Dashboard
- Sales Dashboard
- Product Dashboard
- Inventory Dashboard
- AI Recommendation Agent
- Forecast Agent
- Pricing Analytics
- Revenue Analytics
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

1 Million+

---

## Sample Record

| Product_ID | Category | Product_Name | Brand | Unit_Price |
|------------|----------|--------------|-------|------------|
| 100001 | Electronics | iPhone 17 Pro | Apple | 129999.00 |
# TABLE 5

# Orders

## Purpose

Stores every customer purchase made through the business.

This is the central transaction table of the platform and serves as the primary source for revenue analysis, profitability, forecasting, customer analytics, executive dashboards, AI models, and business reporting.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Order_ID | BIGINT | PK | No | Auto Increment | Unique Order Identifier |
| Customer_ID | BIGINT | FK | No | | Customer placing the order |
| Payment_ID | BIGINT | FK | No | | Payment reference |
| Order_Date | DATE | | No | Current Date | Date order was placed |
| Order_Status | VARCHAR(30) | | No | Pending | Pending / Completed / Cancelled / Returned |
| Sales_Channel | VARCHAR(50) | | No | Website | Website / Mobile App / Retail Store |
| Payment_Method | VARCHAR(50) | | No | | UPI / Card / Net Banking / Wallet |
| Total_Quantity | INT | | No | 1 | Total quantity ordered |
| Total_Revenue | DECIMAL(12,2) | | No | | Total revenue generated |
| Total_Cost | DECIMAL(12,2) | | No | | Total cost of products |
| Total_Profit | DECIMAL(12,2) | | No | | Total profit earned |
| Total_Discount | DECIMAL(12,2) | | Yes | 0 | Total discount applied |
| Shipping_Cost | DECIMAL(12,2) | | Yes | 0 | Shipping charges |
| Delivery_Date | DATE | | Yes | | Order delivery date |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record creation time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Record update time |

---

## Primary Key

Order_ID

---

## Foreign Keys

Customer_ID → Customers.Customer_ID

Payment_ID → Payments.Payment_ID

---

## Relationships

Customers (1)

↓

Orders (Many)

Orders (1)

↓

Order_Items (Many)

Orders (1)

↓

Payments (1)

Orders (1)

↓

Forecasts (Many)

Orders (1)

↓

AI_Recommendations (Many)

---

## Business Rules

- Every Order must belong to one Customer.
- Every Order must have one Payment.
- Order Date cannot be NULL.
- Revenue cannot be negative.
- Profit can be negative.
- Shipping Cost cannot be negative.
- Order Status must be one of:
  - Pending
  - Completed
  - Cancelled
  - Returned
- Revenue = Sum of all Order Items.
- Profit = Revenue − Total Cost.

---

## Indexes

Order_ID

Customer_ID

Order_Date

Order_Status

Sales_Channel

Payment_Method

---

## Used By

- Executive Dashboard
- Revenue Dashboard
- Sales Dashboard
- Finance Dashboard
- AI Monitoring Agent
- Forecast Agent
- Customer Analytics
- Power BI Dashboard
- SQL Reports
- Machine Learning Models

---

## Estimated Records

100 Million+

---

## Sample Record

| Order_ID | Customer_ID | Revenue | Profit | Status |
|----------|-------------|----------|---------|--------|
| 500001 | 1001 | 24599.00 | 5200.00 | Completed |
# TABLE 6

# Order_Items

## Purpose

Stores individual products purchased within each order.

One order can contain multiple products.

This table resolves the Many-to-Many relationship between Orders and Products and acts as the detailed transaction table for revenue, profit, inventory movement, AI recommendations, forecasting, and customer purchase analytics.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Order_Item_ID | BIGINT | PK | No | Auto Increment | Unique Order Item Identifier |
| Order_ID | BIGINT | FK | No | | Reference to Order |
| Product_ID | BIGINT | FK | No | | Reference to Product |
| Quantity | INT | | No | 1 | Number of Units Purchased |
| Unit_Price | DECIMAL(12,2) | | No | | Selling Price per Unit |
| Cost_Price | DECIMAL(12,2) | | No | | Cost Price per Unit |
| Discount | DECIMAL(12,2) | | Yes | 0 | Discount Applied |
| Revenue | DECIMAL(12,2) | | No | | Total Revenue |
| Profit | DECIMAL(12,2) | | No | | Total Profit |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |

---

## Primary Key

Order_Item_ID

---

## Foreign Keys

Order_ID → Orders.Order_ID

Product_ID → Products.Product_ID

---

## Relationships

Orders (1)

↓

Order_Items (Many)

Products (1)

↓

Order_Items (Many)

---

## Business Rules

- Every Order Item must belong to one Order.
- Every Order Item must reference one Product.
- Quantity must be greater than zero.
- Unit Price cannot be negative.
- Cost Price cannot be negative.
- Revenue = Quantity × Unit Price − Discount.
- Profit = Revenue − (Quantity × Cost Price).

---

## Indexes

Order_Item_ID

Order_ID

Product_ID

Created_At

---

## Used By

- Sales Dashboard
- Product Dashboard
- Inventory Dashboard
- Revenue Analytics
- Profitability Analysis
- Customer Purchase Analysis
- Recommendation Engine
- Forecast Models
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

500 Million+

---

## Sample Record

| Order_Item_ID | Order_ID | Product_ID | Qty | Revenue | Profit |
|---------------|----------|------------|-----|----------|---------|
| 900001 | 500001 | 100001 | 2 | 259998.00 | 42000.00 |
# TABLE 7

# Payments

## Purpose

Stores payment information for every customer order.

This table records payment transactions, payment methods, payment status, and financial details. It serves as the foundation for finance reporting, reconciliation, fraud detection, revenue recognition, and executive financial dashboards.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Payment_ID | BIGINT | PK | No | Auto Increment | Unique Payment Identifier |
| Order_ID | BIGINT | FK | No | | Reference to Order |
| Customer_ID | BIGINT | FK | No | | Customer making payment |
| Payment_Method | VARCHAR(50) | | No | | UPI / Credit Card / Debit Card / Net Banking / Wallet / Cash |
| Payment_Status | VARCHAR(30) | | No | Pending | Pending / Success / Failed / Refunded |
| Transaction_ID | VARCHAR(100) | Unique | No | | Payment Gateway Transaction ID |
| Payment_Amount | DECIMAL(12,2) | | No | | Amount Paid |
| Currency | VARCHAR(10) | | No | INR | Payment Currency |
| Payment_Date | TIMESTAMP | | No | Current Timestamp | Date & Time of Payment |
| Refund_Amount | DECIMAL(12,2) | | Yes | 0 | Refund Amount |
| Refund_Date | TIMESTAMP | | Yes | | Refund Date |
| Gateway_Name | VARCHAR(100) | | Yes | | Razorpay / Stripe / Paytm / PhonePe |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Record Update Time |

---

## Primary Key

Payment_ID

---

## Foreign Keys

Order_ID → Orders.Order_ID

Customer_ID → Customers.Customer_ID

---

## Relationships

Orders (1)

↓

Payments (1)

Customers (1)

↓

Payments (Many)

---

## Business Rules

- Every Payment must belong to one Order.
- Every Payment must belong to one Customer.
- Transaction_ID must be unique.
- Payment Amount cannot be negative.
- Refund Amount cannot exceed Payment Amount.
- Payment Status can only be:
  - Pending
  - Success
  - Failed
  - Refunded
- Currency defaults to INR.

---

## Indexes

Payment_ID

Order_ID

Customer_ID

Transaction_ID

Payment_Status

Payment_Date

Gateway_Name

---

## Used By

- Finance Dashboard
- Revenue Dashboard
- Executive Dashboard
- Fraud Detection Models
- AI Monitoring Agent
- Payment Analytics
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

100 Million+

---

## Sample Record

| Payment_ID | Order_ID | Amount | Method | Status |
|------------|----------|---------|--------|--------|
| 700001 | 500001 | 259998.00 | UPI | Success |
# TABLE 8

# Inventory

## Purpose

Stores inventory information for every product across different warehouses.

This table enables stock monitoring, inventory forecasting, replenishment planning, AI-driven stock optimization, and executive inventory reporting.

It ensures products are always available while minimizing excess inventory costs.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Inventory_ID | BIGINT | PK | No | Auto Increment | Unique Inventory Identifier |
| Product_ID | BIGINT | FK | No | | Reference to Product |
| Warehouse_ID | BIGINT | FK | No | | Reference to Warehouse |
| Current_Stock | INT | | No | 0 | Available Stock Quantity |
| Reserved_Stock | INT | | No | 0 | Reserved for Pending Orders |
| Damaged_Stock | INT | | No | 0 | Damaged Inventory |
| Reorder_Level | INT | | No | 100 | Minimum Stock Level |
| Maximum_Stock | INT | | No | 1000 | Maximum Storage Capacity |
| Last_Stock_Update | TIMESTAMP | | No | Current Timestamp | Last Inventory Update |
| Inventory_Status | VARCHAR(20) | | No | Available | Available / Low Stock / Out of Stock |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Record Update Time |

---

## Primary Key

Inventory_ID

---

## Foreign Keys

Product_ID → Products.Product_ID

Warehouse_ID → Warehouse.Warehouse_ID

---

## Relationships

Products (1)

↓

Inventory (Many)

Warehouse (1)

↓

Inventory (Many)

---

## Business Rules

- Every Inventory record must belong to one Product.
- Every Inventory record must belong to one Warehouse.
- Stock quantities cannot be negative.
- Reserved Stock cannot exceed Current Stock.
- Damaged Stock cannot exceed Current Stock.
- If Current Stock ≤ Reorder Level → Status becomes Low Stock.
- If Current Stock = 0 → Status becomes Out of Stock.
- Inventory Status can only be:
  - Available
  - Low Stock
  - Out of Stock

---

## Indexes

Inventory_ID

Product_ID

Warehouse_ID

Inventory_Status

Current_Stock

Last_Stock_Update

---

## Used By

- Inventory Dashboard
- Executive Dashboard
- AI Inventory Agent
- Forecast Agent
- Procurement Dashboard
- Supply Chain Analytics
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

50 Million+

---

## Sample Record

| Inventory_ID | Product_ID | Warehouse_ID | Current_Stock | Status |
|---------------|------------|--------------|---------------|--------|
| 800001 | 100001 | 3001 | 540 | Available |
# TABLE 9

# Warehouse

## Purpose

Stores warehouse information where inventory is physically stored.

This table enables inventory distribution, warehouse utilization analysis, logistics optimization, stock movement tracking, AI-based warehouse optimization, and supply chain reporting.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Warehouse_ID | BIGINT | PK | No | Auto Increment | Unique Warehouse Identifier |
| Warehouse_Name | VARCHAR(150) | | No | | Warehouse Name |
| Warehouse_Code | VARCHAR(50) | Unique | No | | Internal Warehouse Code |
| Country | VARCHAR(50) | | No | | Country |
| State | VARCHAR(50) | | No | | State |
| City | VARCHAR(50) | | No | | City |
| Address | VARCHAR(255) | | Yes | | Warehouse Address |
| Postal_Code | VARCHAR(20) | | Yes | | Postal Code |
| Warehouse_Type | VARCHAR(50) | | No | Distribution Center | Distribution Center / Fulfillment Center / Regional Warehouse |
| Storage_Capacity | INT | | No | | Maximum Storage Capacity |
| Current_Utilization | DECIMAL(5,2) | | Yes | 0 | Storage Utilization (%) |
| Warehouse_Status | VARCHAR(20) | | No | Active | Active / Inactive |
| Manager_Name | VARCHAR(100) | | Yes | | Warehouse Manager |
| Contact_Number | VARCHAR(20) | | Yes | | Contact Number |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Record Update Time |

---

## Primary Key

Warehouse_ID

---

## Foreign Keys

None

---

## Relationships

Warehouse (1)

↓

Inventory (Many)

---

## Business Rules

- Warehouse_ID must be unique.
- Warehouse_Code must be unique.
- Storage Capacity must be greater than zero.
- Current Utilization must be between 0 and 100.
- Warehouse Status can only be:
  - Active
  - Inactive
- Every Inventory record must belong to one Warehouse.

---

## Indexes

Warehouse_ID

Warehouse_Code

City

State

Warehouse_Status

Warehouse_Type

---

## Used By

- Inventory Dashboard
- Executive Dashboard
- Supply Chain Dashboard
- Warehouse Analytics
- AI Inventory Agent
- Forecast Agent
- Logistics Analytics
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

5,000+

---

## Sample Record

| Warehouse_ID | Warehouse_Name | City | Capacity | Status |
|---------------|----------------|------|----------|--------|
| 3001 | Pune Distribution Center | Pune | 500000 | Active |
# TABLE 10

# Marketing_Campaigns

## Purpose

Stores marketing campaign information across different channels.

This table enables campaign performance analysis, ROI measurement, customer acquisition tracking, AI-driven campaign optimization, and executive marketing dashboards.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Campaign_ID | BIGINT | PK | No | Auto Increment | Unique Campaign Identifier |
| Campaign_Name | VARCHAR(200) | | No | | Campaign Name |
| Campaign_Type | VARCHAR(50) | | No | | Email / Social Media / Google Ads / TV / Referral |
| Start_Date | DATE | | No | | Campaign Start Date |
| End_Date | DATE | | No | | Campaign End Date |
| Budget | DECIMAL(12,2) | | No | | Campaign Budget |
| Spend | DECIMAL(12,2) | | No | | Total Spend |
| Revenue_Generated | DECIMAL(12,2) | | Yes | 0 | Revenue Generated |
| Leads_Generated | INT | | Yes | 0 | Total Leads |
| Conversion_Rate | DECIMAL(5,2) | | Yes | 0 | Conversion Percentage |
| ROI | DECIMAL(8,2) | | Yes | | Return on Investment |
| Campaign_Status | VARCHAR(20) | | No | Active | Planned / Active / Completed |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |

---

## Primary Key

Campaign_ID

---

## Foreign Keys

None

---

## Relationships

Marketing Campaign (1)

↓

Customers (Many)

---

## Business Rules

- Campaign Name must be unique.
- Budget cannot be negative.
- Spend cannot exceed Budget without approval.
- ROI is automatically calculated.
- Campaign Status must be:
  - Planned
  - Active
  - Completed

---

## Indexes

Campaign_ID

Campaign_Name

Campaign_Status

Campaign_Type

Start_Date

---

## Used By

- Marketing Dashboard
- Executive Dashboard
- AI Campaign Optimization Agent
- Customer Acquisition Dashboard
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

500,000+

---

## Sample Record

| Campaign_ID | Campaign_Name | Budget | Revenue | ROI |
|-------------|---------------|---------|----------|-----|
| 90001 | Diwali Mega Sale | 2500000 | 9800000 | 292% |
# TABLE 11

# Support_Tickets

## Purpose

Stores customer support requests, complaints, issues, and service interactions.

This table enables customer experience analytics, SLA monitoring, root cause analysis, AI-powered ticket classification, churn prediction, and executive customer service reporting.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Ticket_ID | BIGINT | PK | No | Auto Increment | Unique Ticket Identifier |
| Customer_ID | BIGINT | FK | No | | Customer who raised the ticket |
| Employee_ID | BIGINT | FK | No | | Support Executive handling the ticket |
| Ticket_Category | VARCHAR(100) | | No | | Payment / Delivery / Product / Technical / Refund |
| Priority | VARCHAR(20) | | No | Medium | Low / Medium / High / Critical |
| Ticket_Status | VARCHAR(30) | | No | Open | Open / In Progress / Resolved / Closed |
| Ticket_Title | VARCHAR(255) | | No | | Short Issue Title |
| Ticket_Description | TEXT | | Yes | | Customer Issue Description |
| Resolution_Time_Hours | DECIMAL(6,2) | | Yes | | Resolution Time in Hours |
| Customer_Satisfaction | DECIMAL(3,2) | | Yes | | Rating between 1 and 5 |
| Created_Date | TIMESTAMP | | No | Current Timestamp | Ticket Creation Time |
| Closed_Date | TIMESTAMP | | Yes | | Ticket Closing Time |
| SLA_Breached | BOOLEAN | | No | FALSE | Indicates SLA Violation |

---

## Primary Key

Ticket_ID

---

## Foreign Keys

Customer_ID → Customers.Customer_ID

Employee_ID → Employees.Employee_ID

---

## Relationships

Customers (1)

↓

Support_Tickets (Many)

Employees (1)

↓

Support_Tickets (Many)

---

## Business Rules

- Every Ticket must belong to one Customer.
- Every Ticket must be assigned to one Employee.
- Ticket Status must be:
  - Open
  - In Progress
  - Resolved
  - Closed
- Priority must be:
  - Low
  - Medium
  - High
  - Critical
- Customer Satisfaction Rating must be between 1 and 5.
- Resolution Time cannot be negative.
- SLA_Breached defaults to FALSE.

---

## Indexes

Ticket_ID

Customer_ID

Employee_ID

Ticket_Status

Priority

Created_Date

Ticket_Category

---

## Used By

- Customer Support Dashboard
- Executive Dashboard
- AI Support Agent
- Churn Prediction Model
- SLA Monitoring Dashboard
- Root Cause Analysis
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

50 Million+

---

## Sample Record

| Ticket_ID | Customer_ID | Priority | Status | Satisfaction |
|------------|-------------|----------|--------|--------------|
| 100001 | 50001 | High | Resolved | 4.80 |
# TABLE 12

# Employees

## Purpose

Stores employee information across all business departments.

This table enables employee performance tracking, workload analysis, customer support assignment, sales performance monitoring, AI workforce analytics, and executive HR reporting.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Employee_ID | BIGINT | PK | No | Auto Increment | Unique Employee Identifier |
| Employee_Code | VARCHAR(50) | Unique | No | | Company Employee Code |
| First_Name | VARCHAR(100) | | No | | Employee First Name |
| Last_Name | VARCHAR(100) | | No | | Employee Last Name |
| Email | VARCHAR(255) | Unique | No | | Official Email Address |
| Phone | VARCHAR(20) | | Yes | | Contact Number |
| Department | VARCHAR(100) | | No | | Sales / Support / Marketing / Finance / Operations |
| Designation | VARCHAR(100) | | No | | Job Role |
| Manager_ID | BIGINT | FK | Yes | | Reporting Manager |
| Joining_Date | DATE | | No | | Employee Joining Date |
| Employment_Status | VARCHAR(20) | | No | Active | Active / Resigned / On Leave |
| Performance_Rating | DECIMAL(3,2) | | Yes | | Performance Rating (1–5) |
| Created_At | TIMESTAMP | | No | Current Timestamp | Record Creation Time |
| Updated_At | TIMESTAMP | | No | Current Timestamp | Record Update Time |

---

## Primary Key

Employee_ID

---

## Foreign Keys

Manager_ID → Employees.Employee_ID

(Self Referencing Relationship)

---

## Relationships

Employees (1)

↓

Support_Tickets (Many)

Employees (1)

↓

Employees (Many)

(Manager → Team Members)

---

## Business Rules

- Employee Code must be unique.
- Email must be unique.
- Every Employee belongs to one Department.
- Performance Rating must be between 1 and 5.
- Employment Status must be:
  - Active
  - Resigned
  - On Leave
- Manager_ID is optional for top-level executives.

---

## Indexes

Employee_ID

Employee_Code

Department

Designation

Employment_Status

Manager_ID

---

## Used By

- Executive Dashboard
- HR Dashboard
- Customer Support Dashboard
- Sales Dashboard
- Employee Performance Dashboard
- AI Workforce Analytics
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

100,000+

---

## Sample Record

| Employee_ID | Employee_Code | Department | Designation | Rating |
|--------------|---------------|------------|-------------|--------|
| 20001 | EMP0001 | Customer Support | Senior Support Engineer | 4.80 |
# TABLE 13

# AI_Recommendations

## Purpose

Stores AI-generated business recommendations based on historical business data, machine learning models, forecasting results, anomaly detection, customer behavior, and business rules.

This table enables business users and executives to receive automated recommendations without manually analyzing reports.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Recommendation_ID | BIGINT | PK | No | Auto Increment | Unique Recommendation Identifier |
| Recommendation_Type | VARCHAR(100) | | No | | Pricing / Inventory / Marketing / Customer / Sales |
| Business_Area | VARCHAR(100) | | No | | Sales / Marketing / Finance / Operations |
| Generated_For | VARCHAR(100) | | No | | CEO / Manager / Analyst |
| Recommendation_Title | VARCHAR(255) | | No | | Recommendation Heading |
| Recommendation_Description | TEXT | | No | | Detailed Recommendation |
| Confidence_Score | DECIMAL(5,2) | | No | | AI Confidence Percentage |
| Expected_Impact | VARCHAR(50) | | Yes | | High / Medium / Low |
| Status | VARCHAR(30) | | No | Pending | Pending / Accepted / Rejected / Implemented |
| Generated_By_Model | VARCHAR(100) | | No | | AI Model Name |
| Generated_Date | TIMESTAMP | | No | Current Timestamp | Recommendation Generated Time |
| Reviewed_By | BIGINT | FK | Yes | | Employee Reviewing Recommendation |
| Review_Date | TIMESTAMP | | Yes | | Review Time |

---

## Primary Key

Recommendation_ID

---

## Foreign Keys

Reviewed_By → Employees.Employee_ID

---

## Relationships

Employees (1)

↓

AI_Recommendations (Many)

---

## Business Rules

- Confidence Score must be between 0 and 100.
- Expected Impact can only be:
  - High
  - Medium
  - Low
- Status can only be:
  - Pending
  - Accepted
  - Rejected
  - Implemented

---

## Indexes

Recommendation_ID

Business_Area

Recommendation_Type

Status

Generated_Date

Confidence_Score

---

## Used By

- Executive Dashboard
- AI Decision Agent
- CEO Dashboard
- Strategy Dashboard
- Business Analyst Dashboard
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

100 Million+

---

## Sample Record

| Recommendation_ID | Type | Confidence | Status |
|-------------------|------|------------|--------|
| 900001 | Inventory Optimization | 97.45 | Accepted |
# TABLE 14

# Forecasts

## Purpose

Stores AI-generated business forecasts using historical business data, machine learning models, statistical analysis, and business intelligence.

This table enables organizations to predict future business performance and proactively make strategic decisions.

Forecasts can include revenue, sales, customer churn, inventory demand, marketing performance, profitability, and operational KPIs.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Forecast_ID | BIGINT | PK | No | Auto Increment | Unique Forecast Identifier |
| Forecast_Type | VARCHAR(100) | | No | | Revenue / Sales / Inventory / Churn / Profit |
| Business_Area | VARCHAR(100) | | No | | Sales / Marketing / Finance / Operations |
| Forecast_Period | VARCHAR(50) | | No | | Daily / Weekly / Monthly / Quarterly / Yearly |
| Forecast_Start_Date | DATE | | No | | Forecast Start Date |
| Forecast_End_Date | DATE | | No | | Forecast End Date |
| Predicted_Value | DECIMAL(18,2) | | No | | AI Predicted Value |
| Actual_Value | DECIMAL(18,2) | | Yes | | Actual Business Value |
| Forecast_Error | DECIMAL(10,2) | | Yes | | Prediction Error |
| Confidence_Score | DECIMAL(5,2) | | No | | AI Confidence (%) |
| Model_Name | VARCHAR(100) | | No | | Forecasting Model Name |
| Forecast_Status | VARCHAR(30) | | No | Generated | Generated / Validated / Completed |
| Generated_Date | TIMESTAMP | | No | Current Timestamp | Forecast Generation Time |
| Reviewed_By | BIGINT | FK | Yes | | Employee Reviewing Forecast |

---

## Primary Key

Forecast_ID

---

## Foreign Keys

Reviewed_By → Employees.Employee_ID

---

## Relationships

Employees (1)

↓

Forecasts (Many)

AI_Recommendations (Many)

↓

Forecasts (Many)

---

## Business Rules

- Predicted Value cannot be negative.
- Confidence Score must be between 0 and 100.
- Forecast Status can only be:
  - Generated
  - Validated
  - Completed
- Forecast End Date must be greater than Forecast Start Date.
- Forecast Error is calculated automatically after actual values become available.

---

## Indexes

Forecast_ID

Forecast_Type

Business_Area

Forecast_Period

Generated_Date

Confidence_Score

Forecast_Status

---

## Used By

- Executive Dashboard
- CEO Dashboard
- AI Forecast Agent
- Finance Dashboard
- Sales Dashboard
- Inventory Dashboard
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

20 Million+

---

## Sample Record

| Forecast_ID | Forecast_Type | Predicted_Value | Confidence | Status |
|--------------|---------------|-----------------|------------|--------|
| 100001 | Monthly Revenue | 12,500,000 | 96.80 | Validated |
# TABLE 15

# Alerts

## Purpose

Stores AI-generated business alerts triggered by real-time business events, anomaly detection models, business rules, and machine learning algorithms.

This table ensures executives and business users are immediately notified about critical business situations requiring attention.

Alerts enable proactive business decision-making instead of reactive reporting.

---

## Columns

| Column Name | Data Type | Key | Nullable | Default | Description |
|-------------|-----------|-----|----------|----------|-------------|
| Alert_ID | BIGINT | PK | No | Auto Increment | Unique Alert Identifier |
| Alert_Type | VARCHAR(100) | | No | | Revenue Drop / Inventory Shortage / Customer Churn / Fraud / SLA Breach |
| Business_Area | VARCHAR(100) | | No | | Sales / Marketing / Finance / Operations / Customer Support |
| Severity | VARCHAR(20) | | No | Medium | Low / Medium / High / Critical |
| Alert_Title | VARCHAR(255) | | No | | Alert Heading |
| Alert_Description | TEXT | | No | | Detailed Alert Description |
| Trigger_Source | VARCHAR(100) | | No | | AI Model / Business Rule / KPI Threshold |
| Trigger_Value | DECIMAL(18,2) | | Yes | | Actual Value Triggering Alert |
| Threshold_Value | DECIMAL(18,2) | | Yes | | Expected Threshold |
| Alert_Status | VARCHAR(30) | | No | Open | Open / Acknowledged / Resolved |
| Assigned_To | BIGINT | FK | Yes | | Employee Responsible |
| Created_Date | TIMESTAMP | | No | Current Timestamp | Alert Creation Time |
| Resolved_Date | TIMESTAMP | | Yes | | Alert Resolution Time |

---

## Primary Key

Alert_ID

---

## Foreign Keys

Assigned_To → Employees.Employee_ID

---

## Relationships

Employees (1)

↓

Alerts (Many)

Forecasts (1)

↓

Alerts (Many)

AI_Recommendations (1)

↓

Alerts (Many)

---

## Business Rules

- Alert Severity can only be:
  - Low
  - Medium
  - High
  - Critical
- Alert Status can only be:
  - Open
  - Acknowledged
  - Resolved
- Every Alert belongs to one Business Area.
- Critical Alerts should be assigned immediately.
- Resolved Date must be greater than Created Date.

---

## Indexes

Alert_ID

Alert_Type

Business_Area

Severity

Alert_Status

Created_Date

Assigned_To

---

## Used By

- Executive Dashboard
- CEO Dashboard
- AI Monitoring Agent
- Operations Dashboard
- Customer Support Dashboard
- Fraud Detection Dashboard
- SQL Reports
- Power BI Dashboard

---

## Estimated Records

100 Million+

---

## Sample Record

| Alert_ID | Alert_Type | Severity | Status |
|-----------|------------|----------|--------|
| 500001 | Revenue Drop | Critical | Open |


