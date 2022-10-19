-- Create table Product
CREATE TABLE IF NOT EXISTS public.products (
    id uuid PRIMARY KEY,
    name VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    title VARCHAR,
    description TEXT,
    difficulty SMALLINT,
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    sku VARCHAR(24),
    deleted_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

ALTER TABLE public.products OWNER TO mysticcase;

-- Create index for slug field
CREATE INDEX IF NOT EXISTS products_slug_idx ON public.products USING btree (slug);

-- Create table Interval
CREATE TABLE IF NOT EXISTS public.intervals (
    id uuid PRIMARY KEY,
    recurring VARCHAR(10) NOT NULL,
    count INTEGER NOT NULL,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

ALTER TABLE public.intervals OWNER TO mysticcase;

-- Create table Price
CREATE TABLE IF NOT EXISTS public.prices (
    id uuid PRIMARY KEY,
    amount INTEGER NOT NULL,
    amount_decimal VARCHAR GENERATED ALWAYS AS (CAST( amount as VARCHAR )) STORED NOT NULL,
    currency VARCHAR(3) NOT NULL,
    type SMALLINT NOT NULL,
    active BOOLEAN DEFAULT true,
    interval_id uuid,
    product_id uuid,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,

    CONSTRAINT fk_interval FOREIGN KEY(interval_id) REFERENCES public.intervals(id) ON DELETE SET NULL,
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES public.products(id) ON DELETE CASCADE
);

ALTER TABLE public.prices OWNER TO mysticcase;

-- Create table Images
CREATE TABLE IF NOT EXISTS public.images (
    id uuid PRIMARY KEY,
    name VARCHAR(24),
    store_path VARCHAR(64),
    url_path VARCHAR(64),
    thumbnail_path VARCHAR(64),
    deleted_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

ALTER TABLE public.images OWNER TO mysticcase;

-- Create table for Many-2-Many relations between Images and Products
CREATE TABLE IF NOT EXISTS public.products_images (
    id uuid PRIMARY KEY,
    product_id uuid,
    image_id uuid,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,

    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES public.products(id) ON DELETE SET NULL,
    CONSTRAINT fk_image FOREIGN KEY(image_id) REFERENCES public.images(id) ON DELETE CASCADE,
    CONSTRAINT uq_product_image UNIQUE(product_id, image_id)
);

ALTER TABLE public.products_images OWNER TO mysticcase;