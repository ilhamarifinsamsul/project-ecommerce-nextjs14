import { z } from "zod";

export const ALLOW_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

// schema sign-in
export const signInSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// schema sign-up
export const schemaSignUp = signInSchema.extend({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
});

// schema Category
export const schemaCategory = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
});

// schema Location
export const schemaLocation = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
});

// schema Brands
export const schemaBrand = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),

  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "Invalid file type",
    })
    .refine((file: File) => file.size <= 3 * 1024 * 1024, {
      message: "File size must be less than 3MB",
    })
    .refine((file: File) => file?.name, {
      message: "File name is required",
    }),
});

// // schema Product
// export const schemaProduct = z.object({
//   name: z
//     .string({ message: "Name is required" })
//     .min(5, { message: "Name must be at least 3 characters long" }),
//   description: z
//     .string({ message: "Description is required" })
//     .min(10, { message: "Description must be at least 10 characters long" }),
//   price: z.string({ message: "Price is required" }),
//   stock: z.string({ message: "Stock is required" }),
//   brand_id: z.string({ message: "Brand is required" }),
//   category_id: z.string({ message: "Category is required" }),
//   location_id: z.string({ message: "Location is required" }),
//   image: z
//     .any()
//     .refine((files: File[]) => files.length > 3, {
//       message: "You can only upload up to 3 images",
//     })
//     .refine(
//       (files: File[]) => {
//         let validate = false;

//         Array.from(files).find((file) => {
//           validate = ALLOW_MIME_TYPES.includes(file.type);
//         });
//         return validate;
//       },
//       {
//         message: "Invalid file type",
//       }
//     ),
// });

// // schemaProductEdit
// export const schemaProductEdit = schemaProduct
//   .extend({
//     id: z.number({ message: "ID is required" }),
//   })
//   .omit({ image: true });

// schema Product
export const schemaProduct = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(5, { message: "Name must be at least 5 characters long" }),
  description: z
    .string({ message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" }),
  price: z.string({ message: "Price is required" }),
  stock: z.string({ message: "Stock is required" }),
  brand_id: z.string({ message: "Brand is required" }),
  category_id: z.string({ message: "Category is required" }),
  location_id: z.string({ message: "Location is required" }),
  image: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "At least 1 image is required",
    })
    .refine((files) => files && files.length <= 3, {
      message: "You can only upload up to 3 images",
    })
    .refine(
      (files) =>
        files &&
        Array.from(files).every((file) =>
          ALLOW_MIME_TYPES.includes((file as File).type)
        ),
      {
        message: "Invalid file type",
      }
    ),
});

// schema Product Edit (image optional)
export const schemaProductEdit = z.object({
  id: z.number({ message: "ID is required" }),
  name: z
    .string({ message: "Name is required" })
    .min(5, { message: "Name must be at least 5 characters long" }),
  description: z
    .string({ message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" }),
  price: z.string({ message: "Price is required" }),
  stock: z.string({ message: "Stock is required" }),
  brand_id: z.string({ message: "Brand is required" }),
  category_id: z.string({ message: "Category is required" }),
  location_id: z.string({ message: "Location is required" }),
  image: z
    .any()
    .optional()
    .refine((files) => !files || files.length <= 3, {
      message: "You can only upload up to 3 images",
    })
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file) =>
          ALLOW_MIME_TYPES.includes((file as File).type)
        ),
      {
        message: "Invalid file type",
      }
    ),
});
