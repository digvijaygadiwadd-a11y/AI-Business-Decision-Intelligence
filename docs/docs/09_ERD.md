# Entity Relationship Design

## Customers

Primary Key

Customer_ID

---

## Products

Primary Key

Product_ID

---

## Categories

Primary Key

Category_ID

---

## Orders

Primary Key

Order_ID

---

## Order_Items

Primary Key

Order_Item_ID

---

## Marketing_Campaign

Primary Key

Campaign_ID

---

## Inventory

Primary Key

Inventory_ID

---

## Warehouse

Primary Key

Warehouse_ID

---

## Supplier

Primary Key

Supplier_ID

---

## Support_Tickets

Primary Key

Ticket_ID

---

## Employees

Primary Key

Employee_ID

---

## Payments

Primary Key

Payment_ID

---

## AI_Recommendations

Primary Key

Recommendation_ID

---

## Forecasts

Primary Key

Forecast_ID

---

## Alerts

Primary Key

Alert_ID
Customer

1

↓

Many

Orders

--------------------------------

Orders

1

↓

Many

Order Items

--------------------------------

Products

1

↓

Many

Order Items

--------------------------------

Category

1

↓

Many

Products

--------------------------------

Warehouse

1

↓

Many

Inventory

--------------------------------

Supplier

1

↓

Many

Products

--------------------------------

Customer

1

↓

Many

Support Tickets

--------------------------------

Marketing Campaign

1

↓

Many

Customers

--------------------------------

Orders

1

↓

1

Payments
