CREATE TABLE "cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"guest_id" text,
	"product_id" integer NOT NULL,
	"stock" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cart_owner_check" CHECK (num_nonnulls("cart"."user_id", "cart"."guest_id") = 1)
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "cart_user_product_unique" ON "cart" USING btree ("user_id","product_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "cart_guest_product_unique" ON "cart" USING btree ("guest_id","product_id");
