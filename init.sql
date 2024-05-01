-- Users table
CREATE TABLE public.users (
	id uuid NOT NULL,
	"firstName" varchar NULL,
	"lastName" varchar NULL,
	email varchar NULL,
	"password" varchar NULL,
	age numeric DEFAULT 1 NULL,
	"createdAt" date DEFAULT now() NULL,
	"updatedAt" date DEFAULT now() NULL
);
-- Articles table

CREATE TABLE public.articles (
	id uuid NOT NULL,
	title varchar NULL,
	context varchar NULL,
	"publishedDate" date DEFAULT now() NULL,
	"userId" uuid NOT NULL,
	"createdAt" date DEFAULT now() NULL,
	"updatedAt" date DEFAULT now() NULL
);
