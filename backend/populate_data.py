from db import get_connection

def populate_data():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        # Disable foreign key checks to safely truncate existing data
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
        cursor.execute("TRUNCATE TABLE order_items;")
        cursor.execute("TRUNCATE TABLE payments;")
        cursor.execute("TRUNCATE TABLE orders;")
        cursor.execute("TRUNCATE TABLE inventory;")
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")

        # 1. Populate Inventory
        inventory_data = [
            (3, 25, 3, 10, 50, "Available"),
            (4, 40, 5, 15, 80, "Available"),
            (5, 100, 10, 30, 200, "Available"),
            (6, 80, 8, 25, 150, "Available"),
            (7, 8, 2, 3, 15, "Available"),
            (8, 12, 3, 5, 20, "Available"),
            (9, 18, 4, 6, 30, "Available"),
            (10, 35, 6, 12, 60, "Available"),
        ]

        cursor.executemany(
            """
            INSERT INTO inventory
            (Product_ID, Current_Stock, Reserved_Stock, Reorder_Level, Maximum_Stock, Inventory_Status)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            inventory_data,
        )

        # 2. Populate Orders
        orders_data = [
            (1, "2026-07-01", "Completed", 35000, "Paid", "Pune, Maharashtra", "2026-07-05"),
            (2, "2026-07-03", "Completed", 12000, "Paid", "Mumbai, Maharashtra", "2026-07-07"),
            (3, "2026-07-05", "Completed", 600, "Paid", "Delhi, Delhi", "2026-07-09"),
            (4, "2026-07-08", "Completed", 250000, "Paid", "Bangalore, Karnataka", "2026-07-12"),
            (5, "2026-07-10", "Completed", 550, "Paid", "Ahmedabad, Gujarat", "2026-07-14"),
            (6, "2026-07-12", "Completed", 180000, "Paid", "Lucknow, Uttar Pradesh", "2026-07-16"),
            (7, "2026-07-15", "Completed", 65000, "Paid", "Jaipur, Rajasthan", "2026-07-19"),
            (8, "2026-07-17", "Completed", 9000, "Paid", "Surat, Gujarat", "2026-07-21"),
            (9, "2026-07-19", "Completed", 35000, "Paid", "Hyderabad, Telangana", "2026-07-23"),
            (10, "2026-07-21", "Completed", 12000, "Paid", "Kochi, Kerala", "2026-07-25"),
            (1, "2026-07-23", "Completed", 250000, "Paid", "Pune, Maharashtra", "2026-07-27"),
            (2, "2026-07-25", "Completed", 180000, "Paid", "Mumbai, Maharashtra", "2026-07-29"),
            (3, "2026-07-27", "Completed", 65000, "Paid", "Delhi, Delhi", "2026-07-31"),
            (4, "2026-07-28", "Pending", 35000, "Pending", "Bangalore, Karnataka", None),
            (5, "2026-07-29", "Pending", 12000, "Pending", "Ahmedabad, Gujarat", None),
            (6, "2026-07-30", "Pending", 600, "Pending", "Lucknow, Uttar Pradesh", None),
            (7, "2026-07-31", "Pending", 550, "Pending", "Jaipur, Rajasthan", None),
            (8, "2026-08-01", "Pending", 9000, "Pending", "Surat, Gujarat", None),
            (9, "2026-08-02", "Pending", 180000, "Pending", "Hyderabad, Telangana", None),
            (10, "2026-08-03", "Pending", 65000, "Pending", "Kochi, Kerala", None),
        ]

        cursor.executemany(
            """
            INSERT INTO orders
            (Customer_ID, Order_Date, Order_Status, Total_Amount, Payment_Status, Shipping_Address, Delivery_Date)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            orders_data,
        )

        # Retrieve inserted orders ordered chronologically
        cursor.execute(
            """
            SELECT Order_ID, Customer_ID, Order_Status, Total_Amount
            FROM orders
            ORDER BY Order_ID ASC
            """
        )
        inserted_orders = cursor.fetchall()

        # Product mapping definition array (1:1 with ordered rows)
        product_mappings = [
            (3, 35000), (4, 12000), (5, 600), (7, 250000), (6, 550),
            (8, 180000), (9, 65000), (10, 9000), (3, 35000), (4, 12000),
            (7, 250000), (8, 180000), (9, 65000), (3, 35000), (4, 12000),
            (5, 600), (6, 550), (10, 9000), (8, 180000), (9, 65000)
        ]

        order_items_data = []
        payments_data = []

        for index, (order_id, customer_id, status, total_amount) in enumerate(inserted_orders):
            if index < len(product_mappings):
                product_id, unit_price = product_mappings[index]
            else:
                product_id, unit_price = (3, total_amount)

            # Order Items
            order_items_data.append((order_id, product_id, 1, unit_price, unit_price))

            # Payments
            payment_status = "Paid" if status == "Completed" else "Pending"
            payments_data.append((order_id, "UPI", payment_status, f"TXN{order_id}", total_amount))

        # 3. Populate Order Items
        cursor.executemany(
            """
            INSERT INTO order_items
            (Order_ID, Product_ID, Quantity, Unit_Price, Total_Price)
            VALUES (%s, %s, %s, %s, %s)
            """,
            order_items_data,
        )

        # 4. Populate Payments
        cursor.executemany(
            """
            INSERT INTO payments
            (Order_ID, Payment_Method, Payment_Status, Transaction_ID, Amount)
            VALUES (%s, %s, %s, %s, %s)
            """,
            payments_data,
        )

        conn.commit()

        # Output Summary
        cursor.execute("SELECT COUNT(*) FROM inventory")
        inventory_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM orders")
        order_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM order_items")
        order_item_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM payments")
        payment_count = cursor.fetchone()[0]

        print("\n======================================")
        print("BUSINESS DATA CREATED SUCCESSFULLY")
        print("======================================")
        print(f"Inventory rows : {inventory_count}")
        print(f"Orders         : {order_count}")
        print(f"Order items    : {order_item_count}")
        print(f"Payments       : {payment_count}")
        print("======================================")

    except Exception as e:
        conn.rollback()
        print(f"\n[ERROR] Database seeding failed: {e}")

    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    populate_data()