import { conformZodMessage } from '@conform-to/zod';
import { z } from 'zod';

// =======================ONBOARDING SCHEMA====================================
export const onboardingSchema = z.object({
  fullName: z
    .string({ message: 'Tên là bắt buộc ' })
    .min(3, { message: 'Tên phải có ít nhất 3 kí tự ' })
    .max(150, { message: 'Tên không được vượt quá 150 kí tự ' }),

  userName: z
    .string({ message: 'Username là bắt buộc ' })
    .min(3, { message: 'Username phải có ít nhất 3 kí tự ' })
    .max(150, { message: 'Username không được vượt quá 150 kí tự ' })
    .regex(/^[a-z0-9-]+$/, {
      message:
        'Username chỉ cho phép các kí tự thường, chữ số và dấu gạch ngang ',
    }),

  phone: z
    .string({ message: 'Số điện thoại là bắt buộc ' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa các chữ số ' })
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 kí tự ' })
    .max(11, { message: 'Số điện thoại không được vượt quá 11 kí tự ' }),
});

export function onboardingSchemaValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string({ message: 'Username là bắt buộc ' })
      .min(3, { message: 'Username phải có ít nhất 3 kí tự ' })
      .max(150, { message: 'Username không được vượt quá 150 kí tự ' })
      .regex(/^[a-z0-9-]+$/, {
        message:
          'Username chỉ cho phép các kí tự thường, chữ số và dấu gạch ngang ',
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== 'function') {
            ctx.addIssue({
              code: 'custom',
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: 'custom',
                message: 'Username đã tồn tại ',
              });
            }
          });
        }),
      ),
    fullName: z
      .string({ message: 'Tên là bắt buộc ' })
      .min(3, { message: 'Tên phải có ít nhất 3 kí tự ' })
      .max(150, { message: 'Tên không được vượt quá 150 kí tự ' }),

    phone: z
      .string({ message: 'Số điện thoại là bắt buộc' })
      .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa các chữ số ' })
      .min(10, { message: 'Số điện thoại phải có ít nhất 10 kí tự ' })
      .max(11, { message: 'Số điện thoại không được vượt quá 11 kí tự ' }),
  });
}

// ==============================SETTING SCHEMA====================================
export const settingSchema = z.object({
  fullName: z
    .string({ message: 'Tên là bắt buộc ' })
    .min(3, { message: 'Tên phải có ít nhất 3 kí tự ' })
    .max(150, { message: 'Tên không được vượt quá 150 kí tự ' }),

  profileImage: z.string(),

  phone: z
    .string({ message: 'Số điện thoại là bắt buộc ' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa các chữ số ' })
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 kí tự ' })
    .max(11, { message: 'Số điện thoại không được vượt quá 11 kí tự ' }),

  birth: z.string().optional(),
});
