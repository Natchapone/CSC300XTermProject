BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "categories" (
	"catID"	INTEGER,
	"cat_name"	TEXT NOT NULL,
	"displayOrder"	INTEGER NOT NULL,
	PRIMARY KEY("catID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "cartProducts" (
	"cpID"	INTEGER,
	"cartID"	INTEGER NOT NULL,
	"productID"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	PRIMARY KEY("cpID" AUTOINCREMENT),
	FOREIGN KEY("cartID") REFERENCES "carts"("cartID"),
	FOREIGN KEY("productID") REFERENCES "products"("productID")
);
CREATE TABLE IF NOT EXISTS "carts" (
	"cartID"	INTEGER,
	"status"	TEXT NOT NULL,
	"created"	NUMERIC NOT NULL,
	"userID"	INTEGER,
	PRIMARY KEY("cartID" AUTOINCREMENT),
	FOREIGN KEY("userID") REFERENCES "users"("userID")
);
CREATE TABLE IF NOT EXISTS "products" (
	"productID"	INTEGER,
	"product_name"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"imagepath"	TEXT NOT NULL,
	"price"	REAL NOT NULL,
	"catID"	INTEGER NOT NULL,
	"featured"	BLOB,
	PRIMARY KEY("productID"),
	FOREIGN KEY("catID") REFERENCES "categories"("catID")
);
CREATE TABLE IF NOT EXISTS "users" (
	"userID"	INTEGER,
	"username"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"password"	TEXT,
	"userType"	TEXT,
	"created"	NUMERIC NOT NULL,
	PRIMARY KEY("userID" AUTOINCREMENT)
);
COMMIT;
